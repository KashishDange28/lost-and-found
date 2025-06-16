export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
  studentId?: string;
  department?: string;
  year?: number;
  phone?: string;
  createdAt: Date;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: Date;
  images: string[];
  status: 'pending' | 'approved' | 'matched' | 'claimed' | 'rejected';
  type: 'lost' | 'found';
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  tags: string[];
  qrCode?: string;
  matchedItemId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Match {
  id: string;
  lostItemId: string;
  foundItemId: string;
  confidence: number;
  matchedKeywords: string[];
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'rejected';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'match' | 'status' | 'admin';
  read: boolean;
  createdAt: Date;
}

export interface Stats {
  totalItems: number;
  totalLost: number;
  totalFound: number;
  totalMatched: number;
  totalClaimed: number;
  thisMonth: number;
  successRate: number;
}