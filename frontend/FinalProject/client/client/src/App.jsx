import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Publications from './components/Dashboard/Publications';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './components/Dashboard/Projects';


// Import Dashboard sections later

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/dashboard/publications" element={<Publications />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

    </Router>
  );
}

export default App;
