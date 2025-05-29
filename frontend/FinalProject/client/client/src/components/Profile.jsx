import { useState, useEffect } from 'react';
import API from '../services/api';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    position: '',
    university: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (res.data) setProfile(res.data);
      } catch (err) {
        console.error(err);
        setFeedback('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSave = async () => {
    if (!profile.name || !profile.position || !profile.university) {
      setFeedback('Please fill in all required fields.');
      return;
    }

    try {
      await API.post('/profile', profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsEditing(false);
      setFeedback('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setFeedback('Error saving profile. Please try again.');
    }
  };

  if (loading) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {feedback && <div className="feedback">{feedback}</div>}

      {isEditing ? (
        <div className="profile-form">
          <label>Name*</label>
          <input name="name" placeholder="Name" value={profile.name} onChange={handleChange} required />

          <label>Position*</label>
          <input name="position" placeholder="Position" value={profile.position} onChange={handleChange} required />

          <label>University*</label>
          <input name="university" placeholder="University" value={profile.university} onChange={handleChange} required />

          <label>Bio</label>
          <textarea name="bio" placeholder="Tell us about yourself..." value={profile.bio} onChange={handleChange}></textarea>

          <div className="profile-buttons">
            <button onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => { setIsEditing(false); setFeedback(''); }}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="profile-view">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Position:</strong> {profile.position}</p>
          <p><strong>University:</strong> {profile.university}</p>
          <p><strong>Bio:</strong> {profile.bio || 'No bio added yet.'}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
