import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './styles/Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userRole = storedUser?.role; // Get the user's role

  // Logout logic
  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <h1>Tanit</h1>
      <ul>
        {/* Common Links for All Roles */}
        <li>
          <Link to="/profile">Profile</Link>
        </li>

        {/* Role-Specific Links */}
        {userRole === "student" && (
          <>
            <li>
              <Link to="/projects">Navigate Projects</Link>
            </li>
            <li>
              <Link to="/myProject">My Projects</Link>
            </li>
            <li>
              <Link to="/framers">Framers</Link>
            </li>
          </>
        )}

        {userRole === "framer" && (
          <>
            <li>
              <Link to="/projects">All Projects</Link>
            </li>
            <li>
              <Link to="/assignedProjects">Assigned Projects</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
          </>
        )}

        {userRole === "admin" && (
          <>
            <li>
              <Link to="/projects">Manage Projects</Link>
            </li>
            <li>
              <Link to="/students">Manage Students</Link>
            </li>
            <li>
              <Link to="/framers">Manage Framers</Link>
            </li>
          </>
        )}

        {/* Logout Button (Common for All Roles) */}
        <li className={styles.logout} onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;