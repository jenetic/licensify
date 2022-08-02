const About = () => {
  return (
    <div id="aboutPage">
      <div className="qna">

        <h2>about licensify</h2>
        <p>
          Licensify takes your Spotify listening activity (top artists, tracks, and genres) and turns it into a 
          driver's license in the style of a California driver's license (for now?). Maybe there could be more card styles
          in the future, but I haven't thought that far yet.
        </p>
        <p>
          Licensify is was made with React.js, Node.js, and Express.js. I used React.js and CSS to create the driver's license itself and the
          Spotify Web API to retrieve user listening activity from Spotify, as well as authorize Spotify accounts.
        </p>
        <p>
          Licensify is open source; view the Github repo <a href="https://github.com/srnq/licensify" target="_blank" rel="noreferrer">here</a>.
        </p>
      </div>

      <div className="qna">
        <h2>who made this</h2>
        <p>
          This app was created by Jenny Lam. You can contact me at <a href="mailto:jznnylam@gmail.com">jznnylam@gmail.com</a>, 
          DM me on <a href="https://www.instagram.com/jenny.gif/" target="_blank" rel="noreferrer">Instagram</a>, and/or check out any other links below. 
        </p>
        <p id="contactLinks">
          <a href="https://jenetic.github.io" target="_blank" rel="noreferrer">website</a> |
          <a href="https://github.com/jenetic" target="_blank" rel="noreferrer">github</a>
        </p>
      </div>

      <div className="qna">
        <h2>it's not working</h2>
        <p>
          If you leave the website open and lingering around for a long time (over an hour), your Spotify
          data may not load properly onto the card, but it should work again when you refresh the page (in theory, because I'm still working on this issue).
        </p>
        <p>
          If you find other issues or have any suggestions, you can open an issue in the Github repo or contact me any other way.
        </p>
      </div>

      <div className="qna">
        <h2>privacy policy</h2>
        <p>
          None of the data used by Licensify is stored, collected, or shared with any third parties.
          All information is used only for generating your driver's license. I do not care about your listening activity or Spotify account that much to store your data.
        </p>
        <p>
          Remove Licensify's access to Spotify <a href="https://support.spotify.com/us/article/spotify-on-other-apps/" target="_blank" rel="noreferrer">here</a>.
        </p>
      </div>
    </div>
  )
}

export default About;