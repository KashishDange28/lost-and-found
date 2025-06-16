import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Eye, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MapPin,
  Calendar,
  Filter
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Item } from '../../types';

const MyReportsPage: React.FC = () => {
  const { user } = useAuth();
  const { items, updateItem, deleteItem } = useData();
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const userItems = items.filter(item => item.userId === user?.id);
  const filteredItems = userItems.filter(item => {
    const typeMatch = filter === 'all' || item.type === filter;
    const statusMatch = statusFilter === 'all' || item.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'matched':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'claimed':
        return <CheckCircle className="w-5 h-5 text-purple-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'matched':
        return 'bg-blue-100 text-blue-800';
      case 'claimed':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      deleteItem(itemId);
    }
  };

  const stats = {
    total: userItems.length,
    lost: userItems.filter(item => item.type === 'lost').length,
    found: userItems.filter(item => item.type === 'found').length,
    matched: userItems.filter(item => item.status === 'matched').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reports</h1>
          <p className="text-gray-600">
            Track and manage all your lost and found item reports
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lost Items</p>
                <p className="text-3xl font-bold text-gray-900">{stats.lost}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Found Items</p>
                <p className="text-3xl font-bold text-gray-900">{stats.found}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Matched</p>
                <p className="text-3xl font-bold text-gray-900">{stats.matched}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setFilter('lost')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === 'lost'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Lost Items
              </button>
              <button
                onClick={() => setFilter('found')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === 'found'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Found Items
              </button>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="matched">Matched</option>
              <option value="claimed">Claimed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </motion.div>

        {/* Items List */}
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? "You haven't submitted any reports yet"
                  : `No ${filter} items found with the selected filters`
                }
              </p>
            </motion.div>
          ) : (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.images[0] || '/placeholder-image.jpg'}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Submitted {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {item.status === 'matched' && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Match Found!</span>
                      </div>
                      <p className="text-blue-800 text-sm mt-1">
                        We found a potential match for your item. Check your notifications for details.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReportsPage;