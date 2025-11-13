import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { UserDocument, SavedService } from '../types';

interface User {
  email: string;
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
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// В реальном приложении здесь был бы API call. Мы симулируем базу данных.
const MOCK_USER_DB_KEY = 'mockUserDatabase';
const MOCK_DOCS_PREFIX = 'mockUserDocs_';

const getMockUsers = (): Map<string, string> => {
    try {
        const users = localStorage.getItem(MOCK_USER_DB_KEY);
        return users ? new Map(JSON.parse(users)) : new Map();
    } catch {
        return new Map();
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
            if (users.has(email) && users.get(email) === pass) {
                const loggedInUser = { email };
                setUser(loggedInUser);
                setIsAuthenticated(true);
                localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
                setDocuments(getMockDocs(email)); // Load user documents
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
            if (users.has(email)) {
                reject(new Error('Пользователь с таким email уже существует.'));
            } else {
                users.set(email, pass);
                saveMockUsers(users);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};