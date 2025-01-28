import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import styles from './auth.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [role, setRole] = useState('');
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [year, setYear] = useState('');
  const [skills, setSkills] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [expertise, setExpertise] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'repeatPassword') setRepeatPassword(value);
    if (name === 'role') setRole(value);
    if (name === 'university') setUniversity(value);
    if (name === 'degree') setDegree(value);
    if (name === 'year') setYear(value);
    if (name === 'skills') setSkills(value);
    if (name === 'resumeLink') setResumeLink(value);
    if (name === 'expertise') setExpertise(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError('');
    setLoading(true);

    // Check if password and repeat password match
    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users/sginup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          education: {
            university,
            degree,
            year,
          },
          skills,
          resumeLink,
          expertise,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        // Handle successful signup: redirect to login page
        console.log('Signup successful:', data);
        navigate('/login'); // Redirect to login page using useNavigate
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.block}>
        <label>Username:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={handleInputChange}
        />
      </div>

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

      <div className={styles.block}>
        <label>Repeat Password:</label>
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat your password"
          value={repeatPassword}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.block}>
        <label>Role:</label>
        <select name="role" value={role} onChange={handleInputChange}>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="framer">Framer</option>
        </select>
      </div>

      {role === 'student' && (
        <>
          <div className={styles.block}>
            <label>University:</label>
            <input
              type="text"
              name="university"
              placeholder="Enter your university name"
              value={university}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.block}>
            <label>Degree:</label>
            <input
              type="text"
              name="degree"
              placeholder="Enter your degree"
              value={degree}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.block}>
            <label>Year of Graduation:</label>
            <input
              type="number"
              name="year"
              placeholder="Enter your graduation year"
              value={year}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.block}>
            <label>Skills:</label>
            <input
              type="text"
              name="skills"
              placeholder="Enter your skills"
              value={skills}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.block}>
            <label>Resume Link:</label>
            <input
              type="text"
              name="resumeLink"
              placeholder="Enter your resume link"
              value={resumeLink}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}

      {role === 'framer' && (
        <div className={styles.block}>
          <label>Expertise:</label>
          <input
            type="text"
            name="expertise"
            placeholder="Enter your expertise"
            value={expertise}
            onChange={handleInputChange}
          />
        </div>
      )}

      <div className={styles.budiv}>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </div>

      <div className={styles.loginLink}>
        <p>
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </form>
  );
};

export default Signup;
