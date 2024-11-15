// src/pages/Impact.js

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const temperatureData = [
  { year: 2020, statusQuo: 1.0, userImpact: 0.98 },
  { year: 2030, statusQuo: 1.5, userImpact: 1.3 },
  { year: 2040, statusQuo: 2.0, userImpact: 1.6 },
  { year: 2050, statusQuo: 2.5, userImpact: 1.9 },
  { year: 2060, statusQuo: 3.0, userImpact: 2.1 },
  { year: 2070, statusQuo: 3.5, userImpact: 2.3 },
  { year: 2080, statusQuo: 4.0, userImpact: 2.5 },
  { year: 2090, statusQuo: 4.5, userImpact: 2.7 },
  { year: 2100, statusQuo: 5.0, userImpact: 2.9 },
];

function Impact() {
  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-center">Impact</h1>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Mean Temperature Increase (°C)</h2>
        <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
              <Legend />
              <Line type="monotone" dataKey="statusQuo" stroke="#A4C465" name="Status Quo" />
              <Line type="monotone" dataKey="userImpact" stroke="#F08080" name="Your Impact" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Repeat similar sections for Sea Level Rise and CO2 Emissions */}
    </div>
  );
}

export default Impact;
