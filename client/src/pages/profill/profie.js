import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import styles from "./profie.module.css"; // Import the CSS module

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/users/getuser/${userId}`);
        setUser(response.data);
        console.log(response.data)
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h1>{user.name}</h1>
          <p>Role: {user.role}</p>
        </div>

        <div className={styles.profileDetails}>
          <div className={styles.detailSection}>
            <h2>Personal Information</h2>
            <p>Email: {user.email}</p>
          </div>

          {user.role === "student" && (
            <>
              <div className={styles.detailSection}>
                <h2>Education</h2>
                <p>University: {user.education?.university || "Not provided"}</p>
                <p>Degree: {user.education?.degree || "Not provided"}</p>
                <p>Year: {user.education?.year || "Not provided"}</p>
              </div>

              <div className={styles.detailSection}>
                <h2>Skills</h2>
                <div className={styles.skillsList}>
                  {user.skills?.map((skill, index) => (
                    <span key={index} className={styles.skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.detailSection}>
                <h2>Resume</h2>
                <p>
                  <a href={user.resumeLink} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </p>
              </div>
            </>
          )}

          {user.role === "framer" && (
            <>
              <div className={styles.detailSection}>
                <h2>Expertise</h2>
                <div className={styles.skillsList}>
                  {user.expertise?.map((expertise, index) => (
                    <span key={index} className={styles.skill}>
                      {expertise}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.detailSection}>
                <h2>Assigned Projects</h2>
                <p>{user.assignedProjects?.length || 0} projects assigned</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;