import Register from '../components/Register';

export default function RegisterView({ setUser }) {
  return (
    <div className="register-view">
      <h1>Create Your Account</h1>
      <Register setUser={setUser} />
    </div>
  );
}
