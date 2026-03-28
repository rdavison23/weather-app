import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register({ setUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // start loading

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed.');
        setLoading(false); // stop loading on error
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      navigate('/'); // redirect to home
    } catch (err) {
      setError('Something went wrong.');
    }

    setLoading(false); // stop loading after success
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        required
        minLength={2}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Register'} {/* loading text */}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
