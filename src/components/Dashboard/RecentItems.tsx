import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Calendar, Eye, MessageCircle } from 'lucide-react';
import { Item } from '../../types';

interface RecentItemsProps {
  items: Item[];
  title: string;
  emptyMessage: string;
}

const RecentItems: React.FC<RecentItemsProps> = ({ items, title, emptyMessage }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="p-6">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.images[0] || '/placeholder-image.jpg'}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-gray-600">
                      by {item.userName}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecentItems;