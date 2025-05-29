import { useState } from 'react';
import './Publications.css';

function Publications() {
  // Hardcoded sample data
  const [publications, setPublications] = useState([
    {
      _id: '1',
      title: 'AI for Disaster Response',
      abstract: 'Using AI to improve disaster response efficiency.',
      publicationType: 'journal-article',
      authors: [
        { name: 'John Doe', isMainAuthor: true, affiliation: 'MIT', email: 'john@mit.edu' },
        { name: 'Alice Smith', isMainAuthor: false, affiliation: 'Harvard', email: 'alice@harvard.edu' }
      ],
      venue: { name: 'Journal of AI Research', type: 'journal', issn: '1234-5678', isbn: '' },
      publicationDate: { year: 2023, month: 5, day: 12 },
      doi: '10.1234/abcd1234',
      urls: { publication: 'https://example.com/paper', pdf: 'https://example.com/paper.pdf', arxiv: 'https://arxiv.org/abs/1234' },
      keywords: ['AI', 'Disaster Response'],
      tags: ['Machine Learning', 'Rescue'],
      researchAreas: ['AI for Social Good'],
      metrics: { citations: { count: 15 }, downloads: 120, views: 350 },
      files: [{ fileName: 'paper.pdf', fileType: 'pdf', url: 'https://example.com/paper.pdf', size: '2MB' }],
      status: 'published',
      isFeatured: true,
      visibility: 'public'
    }
  ]);

  const [newPub, setNewPub] = useState({
    title: '',
    abstract: '',
    publicationType: '',
    authors: '',
    venueName: '',
    venueType: '',
    issn: '',
    isbn: '',
    publicationYear: '',
    publicationMonth: '',
    publicationDay: '',
    doi: '',
    publicationUrl: '',
    pdfUrl: '',
    arxivUrl: '',
    keywords: '',
    tags: '',
    researchAreas: '',
    citations: '',
    downloads: '',
    views: '',
    files: '',
    status: '',
    isFeatured: false,
    visibility: 'private'
  });
  const [editingPub, setEditingPub] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleAddOrUpdate = () => {
    if (!newPub.title || !newPub.authors) {
      setFeedback('Please fill in title and authors.');
      return;
    }

    const pubData = {
      _id: editingPub ? editingPub._id : Date.now().toString(),
      title: newPub.title,
      abstract: newPub.abstract,
      publicationType: newPub.publicationType,
      authors: newPub.authors.split(';').map((a, i) => {
        const [name, isMain, affiliation, email] = a.split(',').map((x) => x.trim());
        return { name, isMainAuthor: isMain === 'true', affiliation, email };
      }),
      venue: { name: newPub.venueName, type: newPub.venueType, issn: newPub.issn, isbn: newPub.isbn },
      publicationDate: { year: newPub.publicationYear, month: newPub.publicationMonth, day: newPub.publicationDay },
      doi: newPub.doi,
      urls: { publication: newPub.publicationUrl, pdf: newPub.pdfUrl, arxiv: newPub.arxivUrl },
      keywords: newPub.keywords.split(',').map((k) => k.trim()),
      tags: newPub.tags.split(',').map((t) => t.trim()),
      researchAreas: newPub.researchAreas.split(',').map((r) => r.trim()),
      metrics: {
        citations: { count: parseInt(newPub.citations) || 0 },
        downloads: parseInt(newPub.downloads) || 0,
        views: parseInt(newPub.views) || 0
      },
      files: newPub.files.split(',').map((f) => {
        const [fileName, fileType, url, size] = f.split('|').map((x) => x.trim());
        return { fileName, fileType, url, size };
      }),
      status: newPub.status,
      isFeatured: newPub.isFeatured,
      visibility: newPub.visibility
    };

    if (editingPub) {
      setPublications(publications.map((p) => (p._id === editingPub._id ? pubData : p)));
      setFeedback('Publication updated!');
      setEditingPub(null);
    } else {
      setPublications([...publications, pubData]);
      setFeedback('Publication added!');
    }

    setNewPub({
      title: '',
      abstract: '',
      publicationType: '',
      authors: '',
      venueName: '',
      venueType: '',
      issn: '',
      isbn: '',
      publicationYear: '',
      publicationMonth: '',
      publicationDay: '',
      doi: '',
      publicationUrl: '',
      pdfUrl: '',
      arxivUrl: '',
      keywords: '',
      tags: '',
      researchAreas: '',
      citations: '',
      downloads: '',
      views: '',
      files: '',
      status: '',
      isFeatured: false,
      visibility: 'private'
    });
  };

  const handleEdit = (pub) => {
    setEditingPub(pub);
    setNewPub({
      title: pub.title,
      abstract: pub.abstract,
      publicationType: pub.publicationType,
      authors: pub.authors.map((a) => `${a.name}, ${a.isMainAuthor}, ${a.affiliation}, ${a.email}`).join('; '),
      venueName: pub.venue.name,
      venueType: pub.venue.type,
      issn: pub.venue.issn,
      isbn: pub.venue.isbn,
      publicationYear: pub.publicationDate.year,
      publicationMonth: pub.publicationDate.month,
      publicationDay: pub.publicationDate.day,
      doi: pub.doi,
      publicationUrl: pub.urls.publication,
      pdfUrl: pub.urls.pdf,
      arxivUrl: pub.urls.arxiv,
      keywords: pub.keywords.join(', '),
      tags: pub.tags.join(', '),
      researchAreas: pub.researchAreas.join(', '),
      citations: pub.metrics.citations.count.toString(),
      downloads: pub.metrics.downloads.toString(),
      views: pub.metrics.views.toString(),
      files: pub.files.map((f) => `${f.fileName}|${f.fileType}|${f.url}|${f.size}`).join(', '),
      status: pub.status,
      isFeatured: pub.isFeatured,
      visibility: pub.visibility
    });
    setFeedback('');
  };

  const handleDelete = (id) => {
    setPublications(publications.filter((p) => p._id !== id));
    setFeedback('Publication deleted.');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPub({
      ...newPub,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="publications-container">
      <h2>My Publications</h2>
      {feedback && <div className="feedback">{feedback}</div>}

      {/* Form */}
      <div className="pub-form">
        <input name="title" placeholder="Title" value={newPub.title} onChange={handleInputChange} />
        <textarea name="abstract" placeholder="Abstract" value={newPub.abstract} onChange={handleInputChange} />
        <input name="publicationType" placeholder="Publication Type" value={newPub.publicationType} onChange={handleInputChange} />
        <input name="authors" placeholder="Authors (name, isMainAuthor, affiliation, email; ...)" value={newPub.authors} onChange={handleInputChange} />
        <input name="venueName" placeholder="Venue Name" value={newPub.venueName} onChange={handleInputChange} />
        <input name="venueType" placeholder="Venue Type" value={newPub.venueType} onChange={handleInputChange} />
        <input name="issn" placeholder="ISSN" value={newPub.issn} onChange={handleInputChange} />
        <input name="isbn" placeholder="ISBN" value={newPub.isbn} onChange={handleInputChange} />
        <input name="publicationYear" placeholder="Year" value={newPub.publicationYear} onChange={handleInputChange} />
        <input name="publicationMonth" placeholder="Month" value={newPub.publicationMonth} onChange={handleInputChange} />
        <input name="publicationDay" placeholder="Day" value={newPub.publicationDay} onChange={handleInputChange} />
        <input name="doi" placeholder="DOI" value={newPub.doi} onChange={handleInputChange} />
        <input name="publicationUrl" placeholder="Publication URL" value={newPub.publicationUrl} onChange={handleInputChange} />
        <input name="pdfUrl" placeholder="PDF URL" value={newPub.pdfUrl} onChange={handleInputChange} />
        <input name="arxivUrl" placeholder="ArXiv URL" value={newPub.arxivUrl} onChange={handleInputChange} />
        <input name="keywords" placeholder="Keywords (comma-separated)" value={newPub.keywords} onChange={handleInputChange} />
        <input name="tags" placeholder="Tags (comma-separated)" value={newPub.tags} onChange={handleInputChange} />
        <input name="researchAreas" placeholder="Research Areas (comma-separated)" value={newPub.researchAreas} onChange={handleInputChange} />
        <input name="citations" placeholder="Citations" value={newPub.citations} onChange={handleInputChange} />
        <input name="downloads" placeholder="Downloads" value={newPub.downloads} onChange={handleInputChange} />
        <input name="views" placeholder="Views" value={newPub.views} onChange={handleInputChange} />
        <input name="files" placeholder="Files (fileName|fileType|url|size, ...)" value={newPub.files} onChange={handleInputChange} />
        <input name="status" placeholder="Status" value={newPub.status} onChange={handleInputChange} />
        <label>
          <input type="checkbox" name="isFeatured" checked={newPub.isFeatured} onChange={handleInputChange} />
          Featured
        </label>
        <label>
          <input type="checkbox" name="visibility" checked={newPub.visibility === 'public'} onChange={(e) => setNewPub({ ...newPub, visibility: e.target.checked ? 'public' : 'private' })} />
          Public
        </label>

        <div className="buttons">
          <button onClick={handleAddOrUpdate}>{editingPub ? 'Update' : 'Add'} Publication</button>
          {editingPub && <button className="cancel-btn" onClick={() => { setEditingPub(null); setNewPub({ ...newPub }); setFeedback(''); }}>Cancel</button>}
        </div>
      </div>

      {/* Listing */}
      <ul className="pub-list">
        {publications.map((p) => (
          <li key={p._id}>
            <h3>{p.title} ({p.status})</h3>
            <p>{p.abstract}</p>
            <p><strong>Authors:</strong> {p.authors.map((a) => a.name).join(', ')}</p>
            <p><strong>Venue:</strong> {p.venue.name} ({p.venue.type})</p>
            <p><strong>Publication Date:</strong> {p.publicationDate.year}-{p.publicationDate.month}-{p.publicationDate.day}</p>
            <p><strong>DOI:</strong> {p.doi}</p>
            <p><strong>Keywords:</strong> {p.keywords.join(', ')}</p>
            <p><strong>Metrics:</strong> {p.metrics.citations.count} citations, {p.metrics.downloads} downloads, {p.metrics.views} views</p>
            <p><strong>Files:</strong> {p.files.map((f) => f.fileName).join(', ')}</p>
            {p.isFeatured && <span className="tag">⭐ Featured</span>}
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

export default Publications;
