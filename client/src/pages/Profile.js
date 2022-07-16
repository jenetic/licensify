import { useEffect, useState } from 'react';
import { 
  // accessToken,
  getAccessToken,
  getCurrentUserProfile,
  getTopArtists,
  getTopTrackName,
  getTopGenres,
  getTopTrackAlbumCover,
  getTopTrackArtists,
} from '../spotify';
import { 
  catchErrors,
  getCurrentDate, 
  getLastName, 
  getFirstName,
} from '../utils';
import noProfilePic from '../img/noProfilePic.jpg';


const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [topArtist, setTopArtist] = useState("");
  const [topTrackName, setTopTrackName] = useState("");
  const [topTrackArtists, setTopTrackArtists] = useState("");
  const [topTrackAlbumCover, setTopTrackAlbumCover] = useState("");
  const [topGenres, setTopGenres] = useState("");

  // Changes Spotify data to fit specified time range
  const changeTimeRange = async (time_range) => {

    const accessToken = await getAccessToken();

    document.getElementById("loadingRectangle").style.display = "flex";

    const userTopArtists = await getTopArtists(time_range);
    setTopArtist(userTopArtists.data.items[0].name);

    const userTopTrackName = await getTopTrackName(time_range);
    setTopTrackName(userTopTrackName);

    const userTopTrackArtists = await getTopTrackArtists(time_range);
    setTopTrackArtists(userTopTrackArtists);

    const userTopTrackAlbumCover = await getTopTrackAlbumCover(time_range);
    setTopTrackAlbumCover(userTopTrackAlbumCover);

    const userTopGenres = await getTopGenres(time_range);
    setTopGenres(userTopGenres);

    // Display time range
    if (time_range === "short_term") {
      document.getElementById("displayTimeRange").textContent = "FROM LAST MONTH";
    } else if (time_range === "long_term") {
      document.getElementById("displayTimeRange").textContent = "FROM ALL TIME";
    } else {
      document.getElementById("displayTimeRange").textContent = "FROM LAST 6 MONTHS";
    }

    document.getElementById("loadingRectangle").style.display = "none";
  }

  useEffect(() => {
    // Get user profile data
    const fetchUserProfileData = async () => {

      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);
      
      const userTopArtists = await getTopArtists();
      setTopArtist(userTopArtists.data.items[0].name);

      const userTopTrackName = await getTopTrackName();
      setTopTrackName(userTopTrackName);

      const userTopTrackArtists = await getTopTrackArtists();
      setTopTrackArtists(userTopTrackArtists);

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
        <div id="profilePage">
          <p id="loading"></p>
          <div id="cardWrapper">
            <div id="card">
              <div id="cardRectangle"></div>
              <div id="loadingRectangle">
                <p>loading...</p>
              </div>
              <div id="backgroundCoverArt" style={{backgroundImage: `url(${topTrackAlbumCover})`}}></div>
              
              <div id="mainProfilePicAndSignature">
                <div id="mainProfilePicCrop">
                  {(profile.images.length && profile.images[0].url) ? (
                    <img src={profile.images[0].url} alt="large profile pic"></img>
                  ) : (
                    <img src={noProfilePic} alt="large default profile pic"></img>
                  )}
                </div>
                <p id="signature">{profile.display_name}</p>
              </div>
              
              <p id="licensify">Licensify</p>
              <p id="country">{profile.country}</p>
              <p id="driverLicense">DRIVER LICENSE</p>
              <p id="displayTimeRange">FROM LAST 6 MONTHS</p>

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
                    <p id="trackValue" className="sectionValue">{topTrackArtists} - {topTrackName}</p>
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
                  <span>{topGenres[0]},      </span>    
                  <span>{topGenres[1]},      </span>
                  <span>{topGenres[2]}</span>
                </p>
              </div>

              {(profile.images.length && profile.images[0].url) ? (
                <img id="smallProfilePic" src={profile.images[0].url} alt="small profile pic"></img>
              ) : (
                <img id="smallProfilePic" src={noProfilePic} alt="small default profile pic"></img>
              )}

              <p id="websiteName">LICENSIFY.HEROKUAPP.COM</p>
            </div>
          </div>

            <div id="timeRangeButtons">
              <button id="oneMonthButton" className="timeRangeButton mainFont" onClick={() => changeTimeRange("short_term")}>1 month</button>
              <button id="sixMonthsButton" className="timeRangeButton mainFont" onClick={() => changeTimeRange("medium_term")}>6 months</button>
              <button id="allTimeButton" className="timeRangeButton mainFont" onClick={() => changeTimeRange("long_term")}>all time</button>
            </div>

            <p id="style">Style: California Driver License </p>
        </div>
      )}
    </>
  );
};

export default Profile;