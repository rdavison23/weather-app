import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WeatherView from './views/WeatherView';
import RegisterView from './views/RegisterView';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<WeatherView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
