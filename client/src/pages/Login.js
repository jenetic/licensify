import spotifyIcon from '../img/spotifyIcon.png';

const LOGIN_URI = 
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://licensify.herokuapp.com/login';


const Login = () => {
  return (
    <div id="loginPage">
      <p id="tagline">turn your music listening activity into a driver's license!</p>
      <a id="loginButton" href={LOGIN_URI}>
        <img src={spotifyIcon} alt="Spotify logo"></img>
        <p>Connect with Spotify</p>
      </a>
    </div>
  )
}

export default Login;