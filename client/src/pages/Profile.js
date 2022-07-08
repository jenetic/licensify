import { useEffect, useState } from 'react';
import { 
  getCurrentUserProfile,
  getTopArtists,
  getTopTracks,
  getTopGenres,
  getTopTrackAlbumCover
} from '../spotify';
import { catchErrors, setCardBackgroundImage } from '../utils';
import '../Style.css';


const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [topArtist, setTopArtist] = useState("");
  const [topTrack, setTopTrack] = useState("");
  const [topTrackAlbumCover, setTopTrackAlbumCover] = useState("");
  const [topGenres, setTopGenres] = useState("");

  // Changes Spotify data to fit specified time range
  const changeTimeRange = async (time_range) => {
    const userTopArtists = await getTopArtists(time_range);
    setTopArtist(userTopArtists.data.items[0].name);

    const userTopTracks = await getTopTracks(time_range);
    setTopTrack(userTopTracks.data.items[0]);

    const userTopTrackAlbumCover = await getTopTrackAlbumCover(time_range);
    setTopTrackAlbumCover(userTopTrackAlbumCover);

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
      setTopTrack(userTopTracks.data.items[0]);

      const userTopTrackAlbumCover = await getTopTrackAlbumCover();
      setTopTrackAlbumCover(userTopTrackAlbumCover);

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

          {/* SPOTIFY INFORMATION */}

          {/* <h1>{profile.display_name}</h1>
          <p>{profile.followers.total} Followers</p>
          <p>{profile.id}</p>
          <p>{profile.country}</p>
          <p>{topArtist}</p>
          <p>{topTrack.name}</p>
          <p>{topGenres[0]}</p>
          <p>{topGenres[1]}</p>
          <p>{topGenres[2]}</p>
          <img src={topTrackAlbumCover}></img> */}

          {/* CARD */}
          <div id="card">
            <div id="cardRectangle"></div>
            <div id="backgroundCoverArt" style={{backgroundImage: `url(${topTrackAlbumCover})`}}></div>
            <div id="mainProfilePicCrop">
              {profile.images.length && profile.images[0].url && (
                <img src={profile.images[0].url}></img>
              )}
            </div>
            <p id="spotify">Spotify</p>
            <p id="country">{profile.country}</p>
            <p id="driver-license">DRIVER LICENSE</p>
            <hr id="topGreenLine"/>
            <hr id="bottomGreenLine"/>
          </div>
          
          
        </div>
      )}
    </>
  );
};

export default Profile;