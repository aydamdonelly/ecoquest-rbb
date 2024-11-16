// src/pages/Impact.js

import React, { useState } from 'react';
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
import { FaGlobe, FaChartLine, FaUsers } from 'react-icons/fa';

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

const earthsConsumedData = [
  { group: 'Durchschnitt', earths: 1.7 },
  { group: 'Dein Verbrauch', earths: 1.2 },
  { group: 'Nachhaltig', earths: 1.0 },
];

function Impact() {
  const [activeTab, setActiveTab] = useState('temperature');
  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div className="p-5 text-cream font-sans min-h-screen page-with-grid-background">
      <animated.h1
        style={animationProps}
        className="text-4xl font-bold mb-5 text-center mt-12 page-title"
      >
        Impact
      </animated.h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('temperature')}
          className={`px-4 py-2 rounded ${
            activeTab === 'temperature' ? 'bg-greenLight text-dark' : 'bg-darkLighter'
          }`}
        >
          <FaChartLine className="inline mr-2" />
          Temperatur
        </button>
        <button
          onClick={() => setActiveTab('earths')}
          className={`px-4 py-2 rounded ${
            activeTab === 'earths' ? 'bg-greenLight text-dark' : 'bg-darkLighter'
          }`}
        >
          <FaGlobe className="inline mr-2" />
          Erden Verbrauch
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2 rounded ${
            activeTab === 'groups' ? 'bg-greenLight text-dark' : 'bg-darkLighter'
          }`}
        >
          <FaUsers className="inline mr-2" />
          Gruppenvergleich
        </button>
      </div>

      {/* Content */}
      {activeTab === 'temperature' && (
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
      )}

      {activeTab === 'earths' && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Erdenverbrauch</h2>
          <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earthsConsumedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="group" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
                <Bar dataKey="earths" fill="#A4C465" name="Anzahl Erden" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Gruppenvergleich</h2>
          {/* Inhalt für Gruppenvergleich hier hinzufügen */}
          <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
            <p className="text-lg">Hier werden verschiedene Gruppen verglichen.</p>
          </div>
        </div>
      )}

      {/* Nachhaltigkeitstipps */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Nachhaltigkeitstipps</h2>
        <div className="bg-darkLighter p-5 rounded-lg shadow-lg">
          <ul className="list-disc list-inside text-lg">
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
