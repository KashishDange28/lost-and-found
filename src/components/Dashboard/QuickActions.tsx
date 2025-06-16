import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Search, Eye, FileText, QrCode, Bell } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Report Lost Item',
      description: 'Lost something? Let us know',
      icon: Plus,
      color: 'bg-red-500 hover:bg-red-600',
      link: '/report?type=lost',
    },
    {
      title: 'Report Found Item',
      description: 'Found something? Help return it',
      icon: Search,
      color: 'bg-green-500 hover:bg-green-600',
      link: '/report?type=found',
    },
    {
      title: 'Browse Items',
      description: 'Search through all items',
      icon: Eye,
      color: 'bg-blue-500 hover:bg-blue-600',
      link: '/browse',
    },
    {
      title: 'My Reports',
      description: 'View your submissions',
      icon: FileText,
      color: 'bg-purple-500 hover:bg-purple-600',
      link: '/my-reports',
    },
    {
      title: 'QR Scanner',
      description: 'Scan QR codes on items',
      icon: QrCode,
      color: 'bg-orange-500 hover:bg-orange-600',
      link: '/qr-scanner',
    },
    {
      title: 'Notifications',
      description: 'Check your alerts',
      icon: Bell,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      link: '/notifications',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={action.link}
                className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${action.color} transition-colors duration-200`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActions;