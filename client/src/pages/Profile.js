import { useEffect, useState } from 'react';
import { 
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
} from '../utils';
import Card from './Card';

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [topArtist, setTopArtist] = useState("");
  const [topTrackName, setTopTrackName] = useState("");
  const [topTrackArtists, setTopTrackArtists] = useState("");
  const [topTrackAlbumCover, setTopTrackAlbumCover] = useState("");
  const [topGenres, setTopGenres] = useState("");

  const displayCardContents = async (time_range="short_term", refreshStatus) => {

    // Prevent error of loadingRectangle not having loaded in yet when refreshed
    if (!refreshStatus) {
      document.getElementById("loadingRectangle").style.display = "flex";
    }

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

    document.getElementById("loadingRectangle").style.display = "none";
  }

  // Changes Spotify data to fit specified time range
  const changeTimeRange = async (time_range) => {

    // TODO: Implement way of refreshing token after token expires

    displayCardContents(time_range, false);

    // Display time range
    if (time_range === "short_term") {
      document.getElementById("displayTimeRange").textContent = "FROM LAST MONTH";
    } else if (time_range === "long_term") {
      document.getElementById("displayTimeRange").textContent = "FROM ALL TIME";
    } else {
      document.getElementById("displayTimeRange").textContent = "FROM LAST 6 MONTHS";
    }
  }

  // Get user profile data
  useEffect(() => {
    const fetchUserProfileData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      displayCardContents("short_term", true);
    }
    catchErrors(fetchUserProfileData());
  }, [])

  let props = {
    profile,
    topArtist,
    topTrackName,
    topTrackArtists,
    topTrackAlbumCover,
    topGenres
  }

  return (
    <>
      {profile && (
        <div id="profilePage">
          <p id="loading"></p>
          <div id="cardWrapper">
            <Card {...props}/>
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