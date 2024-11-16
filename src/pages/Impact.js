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
  { year: 2025, statusQuo: 1.2, userImpact: 1.1 },
  { year: 2030, statusQuo: 1.5, userImpact: 1.3 },
  { year: 2035, statusQuo: 1.7, userImpact: 1.4 },
  { year: 2040, statusQuo: 2.0, userImpact: 1.6 },
  { year: 2045, statusQuo: 2.2, userImpact: 1.7 },
  { year: 2050, statusQuo: 2.5, userImpact: 1.9 },
  { year: 2055, statusQuo: 2.7, userImpact: 2.0 },
  { year: 2060, statusQuo: 3.0, userImpact: 2.1 },
  { year: 2065, statusQuo: 3.2, userImpact: 2.2 },
  { year: 2070, statusQuo: 3.5, userImpact: 2.3 },
  { year: 2075, statusQuo: 3.7, userImpact: 2.4 },
  { year: 2080, statusQuo: 4.0, userImpact: 2.5 },
  { year: 2085, statusQuo: 4.2, userImpact: 2.6 },
  { year: 2090, statusQuo: 4.5, userImpact: 2.7 },
  { year: 2095, statusQuo: 4.7, userImpact: 2.8 },
  { year: 2100, statusQuo: 5.0, userImpact: 2.9 },
];

const seaLevelData = [
  { year: 2020, statusQuo: 0.2, userImpact: 0.18 },
  { year: 2030, statusQuo: 0.4, userImpact: 0.35 },
  { year: 2040, statusQuo: 0.6, userImpact: 0.5 },
  { year: 2050, statusQuo: 0.8, userImpact: 0.65 },
  { year: 2060, statusQuo: 1.0, userImpact: 0.8 },
  { year: 2070, statusQuo: 1.2, userImpact: 0.95 },
  { year: 2080, statusQuo: 1.4, userImpact: 1.1 },
  { year: 2090, statusQuo: 1.6, userImpact: 1.25 },
  { year: 2100, statusQuo: 1.8, userImpact: 1.4 },
];

const co2EmissionsData = [
  { year: 2020, statusQuo: 36, userImpact: 35 },
  { year: 2025, statusQuo: 38, userImpact: 36 },
  { year: 2030, statusQuo: 40, userImpact: 38 },
  { year: 2035, statusQuo: 42, userImpact: 39 },
  { year: 2040, statusQuo: 44, userImpact: 40 },
  { year: 2045, statusQuo: 46, userImpact: 41 },
  { year: 2050, statusQuo: 48, userImpact: 42 },
  { year: 2055, statusQuo: 50, userImpact: 43 },
  { year: 2060, statusQuo: 52, userImpact: 44 },
  { year: 2065, statusQuo: 54, userImpact: 45 },
  { year: 2070, statusQuo: 56, userImpact: 46 },
  { year: 2075, statusQuo: 58, userImpact: 47 },
  { year: 2080, statusQuo: 60, userImpact: 48 },
  { year: 2085, statusQuo: 62, userImpact: 49 },
  { year: 2090, statusQuo: 64, userImpact: 50 },
  { year: 2095, statusQuo: 66, userImpact: 51 },
  { year: 2100, statusQuo: 68, userImpact: 52 },
];

function Impact() {
  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <animated.h1
        style={animationProps}
        className="text-3xl font-bold mb-5 text-center mt-12"
      >
        Auswirkungen
      </animated.h1>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          Durchschnittlicher Temperaturanstieg (°C)
        </h2>
        <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="statusQuo"
                stroke="#F08080"
                name="Status Quo"
              />
              <Line
                type="monotone"
                dataKey="userImpact"
                stroke="#A4C465"
                name="Dein Einfluss"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Anstieg des Meeresspiegels */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Anstieg des Meeresspiegels (Meter)</h2>
        <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={seaLevelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
              <Legend />
              <Bar dataKey="statusQuo" fill="#F08080" name="Status Quo" />
              <Bar dataKey="userImpact" fill="#A4C465" name="Dein Einfluss" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* CO₂-Emissionen */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">CO₂-Emissionen (GtCO₂)</h2>
        <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={co2EmissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="statusQuo"
                stroke="#F08080"
                name="Status Quo"
              />
              <Line
                type="monotone"
                dataKey="userImpact"
                stroke="#A4C465"
                name="Dein Einfluss"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Nachhaltigkeitstipps */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Nachhaltigkeitstipps</h2>
        <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
          <ul className="list-disc list-inside">
            <li>Reduziere deinen Energieverbrauch durch effiziente Geräte.</li>
            <li>Pflanze Bäume in deiner Gemeinde.</li>
            <li>Unterstütze erneuerbare Energiequellen.</li>
            <li>Fahre weniger Auto und nutze öffentliche Verkehrsmittel oder Fahrrad.</li>
            <li>Vermeide Einwegplastik und nutze wiederverwendbare Produkte.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Impact;
