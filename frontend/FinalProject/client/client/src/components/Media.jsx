import { useState } from 'react';
import './Media.css';


function Media() {
  const [mediaList, setMediaList] = useState([
    {
      _id: '1',
      title: 'AI Lab Featured on TechTalk',
      mediaType: 'video',
      outlet: 'TechTalk TV',
      publishDate: '2024-10-15',
      journalist: 'Emma Brown',
      url: 'https://techtalk.com/interview',
      description: 'Discussion on AI applications in disaster response.',
      topics: ['AI', 'Disaster Response'],
      quotes: ['"AI is saving lives faster than ever" - Prof. Jane'],
      mediaFiles: {
        image: 'https://example.com/media1.jpg',
        video: 'https://example.com/media1.mp4',
        audio: ''
      },
      viewCount: 10234,
      shareCount: 235,
      impactScore: 88,
      language: 'English',
      duration: '15:30',
      isPublic: true,
      isFeatured: true
    }
  ]);

  const [newMedia, setNewMedia] = useState({
    title: '', mediaType: 'article', outlet: '', publishDate: '', journalist: '', url: '',
    description: '', topics: '', quotes: '', mediaFiles: { image: '', video: '', audio: '' },
    viewCount: '', shareCount: '', impactScore: '', language: '', duration: '',
    isPublic: true, isFeatured: false
  });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in newMedia.mediaFiles) {
      setNewMedia({ ...newMedia, mediaFiles: { ...newMedia.mediaFiles, [name]: value } });
    } else {
      setNewMedia({ ...newMedia, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleAddMedia = () => {
    if (!newMedia.title || !newMedia.outlet || !newMedia.url) {
      setFeedback('Title, Outlet, and URL are required.');
      return;
    }
    const mediaData = {
      ...newMedia,
      _id: Date.now().toString(),
      topics: newMedia.topics.split(',').map(t => t.trim()),
      quotes: newMedia.quotes.split('|').map(q => q.trim()),
      viewCount: parseInt(newMedia.viewCount) || 0,
      shareCount: parseInt(newMedia.shareCount) || 0,
      impactScore: parseFloat(newMedia.impactScore) || 0
    };
    setMediaList([...mediaList, mediaData]);
    setFeedback('Media entry added!');
    setNewMedia({
      title: '', mediaType: 'article', outlet: '', publishDate: '', journalist: '', url: '',
      description: '', topics: '', quotes: '', mediaFiles: { image: '', video: '', audio: '' },
      viewCount: '', shareCount: '', impactScore: '', language: '', duration: '',
      isPublic: true, isFeatured: false
    });
  };

  return (
    <div className="media-container">
      <h2>Media Coverage</h2>
      {feedback && <div className="feedback">{feedback}</div>}
      <div className="media-form">
        <input name="title" placeholder="Title" value={newMedia.title} onChange={handleChange} />
        <select name="mediaType" value={newMedia.mediaType} onChange={handleChange}>
          <option value="article">Article</option>
          <option value="interview">Interview</option>
          <option value="podcast">Podcast</option>
          <option value="video">Video</option>
        </select>
        <input name="outlet" placeholder="Media Outlet" value={newMedia.outlet} onChange={handleChange} />
        <input type="date" name="publishDate" value={newMedia.publishDate} onChange={handleChange} />
        <input name="journalist" placeholder="Journalist" value={newMedia.journalist} onChange={handleChange} />
        <input name="url" placeholder="Article/Video URL" value={newMedia.url} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={newMedia.description} onChange={handleChange} />
        <input name="topics" placeholder="Topics (comma-separated)" value={newMedia.topics} onChange={handleChange} />
        <input name="quotes" placeholder="Quotes (| separated)" value={newMedia.quotes} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={newMedia.mediaFiles.image} onChange={handleChange} />
        <input name="video" placeholder="Video URL" value={newMedia.mediaFiles.video} onChange={handleChange} />
        <input name="audio" placeholder="Audio URL" value={newMedia.mediaFiles.audio} onChange={handleChange} />
        <input name="viewCount" placeholder="Views" value={newMedia.viewCount} onChange={handleChange} />
        <input name="shareCount" placeholder="Shares" value={newMedia.shareCount} onChange={handleChange} />
        <input name="impactScore" placeholder="Impact Score" value={newMedia.impactScore} onChange={handleChange} />
        <input name="language" placeholder="Language" value={newMedia.language} onChange={handleChange} />
        <input name="duration" placeholder="Duration (for video/audio)" value={newMedia.duration} onChange={handleChange} />
        <label><input type="checkbox" name="isPublic" checked={newMedia.isPublic} onChange={handleChange} /> Public</label>
        <label><input type="checkbox" name="isFeatured" checked={newMedia.isFeatured} onChange={handleChange} /> Featured</label>
        <div className="buttons">
          <button onClick={handleAddMedia}>Add Media</button>
        </div>
      </div>

      <ul className="media-list">
        {mediaList.map(m => (
          <li key={m._id}>
            <h3>{m.title} <span className="badge">{m.mediaType}</span></h3>
            <p><strong>Outlet:</strong> {m.outlet} | <strong>Journalist:</strong> {m.journalist}</p>
            <p><strong>Date:</strong> {m.publishDate}</p>
            <p>{m.description}</p>
            <p><strong>Topics:</strong> {m.topics.join(', ')}</p>
            <p><strong>Views:</strong> {m.viewCount}, <strong>Shares:</strong> {m.shareCount}, <strong>Impact:</strong> {m.impactScore}</p>
            {m.mediaFiles.video && <video width="320" controls src={m.mediaFiles.video} />}
            {m.mediaFiles.image && <img src={m.mediaFiles.image} alt={m.title} width="150" />}
            <a href={m.url} target="_blank" rel="noopener noreferrer">View Full</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Media;
