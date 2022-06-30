import { useEffect, useState } from 'react';
import { accessToken, logout, getCurrentUserProfile, getTopArtists } from './spotify';
import { catchErrors } from './utils';
import { Login, Profile } from './pages';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css'; 

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, [])

  return (
    <div className="App">
      {!token ? (
        <Login />
      ) : (
        <>
          <button onClick={logout}>Log Out</button>

          {/* Router */}
          <Router>
            <Routes>
              <Route path="/" element={<Profile />} />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
