import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AuthPage from './pages/Auth/AuthPage';
import Dashboard from './pages/Dashboard/Dashboard';
import BrowsePage from './pages/Browse/BrowsePage';
import ReportPage from './pages/Report/ReportPage';
import MyReportsPage from './pages/MyReports/MyReportsPage';
import QRScannerPage from './pages/QRScanner/QRScannerPage';
import NotificationsPage from './pages/Notifications/NotificationsPage';
import ProfilePage from './pages/Profile/ProfilePage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// App Layout Component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Main App Component
const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <Routes>
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/browse" 
          element={
            <ProtectedRoute>
              <BrowsePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/report" 
          element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-reports" 
          element={
            <ProtectedRoute>
              <MyReportsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/qr-scanner" 
          element={
            <ProtectedRoute>
              <QRScannerPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h1>
                  <p className="text-gray-600">This page is under construction</p>
                </div>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />
          } 
        />
      </Routes>
    </AppLayout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;