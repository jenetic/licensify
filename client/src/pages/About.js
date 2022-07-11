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
        View the Github repo here.
      </p>

      <h2>who made this?</h2>
      <p>
        This app was made by Jenny Lam.
      </p>
      <p>
        <a href="https://github.com/srnq" target="_blank">Github</a> | 
        <a href="https://srnq.github.io" target="_blank">Website</a> |
        <a href="https://www.linkedin.com/in/jwny/" target="_blank">LinkedIn</a>
      </p>
    </div>
  )
}

export default About;