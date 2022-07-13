const About = () => {
  return (
    <div id="aboutPage">
      <h2>what is licensify?</h2>
      <p>
        Licensify takes your Spotify listening activity (top artists, tracks, and genres) and turns it into a 
        driver license (right now, in the style of a California driver license.
        Maybe there will be more options in the future?).
      </p>
      <p>
        Licensify was made with React.js, Node.js, and Express.js, and uses the Spotify Web API
        to retreive user information. 
      </p>
      <p>
        View the Github repo <a href="https://github.com/srnq/licensify" target="_blank">here</a>.
      </p>

      <h2>who made this?</h2>
      <p>
        This app was made by Jenny Lam.
      </p>
      <p id="contactLinks">
        <a href="https://jenetic.github.io" target="_blank">website</a> |
        <a href="https://github.com/jenetic" target="_blank">github</a> | 
        <a href="https://www.linkedin.com/in/jwny/" target="_blank">linkedin</a>
      </p>
    </div>
  )
}

export default About;