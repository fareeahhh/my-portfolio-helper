import "./Register.css";
import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    university: "",
    department: "",
    degree: "",
    enrollmentYear: "",
    graduationYear: "",
    bio: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...form,
      social: {
        linkedin: form.linkedin,
        twitter: form.twitter,
        github: form.github,
        facebook: form.facebook,
        instagram: form.instagram,
      },
    };

    try {
      await register(userData);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
          <option value="guest">Guest</option>
        </select>
        <input
          type="text"
          name="university"
          placeholder="University"
          value={form.university}
          onChange={handleChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={form.degree}
          onChange={handleChange}
        />
        <input
          type="number"
          name="enrollmentYear"
          placeholder="Enrollment Year"
          value={form.enrollmentYear}
          onChange={handleChange}
        />
        <input
          type="number"
          name="graduationYear"
          placeholder="Graduation Year"
          value={form.graduationYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          value={form.linkedin}
          onChange={handleChange}
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub"
          value={form.github}
          onChange={handleChange}
        />
        <input
          type="text"
          name="twitter"
          placeholder="Twitter"
          value={form.twitter}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facebook"
          placeholder="Facebook"
          value={form.facebook}
          onChange={handleChange}
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          value={form.instagram}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={form.bio}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
