import { 
  getCurrentDate, 
  getLastName, 
  getFirstName,
} from '../utils';
import noProfilePic from '../img/noProfilePic.jpg';

const Card = ({
    profile,
    topArtist,
    topTrackName,
    topTrackArtists,
    topTrackAlbumCover,
    topGenres
  }) => {
  return (
    <div id="card">
      <div id="cardRectangle"></div>
      <div id="loadingRectangle">
        <p>loading...</p>
      </div>
      <div id="backgroundCoverArt" style={{backgroundImage: `url(${topTrackAlbumCover})`}}></div>
      
      <div id="mainProfilePicAndSignature">

        {(profile.images.length && profile.images[0].url) ? (
          <div id="mainProfilePic" style={{backgroundImage:`url('${profile.images[0].url}')`}}></div>
        ) : (
          <div id="mainProfilePic" style={{backgroundImage:`url('${noProfilePic}')`}}></div>
        )}

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
  )
}

export default Card;