import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type loginProps={
  onLoginSuccess:()=>void
}

function Login(props:loginProps) {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'success' | 'error' | ''>('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          setType('success')
          setMessage('Login successful!')
          localStorage.setItem('token', data.token)
          props.onLoginSuccess(); 
          navigate('/')
        } else {
          setType('error');
          setMessage(data.message || 'Login failed')
        }
      })
      .catch(() => {
        setType('error')
        setMessage('Something went wrong, please try again later.')
      });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit">Login</button>
      </form>

      {message && (
        <div
          style={{
            color: type === 'success' ? 'green' : 'red',
            marginTop: '1rem',
            fontWeight: 'bold',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default Login;
