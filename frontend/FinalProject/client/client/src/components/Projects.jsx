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
    // Add more sample projects here
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
      setFeedback('Project updated!');
      setEditingProject(null);
    } else {
      // Add
      const newId = Date.now().toString();
      setProjects([...projects, { _id: newId, ...projectData }]);
      setFeedback('Project added!');
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
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p._id !== id));
    setFeedback('Project deleted.');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProject({
      ...newProject,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="projects-container">
      <h2>My Projects & Collaborations</h2>
      {feedback && <div className="feedback">{feedback}</div>}

      <div className="form">
        <input name="title" placeholder="Title" value={newProject.title} onChange={handleInputChange} />
        <textarea name="description" placeholder="Description" value={newProject.description} onChange={handleInputChange}></textarea>
        <input name="projectType" placeholder="Project Type" value={newProject.projectType} onChange={handleInputChange} />
        <input name="startDate" type="date" placeholder="Start Date" value={newProject.startDate} onChange={handleInputChange} />
        <input name="endDate" type="date" placeholder="End Date" value={newProject.endDate} onChange={handleInputChange} />
        <input name="status" placeholder="Status" value={newProject.status} onChange={handleInputChange} />
        <input name="collaborators" placeholder="Collaborators (comma-separated)" value={newProject.collaborators} onChange={handleInputChange} />
        <input name="principalInvestigator" placeholder="Principal Investigator" value={newProject.principalInvestigator} onChange={handleInputChange} />
        <input name="role" placeholder="Role" value={newProject.role} onChange={handleInputChange} />
        <input name="amount" type="number" placeholder="Funding Amount" value={newProject.amount} onChange={handleInputChange} />
        <input name="currency" placeholder="Currency" value={newProject.currency} onChange={handleInputChange} />
        <input name="fundingSource" placeholder="Funding Source" value={newProject.fundingSource} onChange={handleInputChange} />
        <input name="relatedPublications" placeholder="Related Publications (comma-separated)" value={newProject.relatedPublications} onChange={handleInputChange} />
        <input name="achievements" placeholder="Achievements (comma-separated)" value={newProject.achievements} onChange={handleInputChange} />
        <input name="projectUrl" placeholder="Project URL" value={newProject.projectUrl} onChange={handleInputChange} />
        <input name="repositoryUrl" placeholder="Repository URL" value={newProject.repositoryUrl} onChange={handleInputChange} />
        <input name="demoUrl" placeholder="Demo URL" value={newProject.demoUrl} onChange={handleInputChange} />
        <input name="keywords" placeholder="Keywords (comma-separated)" value={newProject.keywords} onChange={handleInputChange} />
        <input name="researchAreas" placeholder="Research Areas (comma-separated)" value={newProject.researchAreas} onChange={handleInputChange} />
        <input name="images" placeholder="Images (comma-separated)" value={newProject.images} onChange={handleInputChange} />
        <input name="documents" placeholder="Documents (comma-separated)" value={newProject.documents} onChange={handleInputChange} />
        <label>
          <input type="checkbox" name="isPublic" checked={newProject.isPublic} onChange={handleInputChange} />
          Public
        </label>
        <label>
          <input type="checkbox" name="isFeatured" checked={newProject.isFeatured} onChange={handleInputChange} />
          Featured
        </label>
        <label>
          <input type="checkbox" name="isInternational" checked={newProject.isInternational} onChange={handleInputChange} />
          International Collaboration
        </label>
        <div className="buttons">
          <button onClick={handleAddOrUpdate}>{editingProject ? 'Update' : 'Add'} Project</button>
          {editingProject && (
            <button
              className="cancel-btn"
              onClick={() => {
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
              Cancel
            </button>
          )}
        </div>
      </div>

      <ul className="project-list">
        {projects.map((p) => (
          <li key={p._id}>
            <div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p><strong>Type:</strong> {p.projectType}</p>
              <p><strong>Timeline:</strong> {p.startDate} - {p.endDate} ({p.status})</p>
              <p><strong>PI:</strong> {p.principalInvestigator} | Role: {p.role}</p>
              <p><strong>Funding:</strong> {p.amount} {p.currency} ({p.fundingSource})</p>
              <p><strong>Collaborators:</strong> {p.collaborators.join(', ')}</p>
              <p><strong>Publications:</strong> {p.relatedPublications.join(', ')}</p>
              <p><strong>Achievements:</strong> {p.achievements.join(', ')}</p>
              <p><strong>Links:</strong> <a href={p.projectUrl} target="_blank" rel="noopener noreferrer">Project</a> | <a href={p.repositoryUrl} target="_blank" rel="noopener noreferrer">Repo</a> | <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">Demo</a></p>
              <p><strong>Keywords:</strong> {p.keywords.join(', ')}</p>
              <p><strong>Research Areas:</strong> {p.researchAreas.join(', ')}</p>
              <p><strong>Media:</strong> {p.images.join(', ')}, {p.documents.join(', ')}</p>
              {p.isInternational && <span className="tag">🌍 International</span>}
              {p.isFeatured && <span className="tag">⭐ Featured</span>}
            </div>
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

export default Projects;
