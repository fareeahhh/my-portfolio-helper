import { useState } from 'react';
import './Teaching.css';

function Teaching() {
  const [courses, setCourses] = useState([
    {
      _id: '1',
      courseTitle: 'Introduction to AI',
      courseCode: 'AI101',
      semester: 'Fall',
      year: 2024,
      level: 'undergraduate',
      credits: 3,
      enrollment: 50,
      university: 'COMSATS University',
      department: 'Computer Science',
      syllabus: 'https://example.com/syllabus.pdf',
      slides: ['https://example.com/slide1.pdf'],
      assignments: ['https://example.com/assignment1.pdf'],
      studentRatings: 4.5,
      feedback: ['Great course!', 'Needs more hands-on examples.'],
      description: 'A foundational course on artificial intelligence covering search, logic, and basic ML.',
      learningObjectives: ['Understand AI fundamentals', 'Apply search algorithms'],
      topics: ['Search', 'Logic', 'ML basics'],
      materials: [
        { type: 'syllabus', title: 'Syllabus', url: 'https://example.com/syllabus.pdf' },
        { type: 'slide', title: 'Lecture 1', url: 'https://example.com/slide1.pdf' }
      ],
      isPublic: true,
      showRatings: true
    }
  ]);

  const [newCourse, setNewCourse] = useState({
    courseTitle: '',
    courseCode: '',
    semester: '',
    year: '',
    level: 'undergraduate',
    credits: '',
    enrollment: '',
    university: '',
    department: '',
    syllabus: '',
    slides: '',
    assignments: '',
    studentRatings: '',
    feedback: '',
    description: '',
    learningObjectives: '',
    topics: '',
    materials: '',
    isPublic: true,
    showRatings: false
  });

  const [editing, setEditing] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddOrUpdate = () => {
    if (!newCourse.courseTitle || !newCourse.courseCode) {
      setFeedbackMsg('Course title and code are required.');
      return;
    }

    const courseData = {
      _id: editing ? editing._id : Date.now().toString(),
      ...newCourse,
      year: parseInt(newCourse.year),
      credits: parseInt(newCourse.credits),
      enrollment: parseInt(newCourse.enrollment),
      slides: newCourse.slides.split(',').map((s) => s.trim()),
      assignments: newCourse.assignments.split(',').map((a) => a.trim()),
      feedback: newCourse.feedback.split(';').map((f) => f.trim()),
      learningObjectives: newCourse.learningObjectives.split(',').map((o) => o.trim()),
      topics: newCourse.topics.split(',').map((t) => t.trim()),
      materials: newCourse.materials.split(',').map((m) => {
        const [type, title, url] = m.split('|').map((x) => x.trim());
        return { type, title, url };
      })
    };

    if (editing) {
      setCourses(courses.map((c) => (c._id === editing._id ? courseData : c)));
      setFeedbackMsg('Course updated successfully!');
      setEditing(null);
    } else {
      setCourses([...courses, courseData]);
      setFeedbackMsg('Course added successfully!');
    }

    setNewCourse({
      courseTitle: '', courseCode: '', semester: '', year: '', level: 'undergraduate', credits: '', enrollment: '',
      university: '', department: '', syllabus: '', slides: '', assignments: '', studentRatings: '', feedback: '',
      description: '', learningObjectives: '', topics: '', materials: '', isPublic: true, showRatings: false
    });
    setShowForm(false);
  };

  const handleEdit = (course) => {
    setEditing(course);
    setNewCourse({
      ...course,
      slides: course.slides.join(', '),
      assignments: course.assignments.join(', '),
      feedback: course.feedback.join('; '),
      learningObjectives: course.learningObjectives.join(', '),
      topics: course.topics.join(', '),
      materials: course.materials.map((m) => `${m.type}|${m.title}|${m.url}`).join(', ')
    });
    setFeedbackMsg('');
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c._id !== id));
    setFeedbackMsg('Course deleted successfully.');
  };

  const handleCancel = () => {
    setEditing(null);
    setNewCourse({
      courseTitle: '', courseCode: '', semester: '', year: '', level: 'undergraduate', credits: '', enrollment: '',
      university: '', department: '', syllabus: '', slides: '', assignments: '', studentRatings: '', feedback: '',
      description: '', learningObjectives: '', topics: '', materials: '', isPublic: true, showRatings: false
    });
    setFeedbackMsg('');
    setShowForm(false);
  };

  return (
    <div className="teaching-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>My Teaching Portfolio</h1>
          <p>Showcasing my courses, educational materials, and teaching contributions</p>
          <button 
            className="add-course-btn" 
            onClick={() => setShowForm(!showForm)}
          >
            + Add New Course
          </button>
        </div>
      </div>

      <div className="teaching-container">
        {feedbackMsg && (
          <div className="feedback-message">
            <span className="feedback-icon">✓</span>
            {feedbackMsg}
          </div>
        )}

        {showForm && (
          <div className="form-card">
            <div className="form-header">
              <h3>{editing ? 'Edit Course' : 'Add New Course'}</h3>
              <button className="close-btn" onClick={handleCancel}>×</button>
            </div>
            
            <div className="form-section">
              <h4>Basic Information</h4>
              <div className="form-row">
                <input 
                  name="courseTitle" 
                  placeholder="Course Title *" 
                  value={newCourse.courseTitle} 
                  onChange={handleInput} 
                />
                <input 
                  name="courseCode" 
                  placeholder="Course Code *" 
                  value={newCourse.courseCode} 
                  onChange={handleInput} 
                />
              </div>
              
              <div className="form-row">
                <select name="semester" value={newCourse.semester} onChange={handleInput}>
                  <option value="">Select Semester</option>
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                </select>
                <input 
                  name="year" 
                  placeholder="Year" 
                  type="number"
                  value={newCourse.year} 
                  onChange={handleInput} 
                />
              </div>

              <div className="form-row">
                <select name="level" value={newCourse.level} onChange={handleInput}>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                </select>
                <input 
                  name="credits" 
                  placeholder="Credits" 
                  type="number"
                  value={newCourse.credits} 
                  onChange={handleInput} 
                />
              </div>

              <div className="form-row">
                <input 
                  name="university" 
                  placeholder="University" 
                  value={newCourse.university} 
                  onChange={handleInput} 
                />
                <input 
                  name="department" 
                  placeholder="Department" 
                  value={newCourse.department} 
                  onChange={handleInput} 
                />
              </div>

              <textarea 
                name="description" 
                placeholder="Course Description" 
                value={newCourse.description} 
                onChange={handleInput}
                rows="3"
              />
            </div>

            <div className="form-section">
              <h4>Course Details</h4>
              <input 
                name="enrollment" 
                placeholder="Enrollment Count" 
                type="number"
                value={newCourse.enrollment} 
                onChange={handleInput} 
              />
              <input 
                name="learningObjectives" 
                placeholder="Learning Objectives (comma-separated)" 
                value={newCourse.learningObjectives} 
                onChange={handleInput} 
              />
              <input 
                name="topics" 
                placeholder="Topics Covered (comma-separated)" 
                value={newCourse.topics} 
                onChange={handleInput} 
              />
            </div>

            <div className="form-section">
              <h4>Materials & Resources</h4>
              <input 
                name="syllabus" 
                placeholder="Syllabus URL" 
                value={newCourse.syllabus} 
                onChange={handleInput} 
              />
              <input 
                name="slides" 
                placeholder="Slides URLs (comma-separated)" 
                value={newCourse.slides} 
                onChange={handleInput} 
              />
              <input 
                name="assignments" 
                placeholder="Assignment URLs (comma-separated)" 
                value={newCourse.assignments} 
                onChange={handleInput} 
              />
              <input 
                name="materials" 
                placeholder="Additional Materials (type|title|url, comma-separated)" 
                value={newCourse.materials} 
                onChange={handleInput} 
              />
            </div>

            <div className="form-section">
              <h4>Feedback & Ratings</h4>
              <input 
                name="studentRatings" 
                placeholder="Student Ratings (e.g., 4.5)" 
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={newCourse.studentRatings} 
                onChange={handleInput} 
              />
              <textarea 
                name="feedback" 
                placeholder="Student Feedback (semicolon-separated)" 
                value={newCourse.feedback} 
                onChange={handleInput}
                rows="3"
              />
            </div>

            <div className="form-section">
              <h4>Visibility Settings</h4>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="isPublic" 
                    checked={newCourse.isPublic} 
                    onChange={handleInput} 
                  />
                  <span className="checkmark"></span>
                  Make course public
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="showRatings" 
                    checked={newCourse.showRatings} 
                    onChange={handleInput} 
                  />
                  <span className="checkmark"></span>
                  Show student ratings
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button className="submit-btn" onClick={handleAddOrUpdate}>
                {editing ? 'Update Course' : 'Add Course'}
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <div className="course-header">
                <div className="course-title-section">
                  <h3>{course.courseTitle}</h3>
                  <span className="course-code">{course.courseCode}</span>
                </div>
                <div className="course-badges">
                  <span className={`level-badge ${course.level}`}>
                    {course.level.toUpperCase()}
                  </span>
                  {course.showRatings && (
                    <span className="rating-badge">
                      ⭐ {course.studentRatings}
                    </span>
                  )}
                </div>
              </div>

              <div className="course-meta">
                <div className="meta-item">
                  <strong>{course.semester} {course.year}</strong> • {course.university}
                </div>
                <div className="meta-item">
                  {course.department} • {course.credits} Credits • {course.enrollment} Students
                </div>
              </div>

              <div className="course-description">
                <p>{course.description}</p>
              </div>

              {course.topics && course.topics.length > 0 && (
                <div className="topics-section">
                  <h5>Topics Covered:</h5>
                  <div className="topics-tags">
                    {course.topics.map((topic, index) => (
                      <span key={index} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
              )}

              {course.learningObjectives && course.learningObjectives.length > 0 && (
                <div className="objectives-section">
                  <h5>Learning Objectives:</h5>
                  <ul>
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="course-actions">
                <button className="edit-btn" onClick={() => handleEdit(course)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(course._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No courses added yet</h3>
            <p>Start building your teaching portfolio by adding your first course</p>
            <button className="add-first-course-btn" onClick={() => setShowForm(true)}>
              Add Your First Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teaching;