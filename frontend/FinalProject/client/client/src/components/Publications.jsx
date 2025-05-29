import { useState, useEffect } from 'react';
import './Publications.css'; // We’ll create this for styling

function Publications() {
  const [publications, setPublications] = useState([]);
  const [newPub, setNewPub] = useState({ title: '', link: '' });
  const [editingPub, setEditingPub] = useState(null);
  const [feedback, setFeedback] = useState('');

  // Fetch all publications
  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const res = await API.get('/publications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPublications(res.data);
    } catch (err) {
      console.error(err);
      setFeedback('Failed to load publications.');
    }
  };

  const handleAdd = async () => {
    if (!newPub.title || !newPub.link) {
      setFeedback('Please fill in both title and link.');
      return;
    }
    try {
      const res = await API.post('/publications', newPub, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPublications([...publications, res.data]);
      setNewPub({ title: '', link: '' });
      setFeedback('Publication added!');
    } catch (err) {
      console.error(err);
      setFeedback('Error adding publication.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/publications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPublications(publications.filter((p) => p._id !== id));
      setFeedback('Publication deleted.');
    } catch (err) {
      console.error(err);
      setFeedback('Error deleting publication.');
    }
  };

  const handleEdit = (pub) => {
    setEditingPub(pub);
    setNewPub({ title: pub.title, link: pub.link });
  };

  const handleUpdate = async () => {
    if (!newPub.title || !newPub.link) {
      setFeedback('Please fill in both fields.');
      return;
    }
    try {
      await API.put(`/publications/${editingPub._id}`, newPub, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPublications(
        publications.map((p) =>
          p._id === editingPub._id ? { ...p, ...newPub } : p
        )
      );
      setEditingPub(null);
      setNewPub({ title: '', link: '' });
      setFeedback('Publication updated!');
    } catch (err) {
      console.error(err);
      setFeedback('Error updating publication.');
    }
  };

  return (
    <div className="publications-container">
      <h2>My Publications</h2>

      {feedback && <div className="feedback">{feedback}</div>}

      <div className="pub-form">
        <input
          type="text"
          placeholder="Publication Title"
          value={newPub.title}
          onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Link or PDF URL"
          value={newPub.link}
          onChange={(e) => setNewPub({ ...newPub, link: e.target.value })}
        />

        {editingPub ? (
          <div className="pub-buttons">
            <button onClick={handleUpdate}>Update</button>
            <button
              className="cancel-btn"
              onClick={() => {
                setEditingPub(null);
                setNewPub({ title: '', link: '' });
                setFeedback('');
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={handleAdd}>Add Publication</button>
        )}
      </div>

      <ul className="pub-list">
        {publications.map((p) => (
          <li key={p._id}>
            <div>
              <strong>{p.title}</strong>
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </div>
            <div>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(p._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Publications;
