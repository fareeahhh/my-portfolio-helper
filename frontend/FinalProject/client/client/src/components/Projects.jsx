import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/api";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    projectType: "research",
    status: "ongoing",
    collaborators: "",
    principalInvestigator: "",
    role: "",
    amount: "",
    currency: "",
    fundingSource: "",
    projectUrl: "",
    repositoryUrl: "",
    demoUrl: "",
    isPublic: true,
    isFeatured: false,
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (err) {
      setMessage("❌ Failed to load projects.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        collaborators: form.collaborators.split(",").map((c) => c.trim()),
      };
      if (editingId) {
        await updateProject(editingId, payload);
        setMessage("✅ Project updated!");
      } else {
        await createProject(payload);
        setMessage("✅ Project created!");
      }
      resetForm();
      fetchProjects();
    } catch (err) {
      setMessage("❌ Could not save project.");
    }
  };

  const handleEdit = (project) => {
    setForm({
      ...project,
      collaborators: project.collaborators?.join(", ") || "",
    });
    setEditingId(project._id);
    setShowForm(true);
    setMessage("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setMessage("⚠️ Project deleted.");
      fetchProjects();
    } catch {
      setMessage("❌ Failed to delete project.");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      projectType: "research",
      status: "ongoing",
      collaborators: "",
      principalInvestigator: "",
      role: "",
      amount: "",
      currency: "",
      fundingSource: "",
      projectUrl: "",
      repositoryUrl: "",
      demoUrl: "",
      isPublic: true,
      isFeatured: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="projects-container">
      <h2>Projects</h2>
      {message && <div className="feedback">{message}</div>}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Project"}
      </button>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Project Type</label>
            <select
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
            >
              <option value="research">Research</option>
              <option value="commercial">Commercial</option>
              <option value="academic">Academic</option>
            </select>
          </div>

          <div>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          <div>
            <label>Principal Investigator</label>
            <input
              name="principalInvestigator"
              value={form.principalInvestigator}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Role</label>
            <input name="role" value={form.role} onChange={handleChange} />
          </div>
          <div>
            <label>Collaborators (comma separated)</label>
            <input
              name="collaborators"
              value={form.collaborators}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Currency</label>
            <input
              name="currency"
              value={form.currency}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Funding Source</label>
            <input
              name="fundingSource"
              value={form.fundingSource}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Project URL</label>
            <input
              type="url"
              name="projectUrl"
              value={form.projectUrl}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Repository URL</label>
            <input
              type="url"
              name="repositoryUrl"
              value={form.repositoryUrl}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Demo URL</label>
            <input
              type="url"
              name="demoUrl"
              value={form.demoUrl}
              onChange={handleChange}
            />
          </div>

          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            Featured
          </label>
          <label>
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
            />
            Public
          </label>

          <button type="submit">
            {editingId ? "Update" : "Create"} Project
          </button>
        </form>
      )}

      <div className="project-list">
        {projects.map((proj) => (
          <div className="project-card" key={proj._id}>
            <h3>{proj.title}</h3>
            <p>
              <strong>Status:</strong> {proj.status}
            </p>
            <p>
              <strong>Type:</strong> {proj.projectType}
            </p>
            <p>
              <strong>PI:</strong> {proj.principalInvestigator}
            </p>
            <p>
              <strong>Role:</strong> {proj.role}
            </p>
            <p>
              <strong>Collaborators:</strong> {proj.collaborators?.join(", ")}
            </p>
            <p>{proj.description}</p>
            {proj.projectUrl && (
              <p>
                <a href={proj.projectUrl} target="_blank" rel="noreferrer">
                  🔗 View Project
                </a>
              </p>
            )}
            <div className="card-actions">
              <button onClick={() => handleEdit(proj)}>✏️ Edit</button>
              <button onClick={() => handleDelete(proj._id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
