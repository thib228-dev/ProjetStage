// src/hooks/useAuth.js - NOUVEAU FICHIER À CRÉER
"use client";

import { useState, useEffect, useContext, createContext } from 'react';
import authAPI from '@/services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('access');
            if (token) {
                try {
                    const userData = await authAPI.getProfile();
                    setUser(userData.user);
                } catch (error) {
                    localStorage.clear();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (username, password) => {
        const data = await authAPI.login(username, password);
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        await authAPI.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
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