import { useEffect, useState } from 'react';
import { accessToken, logout } from './spotify';
import { Login, Profile, About } from './pages';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './css/Card.css'; 
import './css/Main.css'; 

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
      <div id="footerWrapper">
        <p id="footer">
          <span>created by </span>
          <a href="http://jenetic.github.io" target="_blank">Jenny Lam</a>
        </p>
      </div>
    </div>
  );
}

export default App;
