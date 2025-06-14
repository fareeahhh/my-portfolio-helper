import "./Publications.css";
import {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from "../services/api";
import { useEffect, useState } from "react";

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    abstract: "",
    authors: "",
    journal: "",
    volume: "",
    issue: "",
    pages: "",
    publisher: "",
    publicationDate: "",
    doi: "",
    url: "",
    type: "journal",
    keywords: "",
    isPublic: true,
    isFeatured: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadPublications = async () => {
    try {
      const res = await getPublications();
      setPublications(res.data);
    } catch (err) {
      console.error("Error loading publications", err);
    }
  };

  useEffect(() => {
    loadPublications();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const payload = {
      ...form,
      authors: form.authors.split(",").map((a) => a.trim()),
      keywords: form.keywords.split(",").map((k) => k.trim()),
    };

    try {
      if (editingId) {
        await updatePublication(editingId, payload);
        setMessage("Publication updated successfully.");
      } else {
        await createPublication(payload);
        setMessage("Publication added successfully.");
      }

      setForm({
        title: "",
        abstract: "",
        authors: "",
        journal: "",
        volume: "",
        issue: "",
        pages: "",
        publisher: "",
        publicationDate: "",
        doi: "",
        url: "",
        type: "journal",
        keywords: "",
        isPublic: true,
        isFeatured: false,
      });

      setEditingId(null);
      loadPublications();
    } catch (err) {
      setError("Failed to save publication. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pub) => {
    setForm({
      ...pub,
      authors: pub.authors?.join(", ") || "",
      keywords: pub.keywords?.join(", ") || "",
      publicationDate: pub.publicationDate?.substring(0, 10) || "",
    });
    setEditingId(pub._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this publication?")) {
      await deletePublication(id);
      loadPublications();
    }
  };

  return (
    <div className="publications-container">
      <h2>Publications</h2>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form className="publication-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="abstract"
          placeholder="Abstract"
          value={form.abstract}
          onChange={handleChange}
        />
        <input
          name="authors"
          placeholder="Authors (comma separated)"
          value={form.authors}
          onChange={handleChange}
        />
        <input
          name="journal"
          placeholder="Journal"
          value={form.journal}
          onChange={handleChange}
        />
        <input
          name="volume"
          placeholder="Volume"
          value={form.volume}
          onChange={handleChange}
        />
        <input
          name="issue"
          placeholder="Issue"
          value={form.issue}
          onChange={handleChange}
        />
        <input
          name="pages"
          placeholder="Pages"
          value={form.pages}
          onChange={handleChange}
        />
        <input
          name="publisher"
          placeholder="Publisher"
          value={form.publisher}
          onChange={handleChange}
        />
        <input
          type="date"
          name="publicationDate"
          value={form.publicationDate}
          onChange={handleChange}
        />
        <input
          name="doi"
          placeholder="DOI"
          value={form.doi}
          onChange={handleChange}
        />
        <input
          name="url"
          placeholder="URL"
          value={form.url}
          onChange={handleChange}
        />
        <input
          name="keywords"
          placeholder="Keywords (comma separated)"
          value={form.keywords}
          onChange={handleChange}
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="journal">Journal</option>
          <option value="conference">Conference</option>
          <option value="book">Book</option>
          <option value="thesis">Thesis</option>
          <option value="report">Report</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="isPublic"
            checked={form.isPublic}
            onChange={handleChange}
          />
          Public
        </label>
        <label>
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          Featured
        </label>
        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingId
            ? "Update Publication"
            : "Add Publication"}
        </button>
      </form>

      <ul className="publication-list">
        {publications.map((pub) => (
          <li key={pub._id} className="publication-item">
            <h4>{pub.title}</h4>
            <p>{pub.abstract}</p>
            <p>
              <strong>Authors:</strong> {pub.authors?.join(", ")}
            </p>
            <p>
              <strong>Journal:</strong> {pub.journal}
            </p>
            <p>
              <strong>Date:</strong> {pub.publicationDate?.substring(0, 10)}
            </p>
            <p>
              <strong>DOI:</strong> {pub.doi}
            </p>
            <a href={pub.url} target="_blank" rel="noreferrer">
              Link
            </a>
            <div className="publication-actions">
              <button onClick={() => handleEdit(pub)}>Edit</button>
              <button onClick={() => handleDelete(pub._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
