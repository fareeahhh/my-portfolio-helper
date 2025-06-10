import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Publications from './components/Publications';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './components/Projects';
import Teaching from './components/Teaching';
import Grants from './components/Grants';
import Presentations from './components/Presentations';



// Import Dashboard sections later

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/presentations" element={<Presentations />} />
          <Route path="/dashboard/grants" element={<Grants />} />


          
        </Routes>

    </Router>
  );
}

export default App;
