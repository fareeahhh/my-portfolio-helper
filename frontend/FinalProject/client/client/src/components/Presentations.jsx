import { useState } from 'react';
import './Presentations.css';

function Presentations() {
  const [presentations, setPresentations] = useState([
    {
      _id: 'p1',
      title: 'AI for Disaster Relief',
      abstract: 'Exploring the use of AI in emergency response.',
      presentationType: 'conference',
      event: {
        eventName: 'ICML 2024',
        eventType: 'conference',
        location: 'New York, USA',
        date: '2024-07-20'
      },
      duration: '45 mins',
      audience: 'Researchers, Engineers',
      slidesUrl: 'https://example.com/slides.pdf',
      videoUrl: 'https://youtube.com/example',
      isInvited: true,
      isKeynote: false,
      awards: ['Best Presentation'],
      materials: {
        slides: { url: 'https://example.com/slides.pdf' },
        video: { url: 'https://youtube.com/example' },
        poster: { url: 'https://example.com/poster.png' }
      },
      attendeeCount: 300,
      feedbackScore: 4.5,
      topics: ['AI', 'Disaster Management'],
      keywords: ['AI', 'Emergency', 'ICML'],
      isPublic: true,
      isFeatured: true
    }
  ]);

  const [newPres, setNewPres] = useState({
    title: '',
    abstract: '',
    presentationType: '',
    eventName: '',
    eventType: '',
    location: '',
    date: '',
    duration: '',
    audience: '',
    slidesUrl: '',
    videoUrl: '',
    awards: '',
    attendeeCount: '',
    feedbackScore: '',
    topics: '',
    keywords: '',
    isInvited: false,
    isKeynote: false,
    isPublic: false,
    isFeatured: false
  });

  const [editingPres, setEditingPres] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleAddOrUpdate = () => {
    if (!newPres.title || !newPres.abstract) {
      setFeedback('Please enter title and abstract.');
      return;
    }

    const data = {
      ...newPres,
      _id: editingPres ? editingPres._id : Date.now().toString(),
      awards: newPres.awards.split(',').map(a => a.trim()),
      topics: newPres.topics.split(',').map(t => t.trim()),
      keywords: newPres.keywords.split(',').map(k => k.trim()),
      attendeeCount: parseInt(newPres.attendeeCount) || 0,
      feedbackScore: parseFloat(newPres.feedbackScore) || 0,
      event: {
        eventName: newPres.eventName,
        eventType: newPres.eventType,
        location: newPres.location,
        date: newPres.date
      },
      materials: {
        slides: { url: newPres.slidesUrl },
        video: { url: newPres.videoUrl },
        poster: { url: '' }
      }
    };

    if (editingPres) {
      setPresentations(presentations.map(p => p._id === editingPres._id ? data : p));
      setEditingPres(null);
      setFeedback('Presentation updated.');
    } else {
      setPresentations([...presentations, data]);
      setFeedback('Presentation added.');
    }

    setNewPres({
      title: '', abstract: '', presentationType: '', eventName: '', eventType: '', location: '', date: '',
      duration: '', audience: '', slidesUrl: '', videoUrl: '', awards: '', attendeeCount: '', feedbackScore: '',
      topics: '', keywords: '', isInvited: false, isKeynote: false, isPublic: false, isFeatured: false
    });
  };

  const handleEdit = (p) => {
    setEditingPres(p);
    setNewPres({
      title: p.title,
      abstract: p.abstract,
      presentationType: p.presentationType,
      eventName: p.event.eventName,
      eventType: p.event.eventType,
      location: p.event.location,
      date: p.event.date,
      duration: p.duration,
      audience: p.audience,
      slidesUrl: p.slidesUrl,
      videoUrl: p.videoUrl,
      awards: p.awards.join(', '),
      attendeeCount: p.attendeeCount,
      feedbackScore: p.feedbackScore,
      topics: p.topics.join(', '),
      keywords: p.keywords.join(', '),
      isInvited: p.isInvited,
      isKeynote: p.isKeynote,
      isPublic: p.isPublic,
      isFeatured: p.isFeatured
    });
    setFeedback('');
  };

  const handleDelete = (id) => {
    setPresentations(presentations.filter(p => p._id !== id));
    setFeedback('Presentation deleted.');
  };

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setNewPres({ ...newPres, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="publications-container">
      <h2>My Presentations</h2>
      {feedback && <div className="feedback">{feedback}</div>}

      <div className="pub-form">
        <input name="title" placeholder="Title" value={newPres.title} onChange={handleInputChange} />
        <textarea name="abstract" placeholder="Abstract" value={newPres.abstract} onChange={handleInputChange} />
        <input name="presentationType" placeholder="Type (keynote, conference...)" value={newPres.presentationType} onChange={handleInputChange} />
        <input name="eventName" placeholder="Event Name" value={newPres.eventName} onChange={handleInputChange} />
        <input name="eventType" placeholder="Event Type" value={newPres.eventType} onChange={handleInputChange} />
        <input name="location" placeholder="Location" value={newPres.location} onChange={handleInputChange} />
        <input name="date" type="date" value={newPres.date} onChange={handleInputChange} />
        <input name="duration" placeholder="Duration" value={newPres.duration} onChange={handleInputChange} />
        <input name="audience" placeholder="Audience" value={newPres.audience} onChange={handleInputChange} />
        <input name="slidesUrl" placeholder="Slides URL" value={newPres.slidesUrl} onChange={handleInputChange} />
        <input name="videoUrl" placeholder="Video URL" value={newPres.videoUrl} onChange={handleInputChange} />
        <input name="awards" placeholder="Awards (comma-separated)" value={newPres.awards} onChange={handleInputChange} />
        <input name="attendeeCount" placeholder="Attendee Count" value={newPres.attendeeCount} onChange={handleInputChange} />
        <input name="feedbackScore" placeholder="Feedback Score" value={newPres.feedbackScore} onChange={handleInputChange} />
        <input name="topics" placeholder="Topics (comma-separated)" value={newPres.topics} onChange={handleInputChange} />
        <input name="keywords" placeholder="Keywords (comma-separated)" value={newPres.keywords} onChange={handleInputChange} />
        <label><input type="checkbox" name="isInvited" checked={newPres.isInvited} onChange={handleInputChange} /> Invited Talk</label>
        <label><input type="checkbox" name="isKeynote" checked={newPres.isKeynote} onChange={handleInputChange} /> Keynote</label>
        <label><input type="checkbox" name="isPublic" checked={newPres.isPublic} onChange={handleInputChange} /> Public</label>
        <label><input type="checkbox" name="isFeatured" checked={newPres.isFeatured} onChange={handleInputChange} /> Featured</label>

        <div className="buttons">
          <button onClick={handleAddOrUpdate}>{editingPres ? 'Update' : 'Add'} Presentation</button>
          {editingPres && (
            <button className="cancel-btn" onClick={() => { setEditingPres(null); setNewPres({ ...newPres }); setFeedback(''); }}>Cancel</button>
          )}
        </div>
      </div>

      <ul className="pub-list">
        {presentations.map((p) => (
          <li key={p._id}>
            <h3>{p.title} ({p.presentationType})</h3>
            <p>{p.abstract}</p>
            <p><strong>Event:</strong> {p.event.eventName} ({p.event.eventType}) – {p.event.location} on {p.event.date}</p>
            <p><strong>Slides:</strong> <a href={p.slidesUrl} target="_blank">View</a></p>
            <p><strong>Video:</strong> <a href={p.videoUrl} target="_blank">Watch</a></p>
            <p><strong>Audience:</strong> {p.audience} – {p.attendeeCount} attendees, score: {p.feedbackScore}</p>
            {p.isInvited && <span className="tag">🎖️ Invited</span>}
            {p.isKeynote && <span className="tag">⭐ Keynote</span>}
            {p.isFeatured && <span className="tag">🌟 Featured</span>}
            <div>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Presentations;
