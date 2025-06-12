import { useEffect, useState } from 'react';
import './Blog.css';

function Blog() {
  const [blogs, setBlogs] = useState([]);

  const sampleBlogs = [
    {
      _id: 'b1',
      title: 'AI in Disaster Response',
      excerpt: 'Exploring how artificial intelligence enhances emergency preparedness...',
      content: 'Full blog content in markdown or HTML here...',
      readingTime: '4 min',
      status: 'published',
      publishDate: '2025-05-25',
      categories: ['AI', 'RescueTech'],
      tags: ['Deep Learning', 'Rescue', 'AI Ethics'],
      topics: ['Disaster Management'],
      viewCount: 123,
      likeCount: 15,
      comments: [
        { author: 'Jane', text: 'Very insightful!' },
        { author: 'Ali', text: 'Looking forward to more.' }
      ],
      slug: 'ai-disaster-response',
      metaDescription: 'Using AI in emergency and post-disaster situations',
      featuredImage: 'https://via.placeholder.com/600x300',
      socialShares: {
        twitter: 10,
        linkedin: 5
      },
      externalLinks: ['https://arxiv.org/abs/1234.5678'],
      isPublic: true,
      isFeatured: true,
      allowComments: true
    },
    {
      _id: 'b2',
      title: 'Ethics in Academic AI Research',
      excerpt: 'A personal take on responsible AI development in universities...',
      content: 'Ethical concerns must guide AI adoption...',
      readingTime: '3 min',
      status: 'draft',
      publishDate: null,
      categories: ['Ethics'],
      tags: ['AI Ethics', 'Research'],
      topics: ['Policy'],
      viewCount: 54,
      likeCount: 8,
      comments: [],
      slug: 'ethics-academic-ai',
      metaDescription: 'Discussing ethics in university-level AI development',
      featuredImage: 'https://via.placeholder.com/600x300?text=Draft+Post',
      socialShares: {},
      externalLinks: [],
      isPublic: false,
      isFeatured: false,
      allowComments: true
    }
  ];

  useEffect(() => {
    // Replace this with fetch logic later
    setBlogs(sampleBlogs);
  }, []);

  return (
    <div className="blog-container">
      <h2>Academic Blog</h2>
      {blogs
        .filter(blog => blog.isPublic && blog.status === 'published')
        .map(blog => (
          <div key={blog._id} className="blog-post">
            <img src={blog.featuredImage} alt={blog.title} />
            <div className="blog-meta">
              <h3>{blog.title}</h3>
              <p className="excerpt">{blog.excerpt}</p>
              <div className="blog-info">
                <span>{blog.readingTime} • {new Date(blog.publishDate).toDateString()}</span>
                <span className="tags">{blog.tags.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Blog;
