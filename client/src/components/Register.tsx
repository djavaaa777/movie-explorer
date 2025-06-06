import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type registerProps={
  onLoginSuccess:()=>void
}

function Register(props:registerProps) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | ''>('');
  const navigate = useNavigate()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'User successfully registered') {
          localStorage.setItem('token', data.token);
          setType('success');
          props.onLoginSuccess(); 
          navigate('/')
        } else {
          setType('error');
        }
        setMessage(data.message);
      })
      .catch(() => {
        setType('error');
        setMessage('Something went wrong, please try again later.');
      });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder="Username" name="username" onChange={handleChange} value={formData.username} />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} value={formData.password} />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </form>

      {message && (
        <div style={{
          color: type === 'success' ? 'green' : 'red',
          marginTop: '1rem',
          fontWeight: 'bold'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Register;
