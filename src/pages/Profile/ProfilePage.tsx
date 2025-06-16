import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Camera,
  Shield,
  Bell,
  Lock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: number;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      studentId: user?.studentId || '',
      department: user?.department || '',
      year: user?.year || 1,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch,
  } = useForm<PasswordFormData>();

  const newPassword = watch('newPassword');

  const departments = [
    'Computer Engineering',
    'Information Technology',
    'Electronics & Telecommunication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Instrumentation & Control',
  ];

  const handleProfileUpdate = async (data: ProfileFormData) => {
    try {
      // In a real implementation, you would call an API to update the profile
      console.log('Updating profile:', data);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = async (data: PasswordFormData) => {
    try {
      // In a real implementation, you would call an API to change the password
      console.log('Changing password');
      toast.success('Password changed successfully!');
      setIsChangingPassword(false);
      resetPassword();
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
          toast.success('Profile image updated!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors duration-200">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h3>
                <p className="text-gray-600 mb-2">{user?.email}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  {user?.role}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                {user?.phone && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">{user?.phone}</span>
                  </div>
                )}
                {user?.studentId && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user?.studentId}</span>
                  </div>
                )}
                {user?.department && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm">{user?.department}</span>
                  </div>
                )}
                {user?.year && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">Year {user?.year}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID
                    </label>
                    <input
                      {...register('studentId')}
                      type="text"
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      {...register('department')}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      {...register('year')}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value={1}>1st Year</option>
                      <option value={2}>2nd Year</option>
                      <option value={3}>3rd Year</option>
                      <option value={4}>4th Year</option>
                    </select>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Password</h4>
                    <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                  </div>
                  <button
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Change Password</span>
                  </button>
                </div>

                {isChangingPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 pt-6"
                  >
                    <form onSubmit={handlePasswordSubmit(handlePasswordChange)} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          {...registerPassword('currentPassword', { required: 'Current password is required' })}
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {passwordErrors.currentPassword && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {passwordErrors.currentPassword.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          {...registerPassword('newPassword', {
                            required: 'New password is required',
                            minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters',
                            },
                          })}
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {passwordErrors.newPassword && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {passwordErrors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          {...registerPassword('confirmPassword', {
                            required: 'Please confirm your new password',
                            validate: (value) => value === newPassword || 'Passwords do not match',
                          })}
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {passwordErrors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          Update Password
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsChangingPassword(false);
                            resetPassword();
                          }}
                          className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;