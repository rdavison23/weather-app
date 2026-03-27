import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WeatherView from './views/WeatherView';
import RegisterView from './views/RegisterView';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <nav
        className={`top-nav ${
          localStorage.getItem('isNight') === 'true' ? 'night' : 'day'
        }`}>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>

        {user && (
          <button className="nav-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<WeatherView />} />
        <Route path="/register" element={<RegisterView setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
