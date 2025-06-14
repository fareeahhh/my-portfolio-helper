import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <Link to="/" className="brand-link">
              <span className="brand-text">PH.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-desktop">
            <Link to="/" className="nav-link">
              <span className="nav-link-text">Home</span>
            </Link>

            {/* Portfolio Dropdown */}
            <div
              className="dropdown"
              onMouseEnter={() => setPortfolioOpen(true)}
              onMouseLeave={() => setPortfolioOpen(false)}
            >
              <span className="dropdown-title">
                Portfolio
                <span className={`dropdown-arrow ${portfolioOpen ? 'active' : ''}`}>▾</span>
              </span>
              <div className={`dropdown-menu ${portfolioOpen ? 'show' : ''}`}>
                <Link to="/publications" className="dropdown-link">Publications</Link>
                <Link to="/projects" className="dropdown-link">Projects</Link>
              </div>
            </div>

            {/* Academics Dropdown */}
            <div
              className="dropdown"
              onMouseEnter={() => setAcademicsOpen(true)}
              onMouseLeave={() => setAcademicsOpen(false)}
            >
              <span className="dropdown-title">
                Academics
                <span className={`dropdown-arrow ${academicsOpen ? 'active' : ''}`}>▾</span>
              </span>
              <div className={`dropdown-menu ${academicsOpen ? 'show' : ''}`}>
                <Link to="/teaching" className="dropdown-link">Teachings</Link>
                <Link to="/presentations" className="dropdown-link">Presentations</Link>
              </div>
            </div>

            {/* Media Dropdown */}
            <div
              className="dropdown"
              onMouseEnter={() => setMediaOpen(true)}
              onMouseLeave={() => setMediaOpen(false)}
            >
              <span className="dropdown-title">
                Media
                <span className={`dropdown-arrow ${mediaOpen ? 'active' : ''}`}>▾</span>
              </span>
              <div className={`dropdown-menu ${mediaOpen ? 'show' : ''}`}>
                <Link to="/media" className="dropdown-link">Media Coverage</Link>
                <Link to="/gallary" className="dropdown-link">Photo Gallery</Link>
                <Link to="/blog" className="dropdown-link">Blogs</Link>
              </div>
            </div>

            <Link to="/analyticsdashboard" className="nav-link">
              <span className="nav-link-text">Analytics</span>
            </Link>
            <Link to="/grants" className="nav-link">
              <span className="nav-link-text">Grants</span>
            </Link>
            <Link to="/contactpage" className="nav-link">
              <span className="nav-link-text">Contact</span>
            </Link>
            <Link to="/login" className="login-button">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/publications" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Publications</Link>
            <Link to="/projects" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
            <Link to="/teaching" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Teachings</Link>
            <Link to="/presentations" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Presentations</Link>
            <Link to="/media" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Media Coverage</Link>
            <Link to="/gallary" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Photo Gallery</Link>
            <Link to="/blog" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
            <Link to="/analyticsdashboard" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Analytics</Link>
            <Link to="/grants" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Grants</Link>
            <Link to="/contactpage" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link to="/login" className="mobile-login-button" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content overlap */}
      <div className="navbar-spacer"></div>
    </>
  );
}

export default Navbar;