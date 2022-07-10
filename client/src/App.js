import { useEffect, useState } from 'react';
import { accessToken, logout } from './spotify';
import { Login, Profile, About } from './pages';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './Card.css'; 
import './MoreStyle.css'; 

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, [])

  return (
    <div className="App">
      <div id="header">
        <h1 id="title" className="mainFont">licensify</h1>
        <Router>
          <nav>
            <Link className="link" to="/">my card</Link>
            <Link className="link" to="/about">about</Link>
            {token &&
              <button id="logout" className="link mainFont" onClick={logout}>log out</button>
            }
          </nav>
          <Routes>
            <Route path="/about" element={<About />} />
            {!token ? (
              <Route path="/" element={<Login />} />
            ) : (
              <Route path="/" element={<Profile />} />
            )}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
