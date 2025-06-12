import { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    website: '',
    subject: '',
    content: '',
    messageType: 'inquiry',
    file: null,
    captcha: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with backend call later
    console.log('Form Submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>

      {submitted ? (
        <div className="contact-success">
          <p>Thanks! Your message has been received.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <input type="text" name="affiliation" placeholder="Affiliation (optional)" onChange={handleChange} />
            <input type="url" name="website" placeholder="Website (optional)" onChange={handleChange} />
          </div>

          <div className="form-group">
            <select name="messageType" onChange={handleChange}>
              <option value="inquiry">General Inquiry</option>
              <option value="collaboration">Collaboration</option>
              <option value="media">Media Request</option>
            </select>
          </div>

          <div className="form-group">
            <input type="text" name="subject" placeholder="Subject" required onChange={handleChange} />
            <textarea name="content" placeholder="Your Message" rows="5" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Attachment (optional)</label>
            <input type="file" name="file" accept=".pdf,.doc,.jpg,.png" onChange={handleChange} />
          </div>

          <div className="form-group captcha">
            <input type="text" name="captcha" placeholder="What is 3 + 4?" required onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      )}
    </div>
  );
}

export default ContactPage;
