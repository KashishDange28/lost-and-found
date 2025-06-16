import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item, Match, Notification, Stats } from '../types';
import { useAuth } from './AuthContext';

interface DataContextType {
  items: Item[];
  matches: Match[];
  notifications: Notification[];
  stats: Stats;
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  searchItems: (query: string, filters?: any) => Item[];
  findMatches: (itemId: string) => Match[];
  markNotificationRead: (id: string) => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data initialization
  useEffect(() => {
    const mockItems: Item[] = [
      {
        id: '1',
        title: 'iPhone 13 Pro',
        description: 'Space Gray iPhone 13 Pro with a cracked screen protector',
        category: 'Electronics',
        location: 'Computer Lab A',
        date: new Date('2024-01-15'),
        images: ['https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=300'],
        status: 'approved',
        type: 'lost',
        userId: 'student-1',
        userName: 'John Doe',
        userEmail: 'john@kkwagh.edu.in',
        userPhone: '+91 9876543210',
        tags: ['iphone', 'phone', 'mobile', 'apple', 'electronics'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Blue Water Bottle',
        description: 'Stainless steel blue water bottle with KKW logo',
        category: 'Personal Items',
        location: 'Library',
        date: new Date('2024-01-16'),
        images: ['https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=300'],
        status: 'approved',
        type: 'found',
        userId: 'student-2',
        userName: 'Jane Smith',
        userEmail: 'jane@kkwagh.edu.in',
        tags: ['water', 'bottle', 'blue', 'steel', 'kkw'],
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16'),
      },
      {
        id: '3',
        title: 'Engineering Notebook',
        description: 'Red cover notebook with engineering drawings and formulas',
        category: 'Academic',
        location: 'Mechanical Workshop',
        date: new Date('2024-01-17'),
        images: ['https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=300'],
        status: 'matched',
        type: 'lost',
        userId: 'student-3',
        userName: 'Mike Johnson',
        userEmail: 'mike@kkwagh.edu.in',
        tags: ['notebook', 'engineering', 'red', 'drawings', 'academic'],
        matchedItemId: '4',
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-18'),
      },
    ];

    setItems(mockItems);
    setLoading(false);
  }, []);

  const stats: Stats = {
    totalItems: items.length,
    totalLost: items.filter(item => item.type === 'lost').length,
    totalFound: items.filter(item => item.type === 'found').length,
    totalMatched: items.filter(item => item.status === 'matched').length,
    totalClaimed: items.filter(item => item.status === 'claimed').length,
    thisMonth: items.filter(item => {
      const now = new Date();
      const itemDate = new Date(item.createdAt);
      return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
    }).length,
    successRate: Math.round((items.filter(item => item.status === 'matched' || item.status === 'claimed').length / items.length) * 100) || 0,
  };

  const addItem = (itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: Item = {
      ...itemData,
      id: `item-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setItems(prev => [...prev, newItem]);
    
    // Find potential matches
    setTimeout(() => {
      findPotentialMatches(newItem);
    }, 1000);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const searchItems = (query: string, filters?: any): Item[] => {
    if (!query.trim() && !filters) return items;

    return items.filter(item => {
      const matchesQuery = !query.trim() || 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        item.location.toLowerCase().includes(query.toLowerCase());

      const matchesFilters = !filters || (
        (!filters.type || item.type === filters.type) &&
        (!filters.category || item.category === filters.category) &&
        (!filters.location || item.location === filters.location) &&
        (!filters.status || item.status === filters.status)
      );

      return matchesQuery && matchesFilters;
    });
  };

  const findMatches = (itemId: string): Match[] => {
    return matches.filter(match => 
      match.lostItemId === itemId || match.foundItemId === itemId
    );
  };

  const findPotentialMatches = (newItem: Item) => {
    const oppositeType = newItem.type === 'lost' ? 'found' : 'lost';
    const potentialMatches = items.filter(item => 
      item.type === oppositeType && 
      item.status === 'approved' && 
      item.id !== newItem.id
    );

    potentialMatches.forEach(item => {
      const matchedKeywords = newItem.tags.filter(tag => 
        item.tags.includes(tag) || 
        item.title.toLowerCase().includes(tag.toLowerCase()) ||
        item.description.toLowerCase().includes(tag.toLowerCase())
      );

      if (matchedKeywords.length > 0) {
        const confidence = Math.min((matchedKeywords.length / newItem.tags.length) * 100, 95);
        
        const match: Match = {
          id: `match-${Date.now()}-${Math.random()}`,
          lostItemId: newItem.type === 'lost' ? newItem.id : item.id,
          foundItemId: newItem.type === 'found' ? newItem.id : item.id,
          confidence,
          matchedKeywords,
          createdAt: new Date(),
          status: 'pending',
        };

        setMatches(prev => [...prev, match]);

        // Create notifications for both users
        if (user) {
          const notification: Notification = {
            id: `notif-${Date.now()}`,
            userId: newItem.userId,
            title: 'Potential Match Found!',
            message: `We found a potential match for "${newItem.title}". Check your dashboard for details.`,
            type: 'match',
            read: false,
            createdAt: new Date(),
          };
          setNotifications(prev => [...prev, notification]);
        }
      }
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  return (
    <DataContext.Provider value={{
      items,
      matches,
      notifications,
      stats,
      addItem,
      updateItem,
      deleteItem,
      searchItems,
      findMatches,
      markNotificationRead,
      loading,
    }}>
      {children}
    </DataContext.Provider>
  );
};