import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useAuth } from '../../contexts/AuthContext';
import 'leaflet/dist/leaflet.css';

// Custom hook to update map view
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const ImpactHeatmap = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedMetric, setSelectedMetric] = useState('participation');
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Delhi coordinates
  const [mapZoom, setMapZoom] = useState(8);

  // Sample village data with coordinates
  const villageData = [
    {
      id: 1,
      name: 'Rampur',
      coordinates: [28.6139, 77.2090],
      participants: 45,
      completed: 32,
      programs: 8,
      impactScore: 85,
      population: 1200,
      literacy: 68,
      incomeIncrease: 45
    },
    {
      id: 2,
      name: 'Krishnanagar',
      coordinates: [28.7041, 77.1025],
      participants: 38,
      completed: 28,
      programs: 6,
      impactScore: 78,
      population: 980,
      literacy: 72,
      incomeIncrease: 38
    },
    {
      id: 3,
      name: 'Mathura',
      coordinates: [27.4924, 77.6737],
      participants: 52,
      completed: 41,
      programs: 10,
      impactScore: 92,
      population: 1500,
      literacy: 75,
      incomeIncrease: 62
    },
    {
      id: 4,
      name: 'Vrindavan',
      coordinates: [27.5806, 77.7006],
      participants: 29,
      completed: 20,
      programs: 5,
      impactScore: 70,
      population: 800,
      literacy: 65,
      incomeIncrease: 28
    },
    {
      id: 5,
      name: 'Govardhan',
      coordinates: [27.5167, 77.7667],
      participants: 35,
      completed: 25,
      programs: 7,
      impactScore: 80,
      population: 1100,
      literacy: 70,
      incomeIncrease: 42
    },
    {
      id: 6,
      name: 'Barsana',
      coordinates: [27.6500, 77.3833],
      participants: 41,
      completed: 30,
      programs: 9,
      impactScore: 88,
      population: 1300,
      literacy: 73,
      incomeIncrease: 55
    }
  ];

  // Get color based on metric value
  const getMarkerColor = (village) => {
    let value;
    let maxValue;

    switch (selectedMetric) {
      case 'participation':
        value = village.participants;
        maxValue = 60;
        break;
      case 'completion':
        value = (village.completed / village.participants) * 100;
        maxValue = 100;
        break;
      case 'impact':
        value = village.impactScore;
        maxValue = 100;
        break;
      case 'income':
        value = village.incomeIncrease;
        maxValue = 70;
        break;
      default:
        value = village.impactScore;
        maxValue = 100;
    }

    const intensity = Math.min(value / maxValue, 1);
    
    if (intensity > 0.8) return '#10B981'; // Green
    if (intensity > 0.6) return '#F59E0B'; // Yellow
    if (intensity > 0.4) return '#EF4444'; // Red
    return '#6B7280'; // Gray
  };

  // Get marker size based on metric value
  const getMarkerSize = (village) => {
    let value;
    let maxValue;

    switch (selectedMetric) {
      case 'participation':
        value = village.participants;
        maxValue = 60;
        break;
      case 'completion':
        value = (village.completed / village.participants) * 100;
        maxValue = 100;
        break;
      case 'impact':
        value = village.impactScore;
        maxValue = 100;
        break;
      case 'income':
        value = village.incomeIncrease;
        maxValue = 70;
        break;
      default:
        value = village.impactScore;
        maxValue = 100;
    }

    const intensity = Math.min(value / maxValue, 1);
    return Math.max(10, intensity * 30);
  };

  // Get metric display value
  const getMetricValue = (village) => {
    switch (selectedMetric) {
      case 'participation':
        return village.participants;
      case 'completion':
        return Math.round((village.completed / village.participants) * 100) + '%';
      case 'impact':
        return village.impactScore;
      case 'income':
        return village.incomeIncrease + '%';
      default:
        return village.impactScore;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{t('impactHeatmap')}</h1>
        <p className="text-green-100">
          {t('visualizeImpactAcrossRegions')}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              {t('selectMetric')}:
            </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="participation">{t('participation')}</option>
              <option value="completion">{t('completionRate')}</option>
              <option value="impact">{t('impactScore')}</option>
              <option value="income">{t('incomeIncrease')}</option>
            </select>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>{t('high')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span>{t('medium')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>{t('low')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-96">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <ChangeView center={mapCenter} zoom={mapZoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {villageData.map((village) => (
              <CircleMarker
                key={village.id}
                center={village.coordinates}
                radius={getMarkerSize(village)}
                fillColor={getMarkerColor(village)}
                color="#ffffff"
                weight={2}
                opacity={1}
                fillOpacity={0.8}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {village.name}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('participants')}:</span>
                        <span className="font-medium">{village.participants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('completed')}:</span>
                        <span className="font-medium">{village.completed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('impactScore')}:</span>
                        <span className="font-medium">{village.impactScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('incomeIncrease')}:</span>
                        <span className="font-medium">{village.incomeIncrease}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('population')}:</span>
                        <span className="font-medium">{village.population.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {villageData.reduce((sum, v) => sum + v.participants, 0)}
            </div>
            <div className="text-sm text-gray-600">{t('totalParticipants')}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {villageData.reduce((sum, v) => sum + v.completed, 0)}
            </div>
            <div className="text-sm text-gray-600">{t('totalCompleted')}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(villageData.reduce((sum, v) => sum + v.impactScore, 0) / villageData.length)}
            </div>
            <div className="text-sm text-gray-600">{t('avgImpactScore')}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(villageData.reduce((sum, v) => sum + v.incomeIncrease, 0) / villageData.length)}%
            </div>
            <div className="text-sm text-gray-600">{t('avgIncomeIncrease')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactHeatmap;