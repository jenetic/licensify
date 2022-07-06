import { useEffect, useState } from 'react';
import { getCurrentUserProfile, getTopArtists, getTopTracks, getTopGenres } from '../spotify';
import { catchErrors } from '../utils';
import '../App.css';

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [topArtist, setTopArtist] = useState("");
  const [topTrack, setTopTrack] = useState("");
  const [topGenres, setTopGenres] = useState("");

  // Changes Spotify data to fit specified time range
  const changeTimeRange = async (time_range) => {
    const userTopArtists = await getTopArtists(time_range);
    setTopArtist(userTopArtists.data.items[0].name);

    const userTopTracks = await getTopTracks(time_range);
    setTopTrack(userTopTracks.data.items[0].name);

    const userTopGenres = await getTopGenres(time_range);
    setTopGenres(userTopGenres);
  }

  useEffect(() => {
    // Get user profile data
    const fetchUserProfileData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);
      
      const userTopArtists = await getTopArtists();
      setTopArtist(userTopArtists.data.items[0].name);

      const userTopTracks = await getTopTracks();
      setTopTrack(userTopTracks.data.items[0].name);

      const userTopGenres = await getTopGenres();
      setTopGenres(userTopGenres);
    }
    catchErrors(fetchUserProfileData());
  }, [])

  return (
    <>
      {profile && (
        <div>
          <div>
          <button onClick={() => changeTimeRange("short_term")}>1 Month</button>
          <button onClick={() => changeTimeRange("medium_term")}>6 Months</button>
          <button onClick={() => changeTimeRange("long_term")}>All time</button>
          </div>

          <h1>{profile.display_name}</h1>
          <p>{profile.followers.total} Followers</p>
          <p>{profile.id}</p>
          <p>{topArtist}</p>
          <p>{topTrack}</p>
          <p>{topGenres[0]}</p>
          <p>{topGenres[1]}</p>
          <p>{topGenres[2]}</p>
          {profile.images.length && profile.images[0].url && (
            <img src={profile.images[0].url} alt="Profile Picture" />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;