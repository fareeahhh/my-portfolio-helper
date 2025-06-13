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

  if (loading) return <p>Loading user profile...</p>;

  return (
    <div className="user-profile">
      {error && <p className="error-message">{error}</p>}
      <div className="user-header">
        <img src={user.profileImage} alt="Profile" className="profile-img" />
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.title}, {user.currentPosition}</p>
          <p>{user.university} – {user.department}</p>
          <p>{user.bio}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${user.profileCompleteness}%` }}></div>
          </div>
          <p className="progress-text">Profile {user.profileCompleteness}% complete</p>
        </div>
      </div>

      <div className="user-section">
        <h3>Academic Interests</h3>
        <ul>{user.researchInterests?.map((item, i) => <li key={i}>{item}</li>)}</ul>
      </div>

      <div className="user-section">
        <h3>Education</h3>
        <ul>{user.education?.map((edu, i) => <li key={i}>{edu}</li>)}</ul>
      </div>

      <div className="user-section">
        <h3>Social Links</h3>
        <ul>
          <li><a href={user.linkedin}>LinkedIn</a></li>
          <li><a href={user.orcid}>ORCID</a></li>
          <li><a href={user.researchGate}>ResearchGate</a></li>
          <li><a href={user.googleScholar}>Google Scholar</a></li>
          <li><a href={user.twitter}>Twitter</a></li>
        </ul>
      </div>

      <div className="user-section">
        <h3>Uploads</h3>
        <p><strong>CV:</strong> <a href={user.cv} target="_blank" rel="noopener noreferrer">Download</a></p>
      </div>

      <div className="user-section">
        <h3>Privacy Settings</h3>
        <ul>
          <li>Email Visible: {user.showEmail ? "Yes" : "No"}</li>
          <li>Phone Visible: {user.showPhone ? "Yes" : "No"}</li>
          <li>Profile Public: {user.profileVisibility ? "Yes" : "No"}</li>
        </ul>
      </div>
    </div>
  );
}
