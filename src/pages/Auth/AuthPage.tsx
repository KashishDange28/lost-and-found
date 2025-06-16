import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Users, Zap } from 'lucide-react';
import LoginForm from '../../components/Auth/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const features = [
    {
      icon: Search,
      title: 'Smart Matching',
      description: 'AI-powered system matches lost and found items automatically',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with fellow students to recover lost belongings',
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      description: 'Get notified immediately when potential matches are found',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Lost & Found</h1>
                  <p className="text-blue-100">K.K. Wagh Institute</p>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Reuniting You With Your Belongings
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Advanced technology meets community care to help you recover lost items quickly and securely.
              </p>
            </motion.div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                🎯 Success Stories
              </h3>
              <p className="text-blue-100 text-sm">
                "Found my laptop within 2 hours of reporting it missing. The matching system is incredible!" 
                - Student, Computer Engineering
              </p>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 right-8 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-8 w-24 h-24 bg-orange-500 bg-opacity-20 rounded-full blur-2xl"></div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm onToggleMode={toggleMode} />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegisterForm onToggleMode={toggleMode} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;