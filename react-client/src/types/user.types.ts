export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  avatar?: string;
  password?: string;
  currentPassword?: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: User | User[];
}


