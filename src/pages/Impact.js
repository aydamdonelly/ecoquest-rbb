// src/pages/Impact.js

import React from 'react';
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useSpring, animated } from 'react-spring';

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

const seaLevelData = [
  { year: 2020, statusQuo: 0.2, userImpact: 0.18 },
  { year: 2030, statusQuo: 0.4, userImpact: 0.35 },
  // ... additional data
];

const co2EmissionsData = [
  { year: 2020, statusQuo: 36, userImpact: 35 },
  { year: 2030, statusQuo: 40, userImpact: 38 },
  // ... additional data
];

function Impact() {
  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <animated.h1 style={animationProps} className="text-3xl font-bold mb-5 text-center">
        Impact
      </animated.h1>
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
              <Line type="monotone" dataKey="statusQuo" stroke="#F08080" name="Status Quo" />
              <Line type="monotone" dataKey="userImpact" stroke="#A4C465" name="Your Impact" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Sea Level Rise Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Sea Level Rise (meters)</h2>
        <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={seaLevelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
              <Legend />
              <Bar dataKey="statusQuo" fill="#F08080" name="Status Quo" />
              <Bar dataKey="userImpact" fill="#A4C465" name="Your Impact" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* CO2 Emissions Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">CO₂ Emissions (GtCO₂)</h2>
        <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={co2EmissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
              <Legend />
              <Line type="monotone" dataKey="statusQuo" stroke="#F08080" name="Status Quo" />
              <Line type="monotone" dataKey="userImpact" stroke="#A4C465" name="Your Impact" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Sustainability Tips */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Sustainability Tips</h2>
        <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
          <ul className="list-disc list-inside">
            <li>Consider reducing your carbon footprint by using public transport.</li>
            <li>Participate in community clean-up events.</li>
            <li>Reduce, Reuse, Recycle.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Impact;
