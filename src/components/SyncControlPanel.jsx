import React from 'react';
import { CheckCircle, XCircle, Clock, Play, RefreshCw } from 'lucide-react';

const SyncControlPanel = ({ syncStatus, syncProgress, onSync }) => {
    const getSyncStatusIcon = () => {
        switch (syncStatus) {
            case 'running':
                return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'error':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    const getSyncStatusText = () => {
        switch (syncStatus) {
            case 'running':
                return 'Synchronizing...';
            case 'success':
                return 'Last sync successful';
            case 'error':
                return 'Last sync failed';
            default:
                return 'Ready to sync';
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Sync Control</h2>
            </div>
            <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        {getSyncStatusIcon()}
                        <span className="ml-2 text-sm font-medium text-gray-900">
              {getSyncStatusText()}
            </span>
                    </div>
                    <button
                        onClick={onSync}
                        disabled={syncStatus === 'running'}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Play className="h-4 w-4 mr-2" />
                        {syncStatus === 'running' ? 'Syncing...' : 'Start Sync'}
                    </button>
                </div>

                {syncStatus === 'running' && (
                    <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{syncProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${syncProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SyncControlPanel;