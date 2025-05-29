import { useState } from 'react';
import './Projects.css';
import API from '../../services/api';

function Projects() {
  // Hardcoded sample project data
  const [projects, setProjects] = useState([
    {
      _id: '1',
      title: 'AI Disaster Response',
      description: 'A project focused on using AI to improve disaster response efforts.',
      collaborators: ['Alice', 'Bob'],
      outcomes: 'Improved rescue efficiency',
      isInternational: true
    },
    {
      _id: '2',
      title: 'Data Privacy in IoT',
      description: 'Study of privacy challenges in Internet of Things devices.',
      collaborators: ['Charlie'],
      outcomes: 'Whitepaper published',
      isInternational: false
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    collaborators: '',
    outcomes: '',
    isInternational: false
  });
  const [editingProject, setEditingProject] = useState(null);
  const [feedback, setFeedback] = useState('');

  // Local CRUD functionality (no backend yet)
  const handleAddOrUpdate = () => {
    if (!newProject.title) {
      setFeedback('Project title is required.');
      return;
    }

    if (editingProject) {
      // Update
      setProjects(
        projects.map((p) =>
          p._id === editingProject._id
            ? {
                ...p,
                ...newProject,
                collaborators: newProject.collaborators.split(',').map((c) => c.trim())
              }
            : p
        )
      );
      setFeedback('Project updated!');
      setEditingProject(null);
    } else {
      // Add
      const newId = Date.now().toString(); // generate a random id
      setProjects([
        ...projects,
        {
          _id: newId,
          ...newProject,
          collaborators: newProject.collaborators.split(',').map((c) => c.trim())
        }
      ]);
      setFeedback('Project added!');
    }

    // Reset form
    setNewProject({ title: '', description: '', collaborators: '', outcomes: '', isInternational: false });
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      collaborators: project.collaborators.join(', '),
      outcomes: project.outcomes,
      isInternational: project.isInternational
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
        <input name="title" placeholder="Project Title" value={newProject.title} onChange={handleInputChange} />
        <textarea name="description" placeholder="Description" value={newProject.description} onChange={handleInputChange}></textarea>
        <input name="collaborators" placeholder="Collaborators (comma-separated)" value={newProject.collaborators} onChange={handleInputChange} />
        <textarea name="outcomes" placeholder="Outcomes" value={newProject.outcomes} onChange={handleInputChange}></textarea>
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
                setNewProject({ title: '', description: '', collaborators: '', outcomes: '', isInternational: false });
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
              <p><strong>Collaborators:</strong> {p.collaborators.join(', ')}</p>
              <p><strong>Outcomes:</strong> {p.outcomes}</p>
              {p.isInternational && <span className="tag">🌍 International</span>}
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
