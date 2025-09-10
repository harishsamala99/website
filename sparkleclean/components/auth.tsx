
import React, { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import * as api from '../services/databaseService';
import type { AuthContextType, Password } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(() => sessionStorage.getItem('isAdmin') === 'true');
    const [passwords, setPasswords] = useState<Password[]>([]);

    useEffect(() => {
        const fetchPasswords = async () => {
            const fetchedPasswords = await api.getPasswords();
            setPasswords(fetchedPasswords);
        };
        fetchPasswords();
    }, []);

    const login = (password: string): boolean => {
        if (passwords.some(p => p.password === password)) {
            sessionStorage.setItem('isAdmin', 'true');
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem('isAdmin');
        setIsAdmin(false);
    };

    const addPassword = async (password: string): Promise<boolean> => {
        if (!password || passwords.some(p => p.password === password)) return false;

        const createdPw = await api.addPassword({ password });
        if (createdPw) {
            setPasswords(prev => [...prev, createdPw]);
            return true;
        }
        return false;
    };

    const deletePassword = async (id: number): Promise<boolean> => {
        if (passwords.length <= 1) return false;
        const success = await api.deletePassword(id);
        if (success) setPasswords(prev => prev.filter(p => p.id !== id));
        return success;
    };

    return (
        <AuthContext.Provider
            value={{
                isAdmin,
                passwords,
                login,
                logout,
                addPassword,
                deletePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export const ProtectedRoute = () => {
    const { isAdmin } = useAuth();
    const location = useLocation();

    if (!isAdmin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};
