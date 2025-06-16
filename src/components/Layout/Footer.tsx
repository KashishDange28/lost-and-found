import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">KKW Lost & Found</h3>
                <p className="text-sm text-gray-400">K.K. Wagh Institute</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting students with their lost belongings through technology and community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-gray-400 hover:text-white transition-colors">
                  Report Item
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  K.K. Wagh Institute, Nashik, Maharashtra
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">+91 253 2511101</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">lostandfound@kkwagh.edu.in</span>
              </li>
            </ul>
          </div>

          {/* Tips */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tips & Guidelines</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Take clear photos of found items</li>
              <li>• Include detailed descriptions</li>
              <li>• Check regularly for matches</li>
              <li>• Contact security for valuable items</li>
              <li>• Be honest in your reports</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 K.K. Wagh Institute of Engineering Education and Research. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;