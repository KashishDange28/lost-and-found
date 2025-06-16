import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Upload, 
  MapPin, 
  Calendar, 
  Tag, 
  AlertCircle,
  Camera,
  X,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ReportFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  tags: string;
}

const ReportPage: React.FC = () => {
  const { user } = useAuth();
  const { addItem } = useData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [reportType, setReportType] = useState<'lost' | 'found'>(
    (searchParams.get('type') as 'lost' | 'found') || 'lost'
  );
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReportFormData>();

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ReportFormData) => {
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setIsLoading(true);
    try {
      const tags = data.tags.split(',').map(tag => tag.trim().toLowerCase()).filter(Boolean);
      
      addItem({
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        date: new Date(data.date),
        images,
        status: 'pending',
        type: reportType,
        userId: user!.id,
        userName: user!.name,
        userEmail: user!.email,
        userPhone: user!.phone,
        tags,
      });

      toast.success(`${reportType === 'lost' ? 'Lost' : 'Found'} item reported successfully!`);
      reset();
      setImages([]);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report {reportType === 'lost' ? 'Lost' : 'Found'} Item
          </h1>
          <p className="text-gray-600">
            {reportType === 'lost' 
              ? 'Help us help you find your lost item by providing detailed information'
              : 'Help return a found item to its rightful owner'
            }
          </p>
        </motion.div>

        {/* Type Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setReportType('lost')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                reportType === 'lost'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Report Lost Item
            </button>
            <button
              onClick={() => setReportType('found')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                reportType === 'found'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Report Found Item
            </button>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Item Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                {...register('title', { required: 'Item name is required' })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., iPhone 13 Pro, Blue Water Bottle, Engineering Notebook"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide detailed description including color, brand, distinctive features, condition, etc."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location *
                </label>
                <select
                  {...register('location', { required: 'Location is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date {reportType === 'lost' ? 'Lost' : 'Found'} *
              </label>
              <input
                {...register('date', { required: 'Date is required' })}
                type="date"
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Tags (comma-separated)
              </label>
              <input
                {...register('tags')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., iphone, phone, black, cracked screen, apple"
              />
              <p className="mt-1 text-sm text-gray-500">
                Add relevant keywords to help with matching (optional but recommended)
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Camera className="w-4 h-4 inline mr-1" />
                Photos *
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Upload Photos
                  </p>
                  <p className="text-sm text-gray-500">
                    Click to select multiple images or drag and drop
                  </p>
                </label>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 px-6 py-3 text-white rounded-lg font-medium transition-all duration-200 ${
                  reportType === 'lost'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  `Report ${reportType === 'lost' ? 'Lost' : 'Found'} Item`
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-blue-50 rounded-xl p-6"
        >
          <h3 className="font-semibold text-blue-900 mb-4">💡 Tips for Better Results</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Take clear, well-lit photos from multiple angles</li>
            <li>• Include distinctive features, scratches, or unique markings</li>
            <li>• Be as specific as possible in your description</li>
            <li>• Add relevant tags to improve matching accuracy</li>
            <li>• Check back regularly for potential matches</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportPage;