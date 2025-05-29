import { Link } from 'react-router-dom';
import './Navbar.css'; // Or Tailwind classes for modern style
import { useState } from 'react';

function Navbar() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1>My Portfolio Helper</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>

        {/* Portfolio Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setPortfolioOpen(true)}
          onMouseLeave={() => setPortfolioOpen(false)}
        >
          <span className="dropdown-title">Portfolio ▾</span>
          {portfolioOpen && (
            <div className="dropdown-menu">
              <Link to="/publications">Publications</Link>
              <Link to="/projects">Projects</Link>
              {/* Future: Add more portfolio links here */}
            </div>
          )}
        </div>

        {/* Media Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setMediaOpen(true)}
          onMouseLeave={() => setMediaOpen(false)}
        >
          <span className="dropdown-title">Media ▾</span>
          {mediaOpen && (
            <div className="dropdown-menu">
              <Link to="/dashboard/media">Media Coverage</Link>
              <Link to="/dashboard/gallery">Photo Gallery</Link>
              {/* Future: Add more media links here */}
            </div>
          )}
        </div>

        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
