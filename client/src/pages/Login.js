import spotifyIcon from '../img/spotifyIcon.png';

const Login = () => {
  return (
    <div id="loginPage">
      <p id="tagline">driver license-ify your spotify listening activity!</p>
      <a id="loginButton" href="http://localhost:8888/login">
        <img src={spotifyIcon}></img>
        <p>Connect with Spotify</p>
      </a>
    </div>
  )
}

export default Login;