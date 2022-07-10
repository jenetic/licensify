import { useEffect, useState } from 'react';
import { accessToken, logout } from './spotify';
import { Login, Profile, About } from './pages';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './Style.css'; 
import './MoreStyle.css'; 

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, [])

  return (
    <div className="App">
      <h1 className="mainFont">Licensify</h1>
      {!token ? (
        <Login />
        
      ) : (
        <>
          <button className="mainFont" onClick={logout}>Log Out</button>
          <Router>
            <Routes>
              <Route path="/" element={<Profile />} />
              {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
