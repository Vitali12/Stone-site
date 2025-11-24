import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { UserDocument, SavedService } from '../types';

interface User {
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
    isModalOpen: boolean;
    defaultView: 'login' | 'register';
}

interface CalculationData {
    totalCost: number;
    services: SavedService[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  authState: AuthState;
  documents: UserDocument[];
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  register: (email: string, pass: string) => Promise<void>;
  showAuthModal: (view?: 'login' | 'register') => void;
  hideAuthModal: () => void;
  saveCalculation: (data: CalculationData) => void;
  deleteCurrentUserDocument: (docId: string) => void;
  // Admin functions
  getAllUsers: () => User[];
  getUserDocuments: (email: string) => UserDocument[];
  deleteUserDocument: (userEmail: string, docId: string) => void;
  addUserDocument: (userEmail: string, docType: 'Договор' | 'Протокол') => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// В реальном приложении здесь был бы API call. Мы симулируем базу данных.
const MOCK_USER_DB_KEY = 'mockUserDatabase';
const MOCK_DOCS_PREFIX = 'mockUserDocs_';

const getMockUsers = (): Map<string, string> => {
    try {
        const users = localStorage.getItem(MOCK_USER_DB_KEY);
        return users ? new Map(JSON.parse(users)) : new Map([['admin@test.com', 'admin']]);
    } catch {
        return new Map([['admin@test.com', 'admin']]);
    }
};

const saveMockUsers = (users: Map<string, string>) => {
    localStorage.setItem(MOCK_USER_DB_KEY, JSON.stringify(Array.from(users.entries())));
};

const getMockDocs = (email: string): UserDocument[] => {
    try {
        const docs = localStorage.getItem(`${MOCK_DOCS_PREFIX}${email}`);
        return docs ? JSON.parse(docs) : [];
    } catch {
        return [];
    }
}

const saveMockDocs = (email: string, docs: UserDocument[]) => {
    localStorage.setItem(`${MOCK_DOCS_PREFIX}${email}`, JSON.stringify(docs));
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>({ isModalOpen: false, defaultView: 'login' });
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [usersDB, setUsersDB] = useState<Map<string, string>>(getMockUsers());

  useEffect(() => {
    // Проверяем наличие "сессии" при загрузке приложения
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setDocuments(getMockDocs(parsedUser.email));
    }
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getMockUsers();
            const lowerCaseEmail = email.toLowerCase();
            
            if (users.has(lowerCaseEmail) && users.get(lowerCaseEmail) === pass || lowerCaseEmail === 'admin@test.com') {
                const isAdmin = lowerCaseEmail === 'admin@test.com';
                const loggedInUser: User = { email: lowerCaseEmail, role: isAdmin ? 'admin' : 'user' };
                setUser(loggedInUser);
                setIsAuthenticated(true);
                localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
                setDocuments(getMockDocs(lowerCaseEmail));
                hideAuthModal();
                resolve();
            } else {
                reject(new Error('Неверный email или пароль.'));
            }
        }, 500);
     });
  };

  const register = async (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getMockUsers();
            if (users.has(email.toLowerCase())) {
                reject(new Error('Пользователь с таким email уже существует.'));
            } else {
                users.set(email.toLowerCase(), pass);
                saveMockUsers(users);
                setUsersDB(new Map(users));
                resolve();
            }
        }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setDocuments([]); // Clear documents on logout
    localStorage.removeItem('currentUser');
  };

  const showAuthModal = (view: 'login' | 'register' = 'login') => {
    setAuthState({ isModalOpen: true, defaultView: view });
  };

  const hideAuthModal = () => {
    setAuthState({ isModalOpen: false, defaultView: 'login' });
  };
  
  const saveCalculation = (data: CalculationData) => {
    if (!user) throw new Error("Пользователь не авторизован");

    const newDocument: UserDocument = {
      id: `calc-${Date.now()}`,
      date: new Date().toLocaleDateString('ru-RU'),
      type: 'Расчет',
      totalCost: data.totalCost,
      services: data.services,
    };
    
    const updatedDocs = [newDocument, ...documents];
    setDocuments(updatedDocs);
    saveMockDocs(user.email, updatedDocs);
  };

  const deleteCurrentUserDocument = (docId: string) => {
    if (!user) return;
    const currentDocs = getMockDocs(user.email);
    const updatedDocs = currentDocs.filter(d => d.id !== docId);
    setDocuments(updatedDocs);
    saveMockDocs(user.email, updatedDocs);
  };

  // Admin Functions
  const getAllUsers = (): User[] => {
    // FIX: Explicitly type `email` as `any` to resolve incorrect type inference to `unknown`.
    // This allows calling `.toLowerCase()` and satisfies the `User` type requirement.
    return Array.from(usersDB.keys()).map((email: any) => ({
        email,
        role: email.toLowerCase() === 'admin@test.com' ? 'admin' : 'user',
    }));
  };

  const getUserDocuments = (email: string): UserDocument[] => {
      return getMockDocs(email);
  };

  const deleteUserDocument = (userEmail: string, docId: string) => {
      const currentDocs = getMockDocs(userEmail);
      const updatedDocs = currentDocs.filter(d => d.id !== docId);
      saveMockDocs(userEmail, updatedDocs);
  };

  const addUserDocument = (userEmail: string, docType: 'Договор' | 'Протокол') => {
      const currentDocs = getMockDocs(userEmail);
      const newDoc: UserDocument = {
          id: `${docType === 'Договор' ? 'agr' : 'prt'}-${Date.now()}`,
          date: new Date().toLocaleDateString('ru-RU'),
          type: docType,
          fileName: `mock-${docType === 'Договор' ? 'agreement' : 'protocol'}.pdf`,
      };
      const updatedDocs = [newDoc, ...currentDocs];
      saveMockDocs(userEmail, updatedDocs);
  };


  const value = {
    isAuthenticated,
    user,
    authState,
    documents,
    login,
    logout,
    register,
    showAuthModal,
    hideAuthModal,
    saveCalculation,
    deleteCurrentUserDocument,
    getAllUsers,
    getUserDocuments,
    deleteUserDocument,
    addUserDocument,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
