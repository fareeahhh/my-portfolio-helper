import { Link } from 'react-router-dom';
import './Navbar.css'; // Create this for styling

function Navbar() {
  return (
      <nav className="navbar">
        <h1>My Portfolio Helper</h1>
        <div>
          <Link to="/">Profile</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/dashboard/publications">Publications</Link>
          <Link to="/dashboard/projects">Projects</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

  );
}

export default Navbar;
