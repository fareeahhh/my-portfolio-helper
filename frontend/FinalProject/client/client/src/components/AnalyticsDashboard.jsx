import { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './AnalyticsDashboard.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

function AnalyticsDashboard() {
  const [dailyViews, setDailyViews] = useState([]);
  const [topSections, setTopSections] = useState([]);
  const [visitorCountries, setVisitorCountries] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    // Replace with API fetch later
    setDailyViews([
      { date: '2025-06-01', views: 100 },
      { date: '2025-06-02', views: 120 },
      { date: '2025-06-03', views: 90 },
      { date: '2025-06-04', views: 160 },
      { date: '2025-06-05', views: 140 },
    ]);

    setTopSections([
      { section: 'Publications', views: 300 },
      { section: 'Projects', views: 250 },
      { section: 'Gallery', views: 180 },
      { section: 'Media', views: 150 },
    ]);

    setVisitorCountries([
      { country: 'Pakistan', count: 200 },
      { country: 'USA', count: 150 },
      { country: 'UK', count: 90 },
      { country: 'India', count: 80 },
    ]);
  }, []);

  return (
    <div className="analytics-container">
      <h2>Portfolio Analytics</h2>

      <div className="date-picker">
        <label>Start: <input type="date" onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} /></label>
        <label>End: <input type="date" onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} /></label>
      </div>

      <div className="chart-row">
        <div className="chart-card">
          <h3>Daily Views</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyViews}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Top Sections</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSections}>
              <XAxis dataKey="section" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Visitor Countries</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visitorCountries}
                dataKey="count"
                nameKey="country"
                cx="50%" cy="50%"
                outerRadius={100}
                label
              >
                {visitorCountries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
