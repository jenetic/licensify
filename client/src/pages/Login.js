import spotifyIcon from '../img/spotifyIcon.png';

const Login = () => {
  return (
    <div id="loginPage">
      <p id="tagline">get your listening activity as a driver license!</p>
      <a id="loginButton" href="http://localhost:8888/login">
        <img src={spotifyIcon}></img>
        <p>Connect with Spotify</p>
      </a>
    </div>
  )
}

export default Login;