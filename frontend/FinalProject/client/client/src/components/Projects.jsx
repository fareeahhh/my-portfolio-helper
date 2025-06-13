import { useState } from 'react';
import './Projects.css';

function Projects() {
  // Hardcoded sample project data
  const [projects, setProjects] = useState([
    {
      _id: '1',
      title: 'AI Disaster Response',
      description: 'A project focused on using AI to improve disaster response efforts.',
      projectType: 'research',
      startDate: '2023-01-01',
      endDate: '2024-06-30',
      status: 'ongoing',
      collaborators: ['Alice', 'Bob'],
      principalInvestigator: 'Dr. John Smith',
      role: 'Lead Researcher',
      amount: 100000,
      currency: 'USD',
      fundingSource: 'NSF Grant',
      relatedPublications: ['AI & Disaster Management', 'ML in Crisis Response'],
      achievements: ['Prototype built', 'Field tested'],
      projectUrl: 'https://example.com/ai-disaster-response',
      repositoryUrl: 'https://github.com/example/ai-disaster',
      demoUrl: 'https://demo.example.com/ai-disaster',
      keywords: ['AI', 'Disaster Response', 'Robotics'],
      researchAreas: ['AI for Social Good'],
      images: ['image1.png', 'image2.png'],
      documents: ['proposal.pdf', 'report.pdf'],
      isPublic: true,
      isFeatured: true,
      isInternational: true
    },
    {
      _id: '2',
      title: 'Smart City IoT Platform',
      description: 'IoT-based platform for smart city infrastructure monitoring and management.',
      projectType: 'development',
      startDate: '2023-03-15',
      endDate: '2024-12-31',
      status: 'completed',
      collaborators: ['Charlie', 'Diana', 'Eve'],
      principalInvestigator: 'Prof. Sarah Johnson',
      role: 'Technical Lead',
      amount: 75000,
      currency: 'USD',
      fundingSource: 'City Grant',
      relatedPublications: ['IoT in Urban Planning', 'Smart Cities Review'],
      achievements: ['Deployed in 3 cities', 'Award winning'],
      projectUrl: 'https://example.com/smart-city',
      repositoryUrl: 'https://github.com/example/smart-city',
      demoUrl: 'https://demo.example.com/smart-city',
      keywords: ['IoT', 'Smart Cities', 'Sensors'],
      researchAreas: ['Urban Technology'],
      images: ['city1.png', 'city2.png'],
      documents: ['technical_spec.pdf', 'deployment_guide.pdf'],
      isPublic: true,
      isFeatured: false,
      isInternational: false
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    projectType: '',
    startDate: '',
    endDate: '',
    status: '',
    collaborators: '',
    principalInvestigator: '',
    role: '',
    amount: '',
    currency: '',
    fundingSource: '',
    relatedPublications: '',
    achievements: '',
    projectUrl: '',
    repositoryUrl: '',
    demoUrl: '',
    keywords: '',
    researchAreas: '',
    images: '',
    documents: '',
    isPublic: false,
    isFeatured: false,
    isInternational: false
  });
  const [editingProject, setEditingProject] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddOrUpdate = () => {
    if (!newProject.title) {
      setFeedback('Project title is required.');
      return;
    }

    const projectData = {
      ...newProject,
      collaborators: newProject.collaborators.split(',').map((c) => c.trim()),
      relatedPublications: newProject.relatedPublications.split(',').map((p) => p.trim()),
      achievements: newProject.achievements.split(',').map((a) => a.trim()),
      keywords: newProject.keywords.split(',').map((k) => k.trim()),
      researchAreas: newProject.researchAreas.split(',').map((r) => r.trim()),
      images: newProject.images.split(',').map((i) => i.trim()),
      documents: newProject.documents.split(',').map((d) => d.trim())
    };

    if (editingProject) {
      // Update
      setProjects(
        projects.map((p) => (p._id === editingProject._id ? { ...p, ...projectData } : p))
      );
      setFeedback('Project updated successfully!');
      setEditingProject(null);
    } else {
      // Add
      const newId = Date.now().toString();
      setProjects([...projects, { _id: newId, ...projectData }]);
      setFeedback('Project added successfully!');
    }

    setNewProject({
      title: '',
      description: '',
      projectType: '',
      startDate: '',
      endDate: '',
      status: '',
      collaborators: '',
      principalInvestigator: '',
      role: '',
      amount: '',
      currency: '',
      fundingSource: '',
      relatedPublications: '',
      achievements: '',
      projectUrl: '',
      repositoryUrl: '',
      demoUrl: '',
      keywords: '',
      researchAreas: '',
      images: '',
      documents: '',
      isPublic: false,
      isFeatured: false,
      isInternational: false
    });
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      ...project,
      collaborators: project.collaborators.join(', '),
      relatedPublications: project.relatedPublications.join(', '),
      achievements: project.achievements.join(', '),
      keywords: project.keywords.join(', '),
      researchAreas: project.researchAreas.join(', '),
      images: project.images.join(', '),
      documents: project.documents.join(', ')
    });
    setFeedback('');
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p._id !== id));
    setFeedback('Project deleted successfully.');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProject({
      ...newProject,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ongoing': return '#28a745';
      case 'completed': return '#007bff';
      case 'paused': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getProjectTypeIcon = (type) => {
    switch(type) {
      case 'research': return '🔬';
      case 'development': return '💻';
      case 'design': return '🎨';
      case 'collaboration': return '🤝';
      default: return '📋';
    }
  };

  return (
    <div className="projects-container">
      <div className="header-section">
        <h1 className="page-title">My Projects & Collaborations</h1>
        <p className="page-subtitle">Showcasing my research projects, collaborations, and technical contributions</p>
        
        {!showForm && (
          <button 
            className="add-project-btn"
            onClick={() => setShowForm(true)}
          >
            <span className="btn-icon">+</span>
            Add New Project
          </button>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${feedback.includes('successfully') ? 'success' : feedback.includes('deleted') ? 'warning' : 'error'}`}>
          <span className="feedback-icon">
            {feedback.includes('successfully') ? '✓' : feedback.includes('deleted') ? '⚠' : '!'}
          </span>
          {feedback}
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            <button 
              className="close-form-btn"
              onClick={() => {
                setShowForm(false);
                setEditingProject(null);
                setNewProject({
                  title: '',
                  description: '',
                  projectType: '',
                  startDate: '',
                  endDate: '',
                  status: '',
                  collaborators: '',
                  principalInvestigator: '',
                  role: '',
                  amount: '',
                  currency: '',
                  fundingSource: '',
                  relatedPublications: '',
                  achievements: '',
                  projectUrl: '',
                  repositoryUrl: '',
                  demoUrl: '',
                  keywords: '',
                  researchAreas: '',
                  images: '',
                  documents: '',
                  isPublic: false,
                  isFeatured: false,
                  isInternational: false
                });
                setFeedback('');
              }}
            >
              ×
            </button>
          </div>

          <div className="form">
            <div className="form-section">
              <h4>Basic Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input name="title" placeholder="Enter project title" value={newProject.title} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Project Type</label>
                  <select name="projectType" value={newProject.projectType} onChange={handleInputChange}>
                    <option value="">Select type</option>
                    <option value="research">Research</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="collaboration">Collaboration</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Description</label>
                <textarea name="description" placeholder="Describe your project" value={newProject.description} onChange={handleInputChange}></textarea>
              </div>
            </div>

            <div className="form-section">
              <h4>Timeline & Status</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input name="startDate" type="date" value={newProject.startDate} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input name="endDate" type="date" value={newProject.endDate} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={newProject.status} onChange={handleInputChange}>
                    <option value="">Select status</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Team & Funding</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Principal Investigator</label>
                  <input name="principalInvestigator" placeholder="PI name" value={newProject.principalInvestigator} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Your Role</label>
                  <input name="role" placeholder="Your role in project" value={newProject.role} onChange={handleInputChange} />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Collaborators</label>
                <input name="collaborators" placeholder="Comma-separated list of collaborators" value={newProject.collaborators} onChange={handleInputChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Funding Amount</label>
                  <input name="amount" type="number" placeholder="0" value={newProject.amount} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <input name="currency" placeholder="USD" value={newProject.currency} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Funding Source</label>
                  <input name="fundingSource" placeholder="Grant/Organization" value={newProject.fundingSource} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Research & Publications</h4>
              <div className="form-group full-width">
                <label>Related Publications</label>
                <input name="relatedPublications" placeholder="Comma-separated publication titles" value={newProject.relatedPublications} onChange={handleInputChange} />
              </div>
              
              <div className="form-group full-width">
                <label>Key Achievements</label>
                <input name="achievements" placeholder="Comma-separated achievements" value={newProject.achievements} onChange={handleInputChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Keywords</label>
                  <input name="keywords" placeholder="Comma-separated keywords" value={newProject.keywords} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Research Areas</label>
                  <input name="researchAreas" placeholder="Comma-separated research areas" value={newProject.researchAreas} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Links & Media</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Project URL</label>
                  <input name="projectUrl" placeholder="https://..." value={newProject.projectUrl} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Repository URL</label>
                  <input name="repositoryUrl" placeholder="https://github.com/..." value={newProject.repositoryUrl} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Demo URL</label>
                  <input name="demoUrl" placeholder="https://demo..." value={newProject.demoUrl} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Images</label>
                  <input name="images" placeholder="Comma-separated image filenames" value={newProject.images} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Documents</label>
                  <input name="documents" placeholder="Comma-separated document filenames" value={newProject.documents} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Settings</h4>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="isPublic" checked={newProject.isPublic} onChange={handleInputChange} />
                  <span className="checkmark"></span>
                  Public Project
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="isFeatured" checked={newProject.isFeatured} onChange={handleInputChange} />
                  <span className="checkmark"></span>
                  Featured Project
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="isInternational" checked={newProject.isInternational} onChange={handleInputChange} />
                  <span className="checkmark"></span>
                  International Collaboration
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button className="primary-btn" onClick={handleAddOrUpdate}>
                {editingProject ? 'Update Project' : 'Add Project'}
              </button>
              {editingProject && (
                <button
                  className="secondary-btn"
                  onClick={() => {
                    setEditingProject(null);
                    setShowForm(false);
                    setNewProject({
                      title: '',
                      description: '',
                      projectType: '',
                      startDate: '',
                      endDate: '',
                      status: '',
                      collaborators: '',
                      principalInvestigator: '',
                      role: '',
                      amount: '',
                      currency: '',
                      fundingSource: '',
                      relatedPublications: '',
                      achievements: '',
                      projectUrl: '',
                      repositoryUrl: '',
                      demoUrl: '',
                      keywords: '',
                      researchAreas: '',
                      images: '',
                      documents: '',
                      isPublic: false,
                      isFeatured: false,
                      isInternational: false
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
      )}

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <div className="project-header">
              <div className="project-title-section">
                <div className="project-icon">
                  {getProjectTypeIcon(project.projectType)}
                </div>
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    <span className="project-type">{project.projectType}</span>
                    <span className="project-status" style={{backgroundColor: getStatusColor(project.status)}}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="project-tags">
                {project.isFeatured && <span className="tag featured">⭐ Featured</span>}
                {project.isInternational && <span className="tag international">🌍 International</span>}
              </div>
            </div>

            <div className="project-content">
              <p className="project-description">{project.description}</p>
              
              <div className="project-details">
                <div className="detail-item">
                  <span className="detail-label">Timeline:</span>
                  <span className="detail-value">{project.startDate} - {project.endDate}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Principal Investigator:</span>
                  <span className="detail-value">{project.principalInvestigator}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Role:</span>
                  <span className="detail-value">{project.role}</span>
                </div>
                
                {project.amount && (
                  <div className="detail-item">
                    <span className="detail-label">Funding:</span>
                    <span className="detail-value">{project.amount} {project.currency} ({project.fundingSource})</span>
                  </div>
                )}
                
                {project.collaborators.length > 0 && (
                  <div className="detail-item">
                    <span className="detail-label">Collaborators:</span>
                    <span className="detail-value">{project.collaborators.join(', ')}</span>
                  </div>
                )}
                
                {project.achievements.length > 0 && (
                  <div className="detail-item">
                    <span className="detail-label">Key Achievements:</span>
                    <span className="detail-value">{project.achievements.join(', ')}</span>
                  </div>
                )}
              </div>

              {project.keywords.length > 0 && (
                <div className="keywords">
                  {project.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">{keyword}</span>
                  ))}
                </div>
              )}

              {(project.projectUrl || project.repositoryUrl || project.demoUrl) && (
                <div className="project-links">
                  {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      🌐 Project
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      📦 Repository
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      🚀 Demo
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="project-actions">
              <button className="edit-btn" onClick={() => handleEdit(project)}>
                ✏️ Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(project._id)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No projects yet</h3>
          <p>Start by adding your first project to showcase your work!</p>
        </div>
      )}
    </div>
  );
}

export default Projects;