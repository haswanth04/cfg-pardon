import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  Award,
  Filter,
  Layers,
  Search,
  Info
} from 'lucide-react';

const MapModule = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [mapLayer, setMapLayer] = useState('participation');

  // Sample village data with coordinates (mock data)
  const villages = [
    {
      id: 1,
      name: 'Rampur',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      participants: 45,
      completed: 32,
      programs: 8,
      fieldOfficer: 'Priya Sharma',
      population: 1200,
      literacy: 68,
      impact: 85
    },
    {
      id: 2,
      name: 'Krishnanagar',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      participants: 38,
      completed: 28,
      programs: 6,
      fieldOfficer: 'Sunita Devi',
      population: 980,
      literacy: 72,
      impact: 78
    },
    {
      id: 3,
      name: 'Mathura',
      coordinates: { lat: 27.4924, lng: 77.6737 },
      participants: 52,
      completed: 41,
      programs: 10,
      fieldOfficer: 'Meera Patel',
      population: 1500,
      literacy: 75,
      impact: 92
    },
    {
      id: 4,
      name: 'Vrindavan',
      coordinates: { lat: 27.5806, lng: 77.7006 },
      participants: 29,
      completed: 20,
      programs: 5,
      fieldOfficer: 'Kavita Singh',
      population: 800,
      literacy: 65,
      impact: 70
    },
    {
      id: 5,
      name: 'Govardhan',
      coordinates: { lat: 27.5167, lng: 77.7667 },
      participants: 35,
      completed: 25,
      programs: 7,
      fieldOfficer: 'Anita Verma',
      population: 1100,
      literacy: 70,
      impact: 80
    },
    {
      id: 6,
      name: 'Barsana',
      coordinates: { lat: 27.6500, lng: 77.3833 },
      participants: 41,
      completed: 30,
      programs: 9,
      fieldOfficer: 'Rekha Sharma',
      population: 1300,
      literacy: 73,
      impact: 88
    }
  ];

  const getVillageColor = (village) => {
    const completionRate = (village.completed / village.participants) * 100;
    
    switch (mapLayer) {
      case 'participation':
        return village.participants > 40 ? '#10B981' : village.participants > 30 ? '#F59E0B' : '#EF4444';
      case 'completion':
        return completionRate > 80 ? '#10B981' : completionRate > 60 ? '#F59E0B' : '#EF4444';
      case 'impact':
        return village.impact > 85 ? '#10B981' : village.impact > 70 ? '#F59E0B' : '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getVillageSize = (village) => {
    switch (mapLayer) {
      case 'participation':
        return Math.max(20, (village.participants / 60) * 40);
      case 'completion':
        return Math.max(20, (village.completed / 50) * 40);
      case 'impact':
        return Math.max(20, (village.impact / 100) * 40);
      default:
        return 30;
    }
  };

  const totalStats = {
    villages: villages.length,
    participants: villages.reduce((sum, v) => sum + v.participants, 0),
    completed: villages.reduce((sum, v) => sum + v.completed, 0),
    programs: villages.reduce((sum, v) => sum + v.programs, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Impact Map</h1>
        <p className="text-green-100">
          Visualize program impact and participation across villages
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-gray-400" />
              <select
                value={mapLayer}
                onChange={(e) => setMapLayer(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="participation">Participation</option>
                <option value="completion">Completion Rate</option>
                <option value="impact">Impact Score</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Village Impact Map</h3>
            
            {/* Mock Map Container */}
            <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg h-96 overflow-hidden">
              {/* Map Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10B981" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Village Markers */}
              {villages.map((village, index) => (
                <div
                  key={village.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{
                    left: `${20 + (index % 3) * 30 + Math.random() * 10}%`,
                    top: `${20 + Math.floor(index / 3) * 25 + Math.random() * 10}%`,
                    width: `${getVillageSize(village)}px`,
                    height: `${getVillageSize(village)}px`
                  }}
                  onClick={() => setSelectedVillage(village)}
                >
                  <div
                    className="w-full h-full rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xs border-2 border-white"
                    style={{ backgroundColor: getVillageColor(village) }}
                  >
                    {village.participants}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium text-gray-700 whitespace-nowrap">
                    {village.name}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  {mapLayer === 'participation' && 'Participants'}
                  {mapLayer === 'completion' && 'Completion Rate'}
                  {mapLayer === 'impact' && 'Impact Score'}
                </h4>
                <div className="text-xs text-gray-600">
                  Circle size represents {mapLayer} level
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Village Details */}
        <div className="space-y-6">
          {/* Overall Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Villages</span>
                <span className="font-semibold text-gray-900">{totalStats.villages}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Participants</span>
                <span className="font-semibold text-gray-900">{totalStats.participants}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed Training</span>
                <span className="font-semibold text-gray-900">{totalStats.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Programs</span>
                <span className="font-semibold text-gray-900">{totalStats.programs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completion Rate</span>
                <span className="font-semibold text-green-600">
                  {Math.round((totalStats.completed / totalStats.participants) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Selected Village Details */}
          {selectedVillage ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedVillage.name}</h3>
                <button
                  onClick={() => setSelectedVillage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedVillage.participants}</div>
                    <div className="text-xs text-blue-600">Participants</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedVillage.completed}</div>
                    <div className="text-xs text-green-600">Completed</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Field Officer</span>
                    <span className="text-sm font-medium text-gray-900">{selectedVillage.fieldOfficer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Population</span>
                    <span className="text-sm font-medium text-gray-900">{selectedVillage.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Literacy Rate</span>
                    <span className="text-sm font-medium text-gray-900">{selectedVillage.literacy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Impact Score</span>
                    <span className="text-sm font-medium text-green-600">{selectedVillage.impact}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Programs</span>
                    <span className="text-sm font-medium text-gray-900">{selectedVillage.programs}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Completion Rate</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(selectedVillage.completed / selectedVillage.participants) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round((selectedVillage.completed / selectedVillage.participants) * 100)}% completed
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Click on a village marker to view detailed information</p>
              </div>
            </div>
          )}

          {/* Top Performing Villages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Villages</h3>
            <div className="space-y-3">
              {villages
                .sort((a, b) => b.impact - a.impact)
                .slice(0, 3)
                .map((village, index) => (
                  <div key={village.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{village.name}</div>
                        <div className="text-xs text-gray-500">{village.participants} participants</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">{village.impact}</div>
                      <div className="text-xs text-gray-500">impact score</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModule;