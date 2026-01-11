import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { UserDocument, SavedService, UserProfile } from '../types';

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
  userProfile: UserProfile | null;
  authState: AuthState;
  documents: UserDocument[];
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  register: (email: string, pass: string) => Promise<void>;
  showAuthModal: (view?: 'login' | 'register') => void;
  hideAuthModal: () => void;
  saveCalculation: (data: CalculationData) => void;
  deleteCurrentUserDocument: (docId: string) => void;
  updateUserProfile: (profile: UserProfile) => Promise<void>;
  getAllUsers: () => User[];
  getUserDocuments: (email: string) => UserDocument[];
  deleteUserDocument: (userEmail: string, docId: string) => void;
  addUserDocument: (userEmail: string, docType: 'Договор' | 'Протокол' | 'Отчет', file?: { name: string, content: string }) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_DB_KEY = 'mockUserDatabase';
const MOCK_DOCS_PREFIX = 'mockUserDocs_';
const MOCK_PROFILE_PREFIX = 'mockUserProfile_';

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

const getMockProfile = (email: string): UserProfile => {
    try {
        const profile = localStorage.getItem(`${MOCK_PROFILE_PREFIX}${email}`);
        return profile ? JSON.parse(profile) : { firstName: '', lastName: '', phone: '', company: '', position: '' };
    } catch {
        return { firstName: '', lastName: '', phone: '', company: '', position: '' };
    }
}

const saveMockProfile = (email: string, profile: UserProfile) => {
    localStorage.setItem(`${MOCK_PROFILE_PREFIX}${email}`, JSON.stringify(profile));
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authState, setAuthState] = useState<AuthState>({ isModalOpen: false, defaultView: 'login' });
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [usersDB, setUsersDB] = useState<Map<string, string>>(getMockUsers());

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setDocuments(getMockDocs(parsedUser.email));
        setUserProfile(getMockProfile(parsedUser.email));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getMockUsers();
            const lowerCaseEmail = email.toLowerCase().trim();
            const storedPass = users.get(lowerCaseEmail);
            
            if ((storedPass && storedPass === pass) || (lowerCaseEmail === 'admin@test.com' && pass === 'admin')) {
                const isAdmin = lowerCaseEmail === 'admin@test.com';
                const loggedInUser: User = { email: lowerCaseEmail, role: isAdmin ? 'admin' : 'user' };
                
                setUser(loggedInUser);
                setIsAuthenticated(true);
                localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
                
                setDocuments(getMockDocs(lowerCaseEmail));
                setUserProfile(getMockProfile(lowerCaseEmail));
                
                hideAuthModal();
                resolve();
            } else {
                reject(new Error('Неверный email или пароль.'));
            }
        }, 300);
     });
  };

  const register = async (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getMockUsers();
            const lowerEmail = email.toLowerCase().trim();
            if (users.has(lowerEmail)) {
                reject(new Error('Пользователь с таким email уже существует.'));
            } else {
                users.set(lowerEmail, pass);
                saveMockUsers(users);
                setUsersDB(new Map(users));
                
                const newUser: User = { email: lowerEmail, role: 'user' };
                setUser(newUser);
                setIsAuthenticated(true);
                localStorage.setItem('currentUser', JSON.stringify(newUser));
                
                const initialProfile = { firstName: '', lastName: '', phone: '', company: '', position: '' };
                setUserProfile(initialProfile);
                setDocuments([]);
                
                resolve();
            }
        }, 300);
    });
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
    setIsAuthenticated(false);
    setDocuments([]); 
    localStorage.removeItem('currentUser');
  };

  const updateUserProfile = async (profile: UserProfile): Promise<void> => {
      return new Promise((resolve) => {
          if (!user) return;
          setTimeout(() => {
            setUserProfile(profile);
            saveMockProfile(user.email, profile);
            resolve();
          }, 200);
      });
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
    const updatedDocs = documents.filter(d => d.id !== docId);
    setDocuments(updatedDocs);
    saveMockDocs(user.email, updatedDocs);
  };

  const getAllUsers = (): User[] => {
    return Array.from(usersDB.keys()).map((email: string) => ({
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

  const addUserDocument = (userEmail: string, docType: 'Договор' | 'Протокол' | 'Отчет', file?: { name: string, content: string }) => {
      const currentDocs = getMockDocs(userEmail);
      let idPrefix = docType === 'Договор' ? 'agr' : docType === 'Протокол' ? 'prt' : 'rep';
      const fileName = file ? file.name : `mock-${docType}.pdf`;

      const newDoc: UserDocument = {
          id: `${idPrefix}-${Date.now()}`,
          date: new Date().toLocaleDateString('ru-RU'),
          type: docType,
          fileName: fileName,
          fileUrl: file?.content,
      };
      const updatedDocs = [newDoc, ...currentDocs];
      saveMockDocs(userEmail, updatedDocs);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated, user, userProfile, authState, documents,
      login, logout, register, showAuthModal, hideAuthModal,
      saveCalculation, deleteCurrentUserDocument, updateUserProfile,
      getAllUsers, getUserDocuments, deleteUserDocument, addUserDocument,
    }}>
      {children}
    </AuthContext.Provider>
  );
};