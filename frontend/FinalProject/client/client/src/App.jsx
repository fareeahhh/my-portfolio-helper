import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Gallery from "./components/Gallary";
import Grants from "./components/Grants";
import Media from "./components/Media";
import Presentations from "./components/Presentations";
import Teaching from "./components/Teaching";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import ContactPage from "./components/ContactPage";
import UserProfilePage from "./components/UserProfilePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/grants" element={<Grants />} />
        <Route path="/media" element={<Media />} />
        <Route path="/presentations" element={<Presentations />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
