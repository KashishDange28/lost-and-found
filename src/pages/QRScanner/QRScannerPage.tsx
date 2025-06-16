import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Camera, 
  Upload, 
  Scan,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

const QRScannerPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartScan = () => {
    setIsScanning(true);
    // In a real implementation, you would initialize the camera and QR scanner here
    // For demo purposes, we'll simulate a scan after 3 seconds
    setTimeout(() => {
      const mockData = {
        itemId: 'item-123',
        title: 'iPhone 13 Pro',
        type: 'lost',
        status: 'verified',
        location: 'Computer Lab A',
        reportedBy: 'John Doe',
        date: new Date().toISOString(),
      };
      setScannedData(JSON.stringify(mockData));
      setScanResult(mockData);
      setIsScanning(false);
      toast.success('QR Code scanned successfully!');
    }, 3000);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would process the image file to extract QR code
      toast.success('QR Code image uploaded successfully!');
      // Simulate processing
      setTimeout(() => {
        const mockData = {
          itemId: 'item-456',
          title: 'Blue Water Bottle',
          type: 'found',
          status: 'verified',
          location: 'Library',
          reportedBy: 'Jane Smith',
          date: new Date().toISOString(),
        };
        setScannedData(JSON.stringify(mockData));
        setScanResult(mockData);
      }, 2000);
    }
  };

  const handleClearResult = () => {
    setScannedData(null);
    setScanResult(null);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Scanner</h1>
          <p className="text-gray-600">
            Scan QR codes on items to verify their authenticity and get detailed information
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-blue-50 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start space-x-3">
            <Info className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">How QR Scanning Works</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Each verified item gets a unique QR code</li>
                <li>• Scan to view item details and verification status</li>
                <li>• Helps prevent fraud and ensures authenticity</li>
                <li>• Works with both camera scanning and image upload</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Scanner Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          {!scanResult ? (
            <div className="p-8">
              {/* Camera Scanner */}
              <div className="text-center mb-8">
                <div className="w-64 h-64 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                  {isScanning ? (
                    <div className="relative">
                      <div className="w-48 h-48 border-4 border-blue-600 rounded-lg relative">
                        <div className="absolute inset-0 bg-blue-600 bg-opacity-10 animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 animate-pulse"></div>
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-600"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-600"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-600"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-600"></div>
                      </div>
                      <p className="text-blue-600 font-medium mt-4">Scanning...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Camera preview will appear here</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {!isScanning ? (
                    <button
                      onClick={handleStartScan}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Start Camera Scan</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopScan}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      <span>Stop Scanning</span>
                    </button>
                  )}

                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload QR Image</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Scanning Instructions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Camera Scanning:</h4>
                    <ul className="space-y-1">
                      <li>• Allow camera permissions when prompted</li>
                      <li>• Hold the QR code steady in the frame</li>
                      <li>• Ensure good lighting for best results</li>
                      <li>• Keep the code within the scanning area</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Image Upload:</h4>
                    <ul className="space-y-1">
                      <li>• Take a clear photo of the QR code</li>
                      <li>• Ensure the entire code is visible</li>
                      <li>• Avoid blurry or distorted images</li>
                      <li>• Supported formats: JPG, PNG, GIF</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Scan Result */
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">QR Code Scanned Successfully!</h3>
                <p className="text-gray-600">Here are the item details:</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Item Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Item ID:</span>
                        <p className="text-gray-900">{scanResult.itemId}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Title:</span>
                        <p className="text-gray-900">{scanResult.title}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Type:</span>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                          scanResult.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {scanResult.type}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Status:</span>
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium ml-2 bg-green-100 text-green-800">
                          {scanResult.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Additional Details</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Location:</span>
                        <p className="text-gray-900">{scanResult.location}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Reported By:</span>
                        <p className="text-gray-900">{scanResult.reportedBy}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Date:</span>
                        <p className="text-gray-900">
                          {new Date(scanResult.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleClearResult}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Scan Another Code
                </button>
                <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                  View Full Details
                </button>
                <button className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200">
                  Contact Owner
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Raw Data (for debugging) */}
        {scannedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Raw QR Data</h3>
            <pre className="bg-gray-100 rounded-lg p-4 text-sm text-gray-800 overflow-x-auto">
              {JSON.stringify(JSON.parse(scannedData), null, 2)}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QRScannerPage;