import { useEffect, useState } from 'react';
import { accessToken, logout, getCurrentUserProfile, getTopArtists } from './spotify';
import { catchErrors } from './utils';
import logo from './logo.svg';
import './App.css';

function App() {

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    // Get user profile data
    const fetchUserProfileData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);
      
      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);
    }

    catchErrors(fetchUserProfileData());
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
        <a
          className="App-link"
          href="http://localhost:8888/login"
        >
          Log into Spotify
        </a>
        ) : (
          <>
            <h1>Logged in!</h1>
            <button onClick={logout}>Log Out</button>

            {profile && (
              <div>
                <h1>{profile.display_name}</h1>
                <p>{profile.followers.total} Followers</p>
                {profile.images.length && profile.images[0].url && (
                  <img src={profile.images[0].url} alt="Profile Picture" />
                )}
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
