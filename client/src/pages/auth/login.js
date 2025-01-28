import React, { useState } from 'react';
import styles from './auth.module.css'; // Make sure this CSS is already included

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
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
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Handle successful login (store token, redirect, etc.)
      console.log('Login success:', data);
      // For example, you could store the token in localStorage
      localStorage.setItem('authToken', data.token);
      // Redirect to another page, like dashboard
      // history.push('/dashboard');
      
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
        />
      </div>

      <div className={styles.budiv}>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default Login;
