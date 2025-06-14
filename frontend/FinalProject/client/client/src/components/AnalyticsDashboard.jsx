// import { getAnalytics } from "../services/api";
// import { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import "./AnalyticsDashboard.css";

// const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

// function AnalyticsDashboard() {
//   const [dailyViews, setDailyViews] = useState([]);
//   const [topSections, setTopSections] = useState([]);
//   const [visitorCountries, setVisitorCountries] = useState([]);
//   const [dateRange, setDateRange] = useState({ start: "", end: "" });

//   useEffect(() => {
//     // Replace with API fetch later
//     setDailyViews([
//       { date: "2025-06-01", views: 100 },
//       { date: "2025-06-02", views: 120 },
//       { date: "2025-06-03", views: 90 },
//       { date: "2025-06-04", views: 160 },
//       { date: "2025-06-05", views: 140 },
//     ]);

//     setTopSections([
//       { section: "Publications", views: 300 },
//       { section: "Projects", views: 250 },
//       { section: "Gallery", views: 180 },
//       { section: "Media", views: 150 },
//     ]);

//     setVisitorCountries([
//       { country: "Pakistan", count: 200 },
//       { country: "USA", count: 150 },
//       { country: "UK", count: 90 },
//       { country: "India", count: 80 },
//     ]);
//   }, []);

//   return (
//     <div className="analytics-container">
//       <div className="analytics-header">
//         <div className="header-icon">
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//             />
//           </svg>
//         </div>
//         <div className="header-content">
//           <h2>Portfolio Analytics</h2>
//           <p>Track and analyze your portfolio performance</p>
//         </div>
//       </div>

//       <div className="date-picker-card">
//         <h3>Date Range Filter</h3>
//         <div className="date-picker">
//           <div className="date-input-group">
//             <label>Start Date</label>
//             <input
//               type="date"
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, start: e.target.value })
//               }
//             />
//           </div>
//           <div className="date-input-group">
//             <label>End Date</label>
//             <input
//               type="date"
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, end: e.target.value })
//               }
//             />
//           </div>
//         </div>
//       </div>

//       <div className="chart-row">
//         <div className="chart-card">
//           <div className="chart-header">
//             <h3>Daily Views</h3>
//             <div className="chart-legend">
//               <div className="legend-item">
//                 <div
//                   className="legend-color"
//                   style={{ backgroundColor: "#6366f1" }}
//                 ></div>
//                 <span>Views Trend</span>
//               </div>
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={dailyViews}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//               <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
//               <YAxis stroke="#64748b" fontSize={12} />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "white",
//                   border: "1px solid #e2e8f0",
//                   borderRadius: "12px",
//                   boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="views"
//                 stroke="#6366f1"
//                 strokeWidth={3}
//                 dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
//                 activeDot={{ r: 6, stroke: "#6366f1", strokeWidth: 2 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-card">
//           <div className="chart-header">
//             <h3>Top Sections</h3>
//             <div className="chart-legend">
//               <div className="legend-item">
//                 <div
//                   className="legend-color"
//                   style={{ backgroundColor: "#10b981" }}
//                 ></div>
//                 <span>Section Views</span>
//               </div>
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={topSections}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//               <XAxis dataKey="section" stroke="#64748b" fontSize={12} />
//               <YAxis stroke="#64748b" fontSize={12} />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "white",
//                   border: "1px solid #e2e8f0",
//                   borderRadius: "12px",
//                   boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
//                 }}
//               />
//               <Bar dataKey="views" fill="#10b981" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-card visitor-countries-card">
//           <div className="chart-header">
//             <h3>Visitor Countries</h3>
//             <div className="chart-legend countries-legend">
//               {visitorCountries.map((country, index) => (
//                 <div key={country.country} className="legend-item">
//                   <div
//                     className="legend-color"
//                     style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                   ></div>
//                   <span>{country.country}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="pie-chart-container">
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={visitorCountries}
//                   dataKey="count"
//                   nameKey="country"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   innerRadius={40}
//                   paddingAngle={2}
//                   label={({ country, percent }) =>
//                     `${country}: ${(percent * 100).toFixed(0)}%`
//                   }
//                 >
//                   {visitorCountries.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "white",
//                     border: "1px solid #e2e8f0",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="country-stats">
//               {visitorCountries.map((country, index) => (
//                 <div key={country.country} className="country-stat-item">
//                   <div className="country-info">
//                     <div
//                       className="country-color"
//                       style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                     ></div>
//                     <span className="country-name">{country.country}</span>
//                   </div>
//                   <div className="country-count">
//                     <div className="count-number">{country.count}</div>
//                     <div className="count-label">visitors</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AnalyticsDashboard;

import React, { useEffect, useState } from "react";
import "./AnalyticsDashboard.css";
import { fetchAnalytics } from "../services/api";

export default function AnalyticsDashboard() {
  const [dailyViews, setDailyViews] = useState([]);
  const [topSections, setTopSections] = useState([]);
  const [visitorCountries, setVisitorCountries] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await getAnalyticsSummary();
        setData(data);
      } catch (err) {
        console.error("Error loading analytics summary", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="analytics-container">
      <h2>Analytics Dashboard</h2>

      <div className="analytics-section">
        <h3>Daily Views</h3>
        <ul>
          {dailyViews.map((item, index) => (
            <li key={index}>
              {item.date}: {item.views} views
            </li>
          ))}
        </ul>
      </div>

      <div className="analytics-section">
        <h3>Top Sections</h3>
        <ul>
          {topSections.map((section, index) => (
            <li key={index}>
              {section.section}: {section.views} views
            </li>
          ))}
        </ul>
      </div>

      <div className="analytics-section">
        <h3>Visitor Countries</h3>
        <ul>
          {visitorCountries.map((country, index) => (
            <li key={index}>
              {country.country}: {country.count} visitors
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
