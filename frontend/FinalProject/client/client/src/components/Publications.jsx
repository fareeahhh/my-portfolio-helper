import { useState, useEffect } from 'react';
import API from '../../services/api';

function Publications() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    API.get('/publications')
      .then(res => setPublications(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Publications</h2>
      <ul>
        {publications.map(pub => (
          <li key={pub._id}>{pub.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Publications;
