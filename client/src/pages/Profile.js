import { useEffect, useState } from 'react';
import { 
  getCurrentUserProfile,
  getTopArtists,
  getTopTracks,
  getTopGenres,
  getTopTrackAlbumCover
} from '../spotify';
import { 
  catchErrors,
  getCurrentDate, 
  getLastName,
  getFirstName,
} from '../utils';
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

    // Display time range
    if (time_range === "short_term") {
      document.getElementById("display-time-range").textContent = "FROM LAST MONTH";
    } else if (time_range === "long_term") {
      document.getElementById("display-time-range").textContent = "FROM ALL TIME";
    } else {
      document.getElementById("display-time-range").textContent = "FROM LAST 6 MONTHS";
    }
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
          <p>{topArtist.toUpperCase()}</p>
          <p>{topTrack.name}</p>
          <p>{topGenres[0]}</p>
          <p>{topGenres[1]}</p>
          <p>{topGenres[2]}</p>
          <img src={topTrackAlbumCover}></img> */}

          {/* CARD */}
          <div id="card">
            <div id="cardRectangle"></div>
            <div id="backgroundCoverArt" style={{backgroundImage: `url(${topTrackAlbumCover})`}}></div>
            
            <div id="mainProfilePicAndSignature">
              <div id="mainProfilePicCrop">
                {profile.images.length && profile.images[0].url && (
                  <img src={profile.images[0].url}></img>
                )}
              </div>
              <p id="signature">{profile.display_name}</p>
            </div>
            
           

            <p id="licensify">Licensify</p>
            <p id="country">{profile.country}</p>
            <p id="driver-license">DRIVER LICENSE</p>
            <p id="display-time-range">FROM LAST 6 MONTHS</p>


            <hr id="topGreenLine"/>
            <hr id="bottomGreenLine"/>

            <div id="topSection" className="flexWrapper">
              <div id="dl" className="flexWrapper">
                <p id="dlKey" className="sectionKey">DL</p>
                <p id="dlValue">{profile.id.toUpperCase()}</p>
              </div>
              
              <div id="expAndFollowersWrapper" className="flexWrapper">
                <p id="expKey" className="sectionKey">EXP</p>
                <p id="expValue">{getCurrentDate()}</p>

                <p id="followersKey" className="sectionKey">FOLLOWERS</p>
                <p id="followersValue" className="sectionValue">{profile.followers.total}</p>
              </div>

              <div id="nameWrapper" className="flexWrapper">
                <div id="ln" className="flexWrapper">
                  <p id="lnKey" className="sectionKey">LN</p>
                  <p id="lnValue" className="sectionValue">{getLastName(profile.display_name).toUpperCase()}</p>
                </div>

                <div id="fn" className="flexWrapper">
                    <p id="fnKey" className="sectionKey">FN</p>
                    <p id="fnValue" className="sectionValue">{getFirstName(profile.display_name).toUpperCase()}</p>
                </div>
              </div>

              <div id="trackAndArtistWrapper" className="flexWrapper">
                <div id="track" className="flexWrapper">
                  <p id="trackKey" className="sectionKey">#1 TRACK</p>
                  <p id="trackValue" className="sectionValue">{topTrack.name}</p>
                </div>
                <div id="artist" className="flexWrapper"> 
                  <p id="artistKey" className="sectionKey">#1 ARTIST</p>
                  <p id="artistValue" className="sectionValue">{topArtist.toUpperCase()}</p>
                </div>
              </div>
            </div>
          
            <div id="genres" className="flexWrapper">
              <p id="genresKey" className="sectionKey">TOP GENRES</p>
              <p id="genresValue" className="sectionValue">
                <span>{topGenres[0]}</span>
                <span>{topGenres[1]}</span>
                <span>{topGenres[2]}</span>
              </p>
            </div>

           

            

            {profile.images.length && profile.images[0].url && (
              <img id="smallProfilePic" src={profile.images[0].url}></img>
            )}
          </div>
          
          
        </div>
      )}
    </>
  );
};

export default Profile;