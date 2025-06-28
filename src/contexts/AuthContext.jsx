import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo purposes
const mockUsers = [
  {
    id: 1,
    email: 'admin@cfg-pradan.org',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    village: 'Headquarters',
    phone: '+91-9876543210'
  },
  {
    id: 2,
    email: 'field@cfg-pradan.org',
    password: 'field123',
    role: 'fieldOfficer',
    name: 'Priya Sharma',
    village: 'Rampur',
    phone: '+91-9876543211'
  },
  {
    id: 3,
    email: 'shg@cfg-pradan.org',
    password: 'shg123',
    role: 'shgWoman',
    name: 'Sunita Devi',
    village: 'Rampur',
    phone: '+91-9876543212'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const token = `mock-jwt-token-${foundUser.id}`;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
      
      setUser(userWithoutPassword);
      setIsLoading(false);
      return { success: true, user: userWithoutPassword };
    } else {
      setIsLoading(false);
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};