import React from 'react';
import { RefreshCw, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <RefreshCw className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-xl font-semibold text-gray-900">Avni - Camp Console</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Welcome, {user.username}</span>
                        <button
                            onClick={logout}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;