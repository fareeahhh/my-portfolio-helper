import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Publications from './components/Publications';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './components/Projects';
import Teaching from './components/Teaching';
import Grants from './components/Grants';
import Media from './components/Media';
import Gallary from './components/Gallary';
import Blog from './components/Blog';
import ContactPage from './components/ContactPage';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Presentations from './components/Presentations';



// Import Dashboard sections later

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/presentations" element={<Presentations />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/media" element={<Media />} />
          <Route path="/gallary" element={<Gallary />} />
          <Route path="/analyticsdashboard" element={<AnalyticsDashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contactpage" element={<ContactPage />} />








          
        </Routes>

    </Router>
  );
}

export default App;
