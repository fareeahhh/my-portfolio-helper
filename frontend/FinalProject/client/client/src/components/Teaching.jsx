
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
      setFeedbackMsg('Course updated!');
      setEditing(null);
    } else {
      setCourses([...courses, courseData]);
      setFeedbackMsg('Course added!');
    }

    setNewCourse({
      courseTitle: '', courseCode: '', semester: '', year: '', level: 'undergraduate', credits: '', enrollment: '',
      university: '', department: '', syllabus: '', slides: '', assignments: '', studentRatings: '', feedback: '',
      description: '', learningObjectives: '', topics: '', materials: '', isPublic: true, showRatings: false
    });
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
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c._id !== id));
    setFeedbackMsg('Course deleted.');
  };

  return (
    <div className="teaching-container">
      <h2>Teaching Portfolio</h2>
      {feedbackMsg && <div className="feedback">{feedbackMsg}</div>}

      <div className="teaching-form">
        <input name="courseTitle" placeholder="Course Title" value={newCourse.courseTitle} onChange={handleInput} />
        <input name="courseCode" placeholder="Course Code" value={newCourse.courseCode} onChange={handleInput} />
        <input name="semester" placeholder="Semester" value={newCourse.semester} onChange={handleInput} />
        <input name="year" placeholder="Year" value={newCourse.year} onChange={handleInput} />
        <input name="level" placeholder="Level (undergraduate/graduate)" value={newCourse.level} onChange={handleInput} />
        <input name="credits" placeholder="Credits" value={newCourse.credits} onChange={handleInput} />
        <input name="enrollment" placeholder="Enrollment" value={newCourse.enrollment} onChange={handleInput} />
        <input name="university" placeholder="University" value={newCourse.university} onChange={handleInput} />
        <input name="department" placeholder="Department" value={newCourse.department} onChange={handleInput} />
        <input name="syllabus" placeholder="Syllabus URL" value={newCourse.syllabus} onChange={handleInput} />
        <input name="slides" placeholder="Slides (comma-separated URLs)" value={newCourse.slides} onChange={handleInput} />
        <input name="assignments" placeholder="Assignments (comma-separated URLs)" value={newCourse.assignments} onChange={handleInput} />
        <input name="studentRatings" placeholder="Student Ratings (e.g. 4.5)" value={newCourse.studentRatings} onChange={handleInput} />
        <textarea name="feedback" placeholder="Feedback (semicolon-separated)" value={newCourse.feedback} onChange={handleInput} />
        <textarea name="description" placeholder="Course Description" value={newCourse.description} onChange={handleInput} />
        <input name="learningObjectives" placeholder="Learning Objectives (comma-separated)" value={newCourse.learningObjectives} onChange={handleInput} />
        <input name="topics" placeholder="Topics Covered (comma-separated)" value={newCourse.topics} onChange={handleInput} />
        <input name="materials" placeholder="Materials (type|title|url, ...)" value={newCourse.materials} onChange={handleInput} />
        <label>
          <input type="checkbox" name="isPublic" checked={newCourse.isPublic} onChange={handleInput} /> Public
        </label>
        <label>
          <input type="checkbox" name="showRatings" checked={newCourse.showRatings} onChange={handleInput} /> Show Ratings
        </label>
        <div className="buttons">
          <button onClick={handleAddOrUpdate}>{editing ? 'Update' : 'Add'} Course</button>
          {editing && <button className="cancel-btn" onClick={() => { setEditing(null); setNewCourse({ ...newCourse }); setFeedbackMsg(''); }}>Cancel</button>}
        </div>
      </div>

      <ul className="course-list">
        {courses.map((c) => (
          <li key={c._id}>
            <h3>{c.courseTitle} ({c.courseCode})</h3>
            <p><strong>{c.level.toUpperCase()}</strong> - {c.semester} {c.year} | {c.university}</p>
            <p>{c.description}</p>
            {c.showRatings && <p><strong>Rating:</strong> {c.studentRatings}</p>}
            <div>
              <button onClick={() => handleEdit(c)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(c._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teaching;
