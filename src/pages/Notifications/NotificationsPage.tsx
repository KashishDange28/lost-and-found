import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  BellOff, 
  Check, 
  Trash2, 
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  Info,
  Settings
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useData } from '../../context/DataContext';
import { Notification } from '../../types';

const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useData();
  const [filter, setFilter] = useState<'all' | 'unread' | 'match' | 'status' | 'admin'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter !== 'all' && filter !== 'unread' && notification.type === filter);
    
    const matchesSearch = !searchQuery || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'status':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'admin':
        return <Settings className="w-5 h-5 text-purple-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'match':
        return 'bg-blue-50 border-blue-200';
      case 'status':
        return 'bg-orange-50 border-orange-200';
      case 'admin':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        markNotificationRead(notification.id);
      }
    });
  };

  const handleDeleteNotification = (notificationId: string) => {
    // In a real implementation, you would have a delete function in the context
    console.log('Delete notification:', notificationId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">
                Stay updated with matches, status changes, and important announcements
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {unreadCount} unread
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === 'unread'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('match')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === 'match'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => setFilter('status')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === 'status'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Status
              </button>
              <button
                onClick={() => setFilter('admin')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Check className="w-4 h-4" />
                <span>Mark All Read</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BellOff className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? "You don't have any notifications yet"
                  : `No ${filter} notifications found`
                }
              </p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white rounded-xl shadow-lg border-2 p-6 hover:shadow-xl transition-all duration-300 ${
                  !notification.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                } ${getNotificationColor(notification.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notification.type === 'match' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'status' ? 'bg-orange-100 text-orange-800' :
                          notification.type === 'admin' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.type}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {notification.type === 'match' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        View Match Details
                      </button>
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                        Contact Owner
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Match Notifications</h4>
                <p className="text-sm text-gray-600">Get notified when potential matches are found</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Status Updates</h4>
                <p className="text-sm text-gray-600">Get notified about status changes to your reports</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Admin Announcements</h4>
                <p className="text-sm text-gray-600">Receive important announcements from administrators</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationsPage;