import "./UserProfilePage.css";
import { useState, useEffect } from "react";
import { getUserProfile } from "../services/api";

const fallbackUser = {
  name: "Dr. Ayesha Khan",
  email: "ayesha.khan@university.edu",
  title: "Assistant Professor",
  currentPosition: "Computer Science Department",
  university: "National University of Technology",
  department: "Computer Vision Lab",
  bio: "My research interests span AI, computer vision, and robotics for social good.",
  profileImage: "/profile.jpg",
  cv: "/cv/ayesha-cv.pdf",
  phone: "+92 300 1234567",
  website: "https://ayeshakhan.dev",
  researchInterests: ["Deep Learning", "Disaster Robotics", "Explainable AI"],
  keywords: ["AI", "Robotics", "CV", "Ethics"],
  education: [
    "PhD in AI – MIT (2020)",
    "MS in Computer Vision – FAST (2016)",
    "BS in Computer Science – NUST (2014)",
  ],
  linkedin: "https://linkedin.com/in/ayeshakhan",
  orcid: "https://orcid.org/0000-0002-1825-0097",
  researchGate: "https://www.researchgate.net/profile/Ayesha_Khan",
  googleScholar: "https://scholar.google.com/citations?user=xyz123",
  twitter: "https://twitter.com/drayeshakhan",
  profileVisibility: true,
  showEmail: false,
  showPhone: false,
  sectionsVisibility: {
    education: true,
    interests: true,
    contact: false,
  },
  profileCompleteness: 88,
  profileSlug: "ayesha-khan",
  createdAt: "2024-01-01",
  updatedAt: "2025-05-20",
  lastLogin: "2025-06-10",
};

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user data:", err);
        setUser(fallbackUser); // fallback if backend fails
        setError("Could not load profile, showing fallback data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Loading your amazing profile...</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      {error && (
        <div className="error-message">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <h4>Oops! Something went wrong</h4>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* ---- BEGIN PROFILE HEADER ---- */}
      <div className="user-header">
        <div className="header-background">
          <div className="background-pattern"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="header-content">
          <div className="profile-section">
            <div className="profile-img-container">
              <div className="profile-ring"></div>
              <img
                src={user.profileImage}
                alt="Profile"
                className="profile-img"
              />
              <div className="status-indicator">
                <div className="status-dot"></div>
              </div>
            </div>

            <div className="user-info">
              <div className="name-section">
                <h2 className="user-name">{user.name}</h2>
                <div className="verified-badge">✓</div>
              </div>
              <p className="user-title">{user.title}</p>
              <p className="user-position">{user.currentPosition}</p>

              <div className="user-meta">
                <div className="meta-item">
                  <div className="meta-icon">📍</div>
                  <span>{user.university}</span>
                </div>
                <div className="meta-item">
                  <div className="meta-icon">📅</div>
                  <span>Since {new Date(user.createdAt).getFullYear()}</span>
                </div>
                <div className="meta-item">
                  <div className="meta-icon">⚡</div>
                  <span>
                    Last active: {new Date(user.lastLogin).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="user-bio">{user.bio}</p>

              <div className="progress-container">
                <div className="progress-badge">
                  <div className="badge-icon">🏆</div>
                  <span className="badge-text">
                    Profile {user.profileCompleteness}% Complete
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${user.profileCompleteness}%` }}
                    >
                      <div className="progress-glow"></div>
                    </div>
                  </div>
                  <div className="progress-percentage">
                    {user.profileCompleteness}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- BEGIN CONTENT GRID ---- */}
      <div className="content-grid">
        {/* LEFT COLUMN */}
        <div className="main-content">
          <div className="user-section interests-section">
            <div className="section-header">
              <div className="section-icon interests">
                <span className="icon-emoji">🧠</span>
              </div>
              <div className="section-title">
                <h3>Research Interests</h3>
                <p className="section-subtitle">What drives my curiosity</p>
              </div>
            </div>
            <div className="interests-grid">
              {user.researchInterests?.map((interest, i) => (
                <div key={i} className="interest-tag">
                  <div className="tag-icon">🔬</div>
                  <span className="tag-text">{interest}</span>
                  <div className="tag-shine"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="user-section education-section">
            <div className="section-header">
              <div className="section-icon education">
                <span className="icon-emoji">🎓</span>
              </div>
              <div className="section-title">
                <h3>Educational Journey</h3>
                <p className="section-subtitle">
                  Building knowledge step by step
                </p>
              </div>
            </div>
            <div className="education-timeline">
              {user.education?.map((edu, i) => (
                <div key={i} className="education-item">
                  <div className="education-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-line"></div>
                  </div>
                  <div className="education-content">
                    <p className="education-text">{edu}</p>
                    <div className="education-glow"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="sidebar-content">
          <div className="user-section social-section">
            <div className="section-header">
              <div className="section-icon social">
                <span className="icon-emoji">🌐</span>
              </div>
              <div className="section-title">
                <h3>Let's Connect</h3>
                <p className="section-subtitle">Find me across the web</p>
              </div>
            </div>
            <div className="social-links">
              <a
                href={user.linkedin}
                className="social-link linkedin"
                target="_blank"
              >
                💼 LinkedIn
              </a>
              <a
                href={user.orcid}
                className="social-link orcid"
                target="_blank"
              >
                🆔 ORCID
              </a>
              <a
                href={user.researchGate}
                className="social-link researchgate"
                target="_blank"
              >
                🔬 ResearchGate
              </a>
              <a
                href={user.googleScholar}
                className="social-link scholar"
                target="_blank"
              >
                📚 Google Scholar
              </a>
              <a
                href={user.twitter}
                className="social-link twitter"
                target="_blank"
              >
                🐦 Twitter
              </a>
            </div>
          </div>

          <div className="user-section documents-section">
            <div className="section-header">
              <div className="section-icon documents">
                <span className="icon-emoji">📋</span>
              </div>
              <div className="section-title">
                <h3>Documents</h3>
                <p className="section-subtitle">Professional resources</p>
              </div>
            </div>
            <a href={user.cv} className="document-card" target="_blank">
              📄 Curriculum Vitae
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
