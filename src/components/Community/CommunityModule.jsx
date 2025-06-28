import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Megaphone,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Clock
} from 'lucide-react';

const CommunityModule = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('groups');

  const communityGroups = [
    {
      id: 1,
      name: 'Financial Literacy Circle',
      description: 'Discuss budgeting, savings, and investment strategies',
      members: 45,
      category: 'Finance',
      image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400',
      joined: true
    },
    {
      id: 2,
      name: 'Sustainable Farming Group',
      description: 'Share organic farming techniques and crop management',
      members: 67,
      category: 'Agriculture',
      image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400',
      joined: false
    },
    {
      id: 3,
      name: 'Women Entrepreneurs',
      description: 'Support network for women starting their own businesses',
      members: 89,
      category: 'Business',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
      joined: true
    },
    {
      id: 4,
      name: 'Health & Wellness',
      description: 'Discuss family health, nutrition, and wellness practices',
      members: 123,
      category: 'Health',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      joined: false
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'How to start a small savings group?',
      author: 'Priya Sharma',
      village: 'Rampur',
      content: 'I want to start a savings group in my village. What are the basic requirements and how do we begin?',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 8,
      category: 'Finance'
    },
    {
      id: 2,
      title: 'Organic fertilizer making at home',
      author: 'Sunita Devi',
      village: 'Krishnanagar',
      content: 'Sharing my experience of making organic fertilizer using kitchen waste. Very effective and cost-efficient!',
      timestamp: '4 hours ago',
      likes: 18,
      comments: 5,
      category: 'Agriculture'
    },
    {
      id: 3,
      title: 'Digital marketing for small businesses',
      author: 'Meera Patel',
      village: 'Mathura',
      content: 'How can we use social media to promote our handmade products? Looking for practical tips.',
      timestamp: '6 hours ago',
      likes: 15,
      comments: 12,
      category: 'Business'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Monthly SHG Meeting',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Community Center, Rampur',
      description: 'Monthly meeting to discuss group activities and financial planning',
      attendees: 25,
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Skill Development Workshop',
      date: '2024-01-20',
      time: '2:00 PM',
      location: 'Training Hall, Krishnanagar',
      description: 'Hands-on workshop on handicraft making and product marketing',
      attendees: 40,
      type: 'workshop'
    },
    {
      id: 3,
      title: 'Health Awareness Camp',
      date: '2024-01-25',
      time: '9:00 AM',
      location: 'Primary Health Center',
      description: 'Free health checkup and nutrition counseling for women and children',
      attendees: 60,
      type: 'health'
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'New Training Program Launch',
      content: 'Digital Banking Skills training program now available. Registration opens next week.',
      date: '2024-01-10',
      priority: 'high',
      author: 'CFG-Pradan Team'
    },
    {
      id: 2,
      title: 'Scholarship Opportunity',
      content: 'Government scholarship available for women entrepreneurs. Apply before January 31st.',
      date: '2024-01-08',
      priority: 'medium',
      author: 'District Administration'
    },
    {
      id: 3,
      title: 'Community Feedback Survey',
      content: 'Please participate in our quarterly feedback survey to help us improve our services.',
      date: '2024-01-05',
      priority: 'low',
      author: 'CFG-Pradan Team'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'workshop':
        return 'bg-purple-100 text-purple-800';
      case 'health':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{t('communityGroups')}</h1>
        <p className="text-blue-100">
          Connect, share, and learn together with women in your community
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'groups', label: 'Groups', icon: Users },
              { id: 'discussions', label: 'Discussions', icon: MessageSquare },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'announcements', label: 'Announcements', icon: Megaphone }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'groups' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Community Groups</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Group</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityGroups.map((group) => (
                  <div key={group.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {group.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{group.members} members</span>
                        </div>
                        <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          group.joined
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}>
                          {group.joined ? 'Joined' : 'Join Group'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'discussions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Discussions</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Discussion</span>
                </button>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{discussion.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{discussion.author}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{discussion.village}</span>
                          </div>
                          <span>•</span>
                          <span>{discussion.timestamp}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {discussion.category}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{discussion.content}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{discussion.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{discussion.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Event</span>
                </button>
              </div>

              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Join Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Important Announcements</h2>
                {user?.role === 'admin' && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>New Announcement</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className={`border rounded-xl p-6 ${getPriorityColor(announcement.priority)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                      <span className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded">
                        {announcement.priority} priority
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{announcement.content}</p>
                    <div className="text-sm text-gray-500">
                      <span>By {announcement.author}</span>
                      <span> • </span>
                      <span>{new Date(announcement.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityModule;