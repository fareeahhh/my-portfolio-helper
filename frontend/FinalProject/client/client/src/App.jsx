import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Publications from './components/Dashboard/Publications';
import Login from './pages/Login';
import Register from './pages/Register';



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
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>

        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
