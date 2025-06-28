import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Calendar,
  MapPin,
  Target,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const getStatsForRole = (role) => {
    switch (role) {
      case 'admin':
        return [
          { label: 'Total Women', value: '1,234', icon: Users, color: 'bg-purple-500' },
          { label: 'Active Programs', value: '25', icon: BookOpen, color: 'bg-teal-500' },
          { label: 'Completed Training', value: '567', icon: Award, color: 'bg-green-500' },
          { label: 'Villages Covered', value: '45', icon: MapPin, color: 'bg-orange-500' }
        ];
      case 'fieldOfficer':
        return [
          { label: 'Assigned Women', value: '156', icon: Users, color: 'bg-purple-500' },
          { label: 'Active Programs', value: '8', icon: BookOpen, color: 'bg-teal-500' },
          { label: 'This Month Progress', value: '89%', icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Village Visits', value: '12', icon: MapPin, color: 'bg-orange-500' }
        ];
      case 'shgWoman':
        return [
          { label: 'Completed Courses', value: '5', icon: Award, color: 'bg-green-500' },
          { label: 'In Progress', value: '2', icon: BookOpen, color: 'bg-teal-500' },
          { label: 'Certificates', value: '3', icon: CheckCircle, color: 'bg-purple-500' },
          { label: 'Group Activities', value: '8', icon: Target, color: 'bg-orange-500' }
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole(user?.role);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {t('welcome')}, {user?.name}!
        </h1>
        <p className="text-teal-100">
          {user?.role === 'admin' && 'Manage programs and monitor overall progress'}
          {user?.role === 'fieldOfficer' && 'Track your assigned women and their progress'}
          {user?.role === 'shgWoman' && 'Continue your learning journey and connect with your community'}
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{user?.village}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                title: 'Financial Literacy Training Completed',
                description: 'Successfully completed the basic financial literacy module',
                time: '2 hours ago',
                type: 'success'
              },
              {
                title: 'New Group Discussion Started',
                description: 'Join the discussion about sustainable farming practices',
                time: '4 hours ago',
                type: 'info'
              },
              {
                title: 'Monthly Progress Report Due',
                description: 'Submit your monthly activities report by tomorrow',
                time: '1 day ago',
                type: 'warning'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <BookOpen className="h-8 w-8 text-teal-500 mb-2" />
              <p className="font-medium text-gray-900">Start New Training</p>
              <p className="text-sm text-gray-600">Browse available courses</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Users className="h-8 w-8 text-purple-500 mb-2" />
              <p className="font-medium text-gray-900">Join Discussion</p>
              <p className="text-sm text-gray-600">Connect with community</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
              <p className="font-medium text-gray-900">View Progress</p>
              <p className="text-sm text-gray-600">Track your achievements</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;