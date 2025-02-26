import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import styles from "./profie.module.css";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Building, 
  BookOpen, 
  Calendar,
  Award,
  FileText,
  Folder
} from 'lucide-react';

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
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  if (loading) return <div className={styles.loading}>Loading profile data...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              {user.role === "student" && <GraduationCap />}
              {user.role === "framer" && <Briefcase />}
              {user.role === "admin" && <User />}
            </div>
            <h1>{user.name}</h1>
            <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.detailSection}>
              <h2 className={styles.sectionTitle}>
                <User size={20} />
                Personal Information
              </h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <Mail size={16} className="inline mr-1" /> Email
                  </div>
                  <div className={styles.infoValue}>{user.email}</div>
                </div>
              </div>
            </div>

            {user.role === "student" && (
              <>
                <div className={styles.detailSection}>
                  <h2 className={styles.sectionTitle}>
                    <GraduationCap size={20} />
                    Education
                  </h2>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>
                        <Building size={16} className="inline mr-1" /> University
                      </div>
                      <div className={styles.infoValue}>
                        {user.education?.university || "Not provided"}
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>
                        <BookOpen size={16} className="inline mr-1" /> Degree
                      </div>
                      <div className={styles.infoValue}>
                        {user.education?.degree || "Not provided"}
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>
                        <Calendar size={16} className="inline mr-1" /> Year
                      </div>
                      <div className={styles.infoValue}>
                        {user.education?.year || "Not provided"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.detailSection}>
                  <h2 className={styles.sectionTitle}>
                    <Award size={20} />
                    Skills
                  </h2>
                  <div className={styles.skillsList}>
                    {user.skills?.map((skill, index) => (
                      <span key={index} className={styles.skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {user.resumeLink && (
                  <div className={styles.detailSection}>
                    <h2 className={styles.sectionTitle}>
                      <FileText size={20} />
                      Resume
                    </h2>
                    <a
                      href={user.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resumeLink}
                    >
                      <FileText size={16} />
                      View Resume
                    </a>
                  </div>
                )}
              </>
            )}

            {user.role === "framer" && (
              <>
                <div className={styles.detailSection}>
                  <h2 className={styles.sectionTitle}>
                    <Award size={20} />
                    Expertise
                  </h2>
                  <div className={styles.skillsList}>
                    {user.expertise?.map((item, index) => (
                      <span key={index} className={styles.skill}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.detailSection}>
                  <h2 className={styles.sectionTitle}>
                    <Folder size={20} />
                    Projects
                  </h2>
                  <div className={styles.infoItem}>
                    <div className={styles.infoValue}>
                      {user.assignedProjects?.length || 0} projects assigned
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;