import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Users,
  Calendar,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatsCard from '../../components/Dashboard/StatsCard';
import RecentItems from '../../components/Dashboard/RecentItems';
import QuickActions from '../../components/Dashboard/QuickActions';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { items, stats } = useData();

  const userItems = items.filter(item => item.userId === user?.id);
  const recentItems = items.slice(0, 5);

  const statsData = [
    {
      title: 'Total Items',
      value: stats.totalItems,
      icon: Package,
      color: 'bg-blue-500',
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Lost Items',
      value: stats.totalLost,
      icon: AlertCircle,
      color: 'bg-red-500',
      trend: { value: 8, isPositive: false },
    },
    {
      title: 'Found Items',
      value: stats.totalFound,
      icon: Search,
      color: 'bg-green-500',
      trend: { value: 15, isPositive: true },
    },
    {
      title: 'Matched Items',
      value: stats.totalMatched,
      icon: CheckCircle,
      color: 'bg-purple-500',
      trend: { value: 20, isPositive: true },
    },
  ];

  if (user?.role === 'admin') {
    statsData.push(
      {
        title: 'Active Users',
        value: 234,
        icon: Users,
        color: 'bg-indigo-500',
        trend: { value: 5, isPositive: true },
      },
      {
        title: 'This Month',
        value: stats.thisMonth,
        icon: Calendar,
        color: 'bg-orange-500',
        trend: { value: 18, isPositive: true },
      },
      {
        title: 'Success Rate',
        value: `${stats.successRate}%`,
        icon: Award,
        color: 'bg-teal-500',
        trend: { value: 3, isPositive: true },
      },
      {
        title: 'Growth',
        value: '+25%',
        icon: TrendingUp,
        color: 'bg-pink-500',
        trend: { value: 25, isPositive: true },
      }
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            {user?.role === 'admin' 
              ? 'Manage the Lost & Found system and help students recover their belongings.'
              : 'Track your lost items and browse found items from the community.'
            }
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Items */}
          <div className="lg:col-span-2">
            <RecentItems
              items={recentItems}
              title="Recent Activity"
              emptyMessage="No recent activity to show"
            />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* User's Items (for students) */}
        {user?.role === 'student' && userItems.length > 0 && (
          <div className="mt-8">
            <RecentItems
              items={userItems}
              title="Your Items"
              emptyMessage="You haven't reported any items yet"
            />
          </div>
        )}

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">💡 Tip of the Day</h3>
              <p className="text-blue-100">
                Always include clear photos and detailed descriptions when reporting items. 
                This helps our AI matching system find better matches faster!
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;