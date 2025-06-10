import { useState } from 'react';
import './Grants.css';

function Grants() {
  const [grants, setGrants] = useState([
  {
    _id: 'g1',
    title: 'AI for Disaster Forecasting',
    grantNumber: 'DF-2025-001',
    amount: 150000,
    currency: 'USD',
    fundingAgency: 'National Science Foundation',
    programName: 'AI for Climate',
    contactPerson: 'Dr. Emily Watson',
    applicationDate: '2025-01-15',
    awardDate: '2025-03-10',
    startDate: '2025-04-01',
    endDate: '2026-03-31',
    status: 'awarded',
    principalInvestigator: 'Dr. Ahmed Khan',
    coInvestigators: ['Dr. Sara Malik', 'Dr. Iqbal Zaman'],
    abstract: 'This grant supports research into AI-based early warning systems for natural disasters.',
    objectives: ['Develop predictive models', 'Integrate satellite data', 'Deploy in real-time systems'],
    methodology: 'Using deep learning on historical satellite and sensor data to predict disaster risks.',
    proposalUrl: 'https://example.com/proposal.pdf',
    reports: ['https://example.com/report1.pdf'],
    documentation: ['https://example.com/docs.html'],
    publications: ['Forecasting with AI 2025'],
    achievements: ['Model deployed in pilot areas', '99% accuracy achieved'],
    isFeatured: true,
    isPublic: true
  }
]);

  const [newGrant, setNewGrant] = useState({
    title: '',
    grantNumber: '',
    amount: '',
    currency: 'USD',
    fundingAgency: '',
    programName: '',
    contactPerson: '',
    applicationDate: '',
    awardDate: '',
    startDate: '',
    endDate: '',
    status: 'pending',
    principalInvestigator: '',
    coInvestigators: '',
    abstract: '',
    objectives: '',
    methodology: '',
    proposalUrl: '',
    reports: '',
    documentation: '',
    publications: '',
    achievements: '',
    isFeatured: false,
    isPublic: true
  });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGrant({
      ...newGrant,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddGrant = () => {
    if (!newGrant.title || !newGrant.amount || !newGrant.fundingAgency) {
      setFeedback('Title, Amount, and Funding Agency are required.');
      return;
    }
    const grantData = {
      ...newGrant,
      _id: Date.now().toString(),
      amount: parseFloat(newGrant.amount),
      coInvestigators: newGrant.coInvestigators.split(',').map(s => s.trim()),
      objectives: newGrant.objectives.split(',').map(s => s.trim()),
      reports: newGrant.reports.split(',').map(s => s.trim()),
      documentation: newGrant.documentation.split(',').map(s => s.trim()),
      publications: newGrant.publications.split(',').map(s => s.trim()),
      achievements: newGrant.achievements.split(',').map(s => s.trim())
    };
    setGrants([...grants, grantData]);
    setFeedback('Grant added successfully!');
    setNewGrant({
      title: '', grantNumber: '', amount: '', currency: 'USD', fundingAgency: '',
      programName: '', contactPerson: '', applicationDate: '', awardDate: '',
      startDate: '', endDate: '', status: 'pending', principalInvestigator: '',
      coInvestigators: '', abstract: '', objectives: '', methodology: '',
      proposalUrl: '', reports: '', documentation: '', publications: '', achievements: '',
      isFeatured: false, isPublic: true
    });
  };

  return (
    <div className="grants-container">
      <h2>Grants</h2>
      {feedback && <div className="feedback">{feedback}</div>}
      <div className="grant-form">
        <input name="title" placeholder="Title" value={newGrant.title} onChange={handleChange} />
        <input name="grantNumber" placeholder="Grant Number" value={newGrant.grantNumber} onChange={handleChange} />
        <input name="amount" type="number" placeholder="Amount" value={newGrant.amount} onChange={handleChange} />
        <input name="currency" placeholder="Currency" value={newGrant.currency} onChange={handleChange} />
        <input name="fundingAgency" placeholder="Funding Agency" value={newGrant.fundingAgency} onChange={handleChange} />
        <input name="programName" placeholder="Program Name" value={newGrant.programName} onChange={handleChange} />
        <input name="contactPerson" placeholder="Contact Person" value={newGrant.contactPerson} onChange={handleChange} />
        <input name="applicationDate" type="date" value={newGrant.applicationDate} onChange={handleChange} />
        <input name="awardDate" type="date" value={newGrant.awardDate} onChange={handleChange} />
        <input name="startDate" type="date" value={newGrant.startDate} onChange={handleChange} />
        <input name="endDate" type="date" value={newGrant.endDate} onChange={handleChange} />
        <select name="status" value={newGrant.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="awarded">Awarded</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
        <input name="principalInvestigator" placeholder="Principal Investigator" value={newGrant.principalInvestigator} onChange={handleChange} />
        <input name="coInvestigators" placeholder="Co-Investigators (comma-separated)" value={newGrant.coInvestigators} onChange={handleChange} />
        <textarea name="abstract" placeholder="Abstract" value={newGrant.abstract} onChange={handleChange} />
        <textarea name="objectives" placeholder="Objectives (comma-separated)" value={newGrant.objectives} onChange={handleChange} />
        <textarea name="methodology" placeholder="Methodology" value={newGrant.methodology} onChange={handleChange} />
        <input name="proposalUrl" placeholder="Proposal URL" value={newGrant.proposalUrl} onChange={handleChange} />
        <input name="reports" placeholder="Reports (comma-separated URLs)" value={newGrant.reports} onChange={handleChange} />
        <input name="documentation" placeholder="Documentation URLs (comma-separated)" value={newGrant.documentation} onChange={handleChange} />
        <input name="publications" placeholder="Publications (comma-separated)" value={newGrant.publications} onChange={handleChange} />
        <input name="achievements" placeholder="Achievements (comma-separated)" value={newGrant.achievements} onChange={handleChange} />
        <label><input type="checkbox" name="isPublic" checked={newGrant.isPublic} onChange={handleChange} /> Public</label>
        <label><input type="checkbox" name="isFeatured" checked={newGrant.isFeatured} onChange={handleChange} /> Featured</label>
        <div className="buttons">
          <button onClick={handleAddGrant}>Add Grant</button>
        </div>
      </div>

      <ul className="grant-list">
        {grants.map(g => (
          <li key={g._id}>
            <h3>{g.title}</h3>
            <p><strong>Amount:</strong> {g.currency} {g.amount.toLocaleString()}</p>
            <p><strong>Status:</strong> <span className={`badge ${g.status}`}>{g.status}</span></p>
            <p><strong>Agency:</strong> {g.fundingAgency}</p>
            <p><strong>PI:</strong> {g.principalInvestigator}</p>
            <p><strong>Proposal:</strong> <a href={g.proposalUrl} target="_blank">View</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Grants;
