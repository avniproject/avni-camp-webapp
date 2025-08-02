import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

const AppContent = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Dashboard /> : <LoginScreen />;
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;