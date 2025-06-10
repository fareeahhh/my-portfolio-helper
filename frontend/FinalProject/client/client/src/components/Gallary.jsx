import { useEffect, useState } from 'react';
import './Gallary.css';

function Gallery() {
  const [gallery, setGallery] = useState([]);

  // Temporary hardcoded data for testing
  const sampleData = [
    {
      _id: '1',
      url: 'https://via.placeholder.com/300x200',
      title: 'Lab Setup',
      description: 'Setting up the experiment lab.',
      category: 'lab',
      captureDate: '2024-08-01',
      eventName: 'Lab Opening',
      location: 'COMSATS Lab 2',
      taggedPeople: ['Dr. A', 'Engr. B'],
      collaborators: ['Team AI'],
      dimensions: '300x200',
      format: 'jpg',
      uploadDate: '2024-08-02',
      fileName: 'lab1.jpg',
      fileSize: '250KB',
      isPublic: true,
      isFeatured: true
    },
    {
      _id: '2',
      url: 'https://via.placeholder.com/300x300',
      title: 'Conference Panel',
      description: 'Panel discussion on AI ethics.',
      category: 'conference',
      captureDate: '2024-07-15',
      eventName: 'AI Ethics Conf 2024',
      location: 'Islamabad Convention Center',
      taggedPeople: ['Prof. C'],
      collaborators: ['UNDP'],
      dimensions: '300x300',
      format: 'png',
      uploadDate: '2024-07-16',
      fileName: 'conf_panel.png',
      fileSize: '500KB',
      isPublic: true,
      isFeatured: false
    }
  ];

  // Simulating a fetch from database (replace with actual fetch call later)
  useEffect(() => {
    // Example placeholder for future fetch logic:
    // fetch('/api/gallery')
    //   .then(res => res.json())
    //   .then(data => setGallery(data));

    // Use hardcoded data for now
    setGallery(sampleData);
  }, []);

  const categories = ['all', 'lab', 'conference', 'teaching', 'awards'];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredGallery =
    selectedCategory === 'all'
      ? gallery
      : gallery.filter(img => img.category === selectedCategory);

  return (
    <div className="gallery-container">
      <h2>Photo Gallery</h2>
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {filteredGallery.map(img => (
          <div className="gallery-item" key={img._id}>
            <img src={img.url} alt={img.title} />
            <div className="caption">
              <h4>{img.title}</h4>
              <p>{img.description}</p>
              <small>{img.captureDate} | {img.eventName}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
