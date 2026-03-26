import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WeatherView from './views/WeatherView';
import RegisterView from './views/RegisterView';

function App() {
  return (
    <BrowserRouter>
      <nav
        className={`top-nav ${
          localStorage.getItem('isNight') === 'true' ? 'night' : 'day'
        }`}>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>

        {localStorage.getItem('user') && (
          <button
            className="nav-logout-btn"
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/';
            }}>
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<WeatherView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
