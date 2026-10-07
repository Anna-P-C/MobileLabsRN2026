import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'expo-router';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const login = () => {
        setIsAuthenticated(true);
        router.replace('/(drawer)/(news)');
    };

    const logout = () => {
        setIsAuthenticated(false);
        router.replace('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}