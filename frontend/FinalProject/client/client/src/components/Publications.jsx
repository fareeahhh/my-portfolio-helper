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
    <div className="publications-page">
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="header-text">
            <h2>My Publications</h2>
            <p>Manage and showcase your research publications</p>
          </div>
        </div>
      </div>

      {feedback && (
        <div className={`feedback-message ${feedback.includes('deleted') ? 'error' : 'success'}`}>
          <div className="feedback-icon">
            {feedback.includes('deleted') ? '🗑️' : feedback.includes('updated') ? '✏️' : '✅'}
          </div>
          <span>{feedback}</span>
        </div>
      )}

      <div className="content-grid">
        <div className="form-section">
          <div className="section-card">
            <div className="section-header">
              <div className="section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{editingPub ? 'Edit Publication' : 'Add New Publication'}</h3>
            </div>

            <div className="pub-form">
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Title *</label>
                  <input 
                    name="title" 
                    placeholder="Enter publication title" 
                    value={newPub.title} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Abstract</label>
                  <textarea 
                    name="abstract" 
                    placeholder="Brief description of your publication" 
                    value={newPub.abstract} 
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Publication Type</label>
                  <select name="publicationType" value={newPub.publicationType} onChange={handleInputChange}>
                    <option value="">Select type</option>
                    <option value="journal-article">Journal Article</option>
                    <option value="conference-paper">Conference Paper</option>
                    <option value="book-chapter">Book Chapter</option>
                    <option value="thesis">Thesis</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={newPub.status} onChange={handleInputChange}>
                    <option value="">Select status</option>
                    <option value="published">Published</option>
                    <option value="accepted">Accepted</option>
                    <option value="under-review">Under Review</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Authors *</label>
                  <input 
                    name="authors" 
                    placeholder="Format: Name, isMainAuthor, Affiliation, Email; Next Author..." 
                    value={newPub.authors} 
                    onChange={handleInputChange} 
                  />
                  <small>Example: John Doe, true, MIT, john@mit.edu; Jane Smith, false, Harvard, jane@harvard.edu</small>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Venue Name</label>
                  <input name="venueName" placeholder="Journal/Conference name" value={newPub.venueName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Venue Type</label>
                  <select name="venueType" value={newPub.venueType} onChange={handleInputChange}>
                    <option value="">Select type</option>
                    <option value="journal">Journal</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Publication Year</label>
                  <input name="publicationYear" type="number" placeholder="2024" value={newPub.publicationYear} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Month</label>
                  <input name="publicationMonth" type="number" placeholder="12" value={newPub.publicationMonth} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Day</label>
                  <input name="publicationDay" type="number" placeholder="15" value={newPub.publicationDay} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>DOI</label>
                  <input name="doi" placeholder="10.1234/example" value={newPub.doi} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>ISSN</label>
                  <input name="issn" placeholder="1234-5678" value={newPub.issn} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Publication URL</label>
                  <input name="publicationUrl" placeholder="https://..." value={newPub.publicationUrl} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>PDF URL</label>
                  <input name="pdfUrl" placeholder="https://..." value={newPub.pdfUrl} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Keywords</label>
                  <input name="keywords" placeholder="AI, Machine Learning, Computer Vision" value={newPub.keywords} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Research Areas</label>
                  <input name="researchAreas" placeholder="Artificial Intelligence, Robotics" value={newPub.researchAreas} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Citations</label>
                  <input name="citations" type="number" placeholder="0" value={newPub.citations} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Downloads</label>
                  <input name="downloads" type="number" placeholder="0" value={newPub.downloads} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Views</label>
                  <input name="views" type="number" placeholder="0" value={newPub.views} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="isFeatured" 
                      checked={newPub.isFeatured} 
                      onChange={handleInputChange} 
                    />
                    <span className="checkmark"></span>
                    Featured Publication
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="visibility" 
                      checked={newPub.visibility === 'public'} 
                      onChange={(e) => setNewPub({ ...newPub, visibility: e.target.checked ? 'public' : 'private' })} 
                    />
                    <span className="checkmark"></span>
                    Public Visibility
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn-primary" onClick={handleAddOrUpdate}>
                  {editingPub ? 'Update Publication' : 'Add Publication'}
                </button>
                {editingPub && (
                  <button 
                    className="btn-secondary" 
                    onClick={() => { 
                      setEditingPub(null); 
                      setNewPub({
                        title: '', abstract: '', publicationType: '', authors: '', venueName: '', venueType: '',
                        issn: '', isbn: '', publicationYear: '', publicationMonth: '', publicationDay: '',
                        doi: '', publicationUrl: '', pdfUrl: '', arxivUrl: '', keywords: '', tags: '',
                        researchAreas: '', citations: '', downloads: '', views: '', files: '', status: '',
                        isFeatured: false, visibility: 'private'
                      }); 
                      setFeedback(''); 
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="publications-list">
          {publications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h3>No publications yet</h3>
              <p>Add your first publication to get started</p>
            </div>
          ) : (
            publications.map((pub) => (
              <div key={pub._id} className="publication-card">
                <div className="publication-header">
                  <div className="publication-status">
                    <span className={`status-badge ${pub.status}`}>{pub.status}</span>
                    {pub.isFeatured && <span className="featured-badge">⭐ Featured</span>}
                  </div>
                  <div className="publication-actions">
                    <button className="btn-edit" onClick={() => handleEdit(pub)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(pub._id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="publication-content">
                  <h3 className="publication-title">{pub.title}</h3>
                  <p className="publication-abstract">{pub.abstract}</p>
                  
                  <div className="publication-meta">
                    <div className="meta-item">
                      <strong>Authors:</strong>
                      <span>{pub.authors.map((a, i) => (
                        <span key={i} className={a.isMainAuthor ? 'main-author' : ''}>
                          {a.name}{i < pub.authors.length - 1 ? ', ' : ''}
                        </span>
                      ))}</span>
                    </div>
                    
                    <div className="meta-item">
                      <strong>Venue:</strong>
                      <span>{pub.venue.name} ({pub.venue.type})</span>
                    </div>
                    
                    <div className="meta-item">
                      <strong>Date:</strong>
                      <span>{pub.publicationDate.day}/{pub.publicationDate.month}/{pub.publicationDate.year}</span>
                    </div>
                    
                    {pub.doi && (
                      <div className="meta-item">
                        <strong>DOI:</strong>
                        <span>{pub.doi}</span>
                      </div>
                    )}
                  </div>

                  {pub.keywords.length > 0 && (
                    <div className="keywords-section">
                      <strong>Keywords:</strong>
                      <div className="keywords-list">
                        {pub.keywords.map((keyword, i) => (
                          <span key={i} className="keyword-tag">{keyword}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="publication-metrics">
                    <div className="metric">
                      <span className="metric-value">{pub.metrics.citations.count}</span>
                      <span className="metric-label">Citations</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">{pub.metrics.downloads}</span>
                      <span className="metric-label">Downloads</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">{pub.metrics.views}</span>
                      <span className="metric-label">Views</span>
                    </div>
                  </div>

                  {(pub.urls.publication || pub.urls.pdf || pub.urls.arxiv) && (
                    <div className="publication-links">
                      {pub.urls.publication && (
                        <a href={pub.urls.publication} target="_blank" rel="noopener noreferrer" className="link-btn">
                          📄 Publication
                        </a>
                      )}
                      {pub.urls.pdf && (
                        <a href={pub.urls.pdf} target="_blank" rel="noopener noreferrer" className="link-btn">
                          📑 PDF
                        </a>
                      )}
                      {pub.urls.arxiv && (
                        <a href={pub.urls.arxiv} target="_blank" rel="noopener noreferrer" className="link-btn">
                          📚 arXiv
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Publications;