import { Link } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';

function Navbar() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
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
            </div>
          )}
        </div>

        {/* Academics Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setAcademicsOpen(true)}
          onMouseLeave={() => setAcademicsOpen(false)}
        >
          <span className="dropdown-title">Academics ▾</span>
          {academicsOpen && (
            <div className="dropdown-menu">
              <Link to="/teaching">Teachings</Link>
              <Link to="/presentations">Presentations</Link>
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
              <Link to="/media">Media Coverage</Link>
              <Link to="/gallary">Photo Gallery</Link>
            </div>
          )}
        </div>

        <Link to="/grants">Grants</Link>


        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
