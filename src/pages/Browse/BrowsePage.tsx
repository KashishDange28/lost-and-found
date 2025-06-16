import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Eye, 
  MessageCircle,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useData } from '../../context/DataContext';
import { Item } from '../../types';

const BrowsePage: React.FC = () => {
  const { items, searchItems } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    location: '',
    status: 'approved',
    dateRange: '',
  });

  const categories = [
    'Electronics',
    'Personal Items',
    'Academic',
    'Clothing',
    'Accessories',
    'Sports Equipment',
    'Books',
    'Other'
  ];

  const locations = [
    'Library',
    'Computer Lab A',
    'Computer Lab B',
    'Mechanical Workshop',
    'Civil Lab',
    'Electrical Lab',
    'Canteen',
    'Auditorium',
    'Main Building',
    'Hostel',
    'Sports Complex',
    'Parking Area'
  ];

  const filteredItems = useMemo(() => {
    return searchItems(searchQuery, filters);
  }, [searchQuery, filters, searchItems]);

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      category: '',
      location: '',
      status: 'approved',
      dateRange: '',
    });
    setSearchQuery('');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
          <p className="text-gray-600">
            Search through all reported lost and found items
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="matched">Matched</option>
                    <option value="claimed">Claimed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  {filteredItems.length} items found
                </p>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative">
                <img
                  src={item.images[0] || '/placeholder-image.jpg'}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    by {item.userName}
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </motion.div>
        )}

        {/* Item Detail Modal */}
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.images[0] || '/placeholder-image.jpg'}
                  alt={selectedItem.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedItem.type)}`}>
                    {selectedItem.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedItem.status)}`}>
                    {selectedItem.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedItem.title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedItem.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Category</h4>
                      <p className="text-gray-600">{selectedItem.category}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Location</h4>
                      <p className="text-gray-600">{selectedItem.location}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Date</h4>
                      <p className="text-gray-600">
                        {formatDistanceToNow(new Date(selectedItem.date), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">{selectedItem.userName}</p>
                    <p className="text-gray-600">{selectedItem.userEmail}</p>
                    {selectedItem.userPhone && (
                      <p className="text-gray-600">{selectedItem.userPhone}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Contact Owner
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                    Report Match
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;