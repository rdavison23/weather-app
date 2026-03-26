import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WeatherView from './components/WeatherView';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<WeatherView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
