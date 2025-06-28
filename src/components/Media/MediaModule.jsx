import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import VoiceInputForm from '../VoiceInput/VoiceInputForm';
import { 
  Upload, 
  Image, 
  Music, 
  Video,
  Eye,
  Download,
  Filter,
  Search,
  Plus,
  Calendar,
  MapPin,
  Tag,
  X
} from 'lucide-react';

const MediaModule = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample media data
  const mediaFiles = [
    {
      id: 1,
      title: 'Financial Literacy Training Session',
      description: 'Training session on basic banking and savings',
      type: 'image',
      url: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Priya Sharma',
      village: 'Rampur',
      date: '2024-01-10',
      tags: ['training', 'finance', 'banking'],
      size: '2.5 MB'
    },
    {
      id: 2,
      title: 'Community Group Meeting',
      description: 'Monthly SHG meeting discussion recording',
      type: 'audio',
      url: '#',
      author: 'Sunita Devi',
      village: 'Krishnanagar',
      date: '2024-01-08',
      tags: ['meeting', 'discussion', 'shg'],
      size: '15.2 MB',
      duration: '45:30'
    },
    {
      id: 3,
      title: 'Sustainable Farming Techniques',
      description: 'Demonstration of organic farming methods',
      type: 'video',
      url: '#',
      author: 'Meera Patel',
      village: 'Mathura',
      date: '2024-01-05',
      tags: ['agriculture', 'organic', 'farming'],
      size: '48.7 MB',
      duration: '12:45'
    },
    {
      id: 4,
      title: 'Handicraft Workshop',
      description: 'Women creating traditional handicrafts',
      type: 'image',
      url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Kavita Singh',
      village: 'Vrindavan',
      date: '2024-01-03',
      tags: ['handicraft', 'workshop', 'skills'],
      size: '3.1 MB'
    },
    {
      id: 5,
      title: 'Health Awareness Program',
      description: 'Nutrition and health education session',
      type: 'image',
      url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Dr. Anita Verma',
      village: 'Govardhan',
      date: '2024-01-01',
      tags: ['health', 'nutrition', 'awareness'],
      size: '2.8 MB'
    },
    {
      id: 6,
      title: 'Success Story Interview',
      description: 'Interview with successful woman entrepreneur',
      type: 'audio',
      url: '#',
      author: 'Field Officer',
      village: 'Barsana',
      date: '2023-12-28',
      tags: ['success', 'entrepreneur', 'interview'],
      size: '22.1 MB',
      duration: '28:15'
    }
  ];

  const getFilteredMedia = () => {
    return mediaFiles.filter(media => {
      const matchesType = filterType === 'all' || media.type === filterType;
      const matchesSearch = media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           media.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           media.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesType && matchesSearch;
    });
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'audio':
        return <Music className="h-5 w-5 text-green-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-purple-500" />;
      default:
        return <Upload className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleUploadSubmit = (data) => {
    console.log('Upload submitted:', data);
    setShowUploadForm(false);
    // In a real app, this would upload to server
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Media Library</h1>
        <p className="text-orange-100">
          Upload, organize, and share photos, videos, and audio recordings
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="audio">Audio</option>
                <option value="video">Videos</option>
              </select>
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredMedia().map((media) => (
          <div key={media.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Media Preview */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              {media.type === 'image' ? (
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                  {getFileIcon(media.type)}
                  <span className="ml-2 text-gray-600">{media.type.toUpperCase()}</span>
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedMedia(media)}
                    className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Media Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{media.title}</h3>
                {getFileIcon(media.type)}
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{media.description}</p>

              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <span>By {media.author}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{media.village}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(media.date).toLocaleDateString()}</span>
                  </div>
                  <span>{media.size}</span>
                </div>

                {media.duration && (
                  <div className="text-xs text-gray-500">
                    Duration: {media.duration}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {media.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                  >
                    <Tag className="h-2 w-2 mr-1"  />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mediaFiles.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Images</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mediaFiles.filter(m => m.type === 'image').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <Image className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Audio Files</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mediaFiles.filter(m => m.type === 'audio').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Music className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mediaFiles.filter(m => m.type === 'video').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <Video className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <VoiceInputForm
          onSubmit={handleUploadSubmit}
          onClose={() => setShowUploadForm(false)}
        />
      )}

      {/* Media Preview Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{selectedMedia.title}</h2>
              <button
                onClick={() => setSelectedMedia(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {selectedMedia.type === 'image' && (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              )}
              
              <div className="mt-6 space-y-4">
                <p className="text-gray-700">{selectedMedia.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Author:</span>
                    <span className="ml-2 text-gray-600">{selectedMedia.author}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Village:</span>
                    <span className="ml-2 text-gray-600">{selectedMedia.village}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Date:</span>
                    <span className="ml-2 text-gray-600">{new Date(selectedMedia.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Size:</span>
                    <span className="ml-2 text-gray-600">{selectedMedia.size}</span>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-gray-900">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedMedia.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaModule;