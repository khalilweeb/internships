import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './auth.module.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Both email and password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);

      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin'); // Redirect admin to the dashboard
      } else {
        navigate('/profile'); // Redirect students & framers to profile page
      }
      
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.block}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.block}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.budiv}>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      {/* Add "Sign up" link below the login button */}
      <p className={styles.switch}>
        Don't have an account? <span onClick={() => navigate('/signup')} className={styles.link}>Sign Up</span>
      </p>
    </form>
  );
};

export default Login;
