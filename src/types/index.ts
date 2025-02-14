export type UserRole = 'user' | 'agent' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  nid: string;
  pin: string;
  role: UserRole;
  balance: number;
  isBlocked?: boolean;
  isApproved?: boolean;
}

export interface Transaction {
  _id: string;
  transactionId: string;
  sender: string;
  receiver: string;
  amount: number;
  type: 'send-money' | 'cash-in' | 'cash-out';
  fee: number;
  timestamp: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
}
