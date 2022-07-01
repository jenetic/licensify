import { useEffect, useState } from 'react';
import { getCurrentUserProfile, getTopArtists, getTopTracks, getTopGenre } from '../spotify';
import { catchErrors } from '../utils';
import '../App.css';

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [topArtist, setTopArtist] = useState("");
  const [topTrack, setTopTrack] = useState("");
  const [topGenre, setTopGenre] = useState("");

  useEffect(() => {
    // Get user profile data
    const fetchUserProfileData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);
      
      const userTopArtists = await getTopArtists();
      setTopArtist(userTopArtists.data.items[0].name);

      const userTopTracks = await getTopTracks();
      setTopTrack(userTopTracks.data.items[0].name);

      const userTopGenre = await getTopGenre();
      setTopGenre(userTopGenre);
    }
    catchErrors(fetchUserProfileData());
  }, [])

  return (
    <>
      {profile && (
        <div>
          <h1>{profile.display_name}</h1>
          <p>{profile.followers.total} Followers</p>
          <p>{profile.id}</p>
          <p>{topArtist}</p>
          <p>{topTrack}</p>
          <p>{topGenre}</p>
          {profile.images.length && profile.images[0].url && (
            <img src={profile.images[0].url} alt="Profile Picture" />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;