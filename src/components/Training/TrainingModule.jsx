import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

const TrainingModule = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('available');

  const trainingPrograms = [
    {
      id: 1,
      title: 'Financial Literacy Basics',
      description: 'Learn basic financial concepts, budgeting, and savings',
      duration: '4 hours',
      participants: 156,
      status: 'available',
      progress: 0,
      difficulty: 'Beginner',
      category: 'Finance',
      image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Digital Banking Skills',
      description: 'Master mobile banking, UPI payments, and online transactions',
      duration: '3 hours',
      participants: 89,
      status: 'in-progress',
      progress: 65,
      difficulty: 'Intermediate',
      category: 'Technology',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Sustainable Farming Practices',
      description: 'Learn eco-friendly farming methods and crop rotation',
      duration: '6 hours',
      participants: 203,
      status: 'completed',
      progress: 100,
      difficulty: 'Advanced',
      category: 'Agriculture',
      image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Entrepreneurship Fundamentals',
      description: 'Start your own business with confidence and knowledge',
      duration: '5 hours',
      participants: 78,
      status: 'available',
      progress: 0,
      difficulty: 'Intermediate',
      category: 'Business',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'Health and Nutrition',
      description: 'Family health, nutrition planning, and preventive care',
      duration: '4 hours',
      participants: 234,
      status: 'in-progress',
      progress: 30,
      difficulty: 'Beginner',
      category: 'Health',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      title: 'Leadership Development',
      description: 'Develop leadership skills and community engagement',
      duration: '7 hours',
      participants: 145,
      status: 'completed',
      progress: 100,
      difficulty: 'Advanced',
      category: 'Leadership',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const getFilteredPrograms = () => {
    return trainingPrograms.filter(program => {
      if (activeTab === 'available') return program.status === 'available';
      if (activeTab === 'in-progress') return program.status === 'in-progress';
      if (activeTab === 'completed') return program.status === 'completed';
      return true;
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Play className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{t('trainingPrograms')}</h1>
        <p className="text-purple-100">
          {user?.role === 'admin' && 'Manage training programs and track participant progress'}
          {user?.role === 'fieldOfficer' && 'Monitor training progress of assigned women'}
          {user?.role === 'shgWoman' && 'Expand your skills with our comprehensive training programs'}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'available', label: 'Available', count: trainingPrograms.filter(p => p.status === 'available').length },
              { id: 'in-progress', label: 'In Progress', count: trainingPrograms.filter(p => p.status === 'in-progress').length },
              { id: 'completed', label: 'Completed', count: trainingPrograms.filter(p => p.status === 'completed').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Programs Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredPrograms().map((program) => (
              <div key={program.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                      {program.status === 'available' ? 'Available' : 
                       program.status === 'in-progress' ? 'In Progress' : 'Completed'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(program.difficulty)}`}>
                      {program.difficulty}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{program.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{program.participants}</span>
                    </div>
                  </div>

                  {program.status === 'in-progress' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{program.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${program.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    {getStatusIcon(program.status)}
                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                      {program.status === 'available' ? 'Start Training' :
                       program.status === 'in-progress' ? 'Continue' : 'View Certificate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enrolled</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {trainingPrograms.filter(p => p.status !== 'available').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">78%</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certificates Earned</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {trainingPrograms.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;