import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
}

interface AuthState {
    isModalOpen: boolean;
    defaultView: 'login' | 'register';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  authState: AuthState;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  register: (email: string, pass: string) => Promise<void>;
  showAuthModal: (view?: 'login' | 'register') => void;
  hideAuthModal: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// В реальном приложении здесь был бы API call. Мы симулируем базу данных.
const MOCK_USER_DB_KEY = 'mockUserDatabase';

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


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>({ isModalOpen: false, defaultView: 'login' });

  useEffect(() => {
    // Проверяем наличие "сессии" при загрузке приложения
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
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
    localStorage.removeItem('currentUser');
  };

  const showAuthModal = (view: 'login' | 'register' = 'login') => {
    setAuthState({ isModalOpen: true, defaultView: view });
  };

  const hideAuthModal = () => {
    setAuthState({ isModalOpen: false, defaultView: 'login' });
  };
  
  const value = {
    isAuthenticated,
    user,
    authState,
    login,
    logout,
    register,
    showAuthModal,
    hideAuthModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
