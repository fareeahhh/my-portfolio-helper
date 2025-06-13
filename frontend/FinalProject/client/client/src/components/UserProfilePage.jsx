import './UserProfilePage.css';
import { useState, useEffect } from 'react';

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
    "BS in Computer Science – NUST (2014)"
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
    contact: false
  },
  profileCompleteness: 88,
  profileSlug: "ayesha-khan",
  createdAt: "2024-01-01",
  updatedAt: "2025-05-20",
  lastLogin: "2025-06-10"
};

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this URL with your actual backend endpoint
    fetch('/api/user/profile')  // Example: `/api/users/me` or `/api/users/:id`
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading user data:", err);
        setUser(fallbackUser); // Use hardcoded fallback if needed
        setError("Could not load profile, showing fallback data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      {error && <div className="error-message">{error}</div>}
      
      {/* Header Card */}
      <div className="user-header">
        <div className="header-background"></div>
        <div className="header-content">
          <div className="profile-section">
            <div className="profile-img-container">
              <img src={user.profileImage} alt="Profile" className="profile-img" />
              <div className="status-indicator">
                <div className="status-dot"></div>
              </div>
            </div>
            
            <div className="user-info">
              <h2>{user.name}</h2>
              <p className="user-title">{user.title}</p>
              <p className="user-position">{user.currentPosition}</p>
              
              <div className="user-meta">
                <div className="meta-item">
                  <span>📍</span>
                  <span>{user.university}</span>
                </div>
                <div className="meta-item">
                  <span>📅</span>
                  <span>Since {new Date(user.createdAt).getFullYear()}</span>
                </div>
              </div>
              
              <p className="user-bio">{user.bio}</p>
              
              <div className="progress-container">
                <div className="progress-badge">
                  <span>🏆</span>
                  <span>{user.profileCompleteness}% Complete</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${user.profileCompleteness}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Left Column */}
        <div className="main-content">
          {/* Research Interests */}
          <div className="user-section">
            <div className="section-header">
              <div className="section-icon interests">
                <span>📚</span>
              </div>
              <h3>Research Interests</h3>
            </div>
            <div className="interests-grid">
              {user.researchInterests?.map((interest, i) => (
                <span key={i} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="user-section">
            <div className="section-header">
              <div className="section-icon education">
                <span>🎓</span>
              </div>
              <h3>Education</h3>
            </div>
            <ul className="education-list">
              {user.education?.map((edu, i) => (
                <li key={i} className="education-item">
                  <div className="education-dot"></div>
                  <p className="education-text">{edu}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="sidebar-content">
          {/* Social Links */}
          <div className="user-section">
            <div className="section-header">
              <div className="section-icon social">
                <span>🌐</span>
              </div>
              <h3>Connect</h3>
            </div>
            <div className="social-links">
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
              <a href={user.orcid} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>ORCID</span>
                <span>↗</span>
              </a>
              <a href={user.researchGate} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>ResearchGate</span>
                <span>↗</span>
              </a>
              <a href={user.googleScholar} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Google Scholar</span>
                <span>↗</span>
              </a>
              <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Twitter</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Documents */}
          <div className="user-section">
            <div className="section-header">
              <div className="section-icon documents">
                <span>📄</span>
              </div>
              <h3>Documents</h3>
            </div>
            <a href={user.cv} target="_blank" rel="noopener noreferrer" className="document-download">
              <div className="document-info">
                <div className="document-icon">
                  <span>⬇</span>
                </div>
                <div className="document-details">
                  <h4>Curriculum Vitae</h4>
                  <p>PDF Document</p>
                </div>
              </div>
              <span>↗</span>
            </a>
          </div>

          {/* Privacy Settings */}
          <div className="user-section">
            <div className="section-header">
              <div className="section-icon privacy">
                <span>🔒</span>
              </div>
              <h3>Privacy</h3>
            </div>
            <div className="privacy-list">
              <div className="privacy-item">
                <div className="privacy-label">
                  <span>✉️</span>
                  <span>Email Visible</span>
                </div>
                <div className={`privacy-status ${user.showEmail ? 'enabled' : 'disabled'}`}>
                  <span>{user.showEmail ? '👁' : '🙈'}</span>
                  <span>{user.showEmail ? "Yes" : "No"}</span>
                </div>
              </div>
              
              <div className="privacy-item">
                <div className="privacy-label">
                  <span>📞</span>
                  <span>Phone Visible</span>
                </div>
                <div className={`privacy-status ${user.showPhone ? 'enabled' : 'disabled'}`}>
                  <span>{user.showPhone ? '👁' : '🙈'}</span>
                  <span>{user.showPhone ? "Yes" : "No"}</span>
                </div>
              </div>
              
              <div className="privacy-item">
                <div className="privacy-label">
                  <span>👤</span>
                  <span>Profile Public</span>
                </div>
                <div className={`privacy-status ${user.profileVisibility ? 'enabled' : 'disabled'}`}>
                  <span>{user.profileVisibility ? '👁' : '🙈'}</span>
                  <span>{user.profileVisibility ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}