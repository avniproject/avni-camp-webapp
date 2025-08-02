import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ApiClient from '../utils/apiClient';
import Header from './Header';
import SyncControlPanel from './SyncControlPanel';
import StatisticsCards from './StatisticsCards';
import SyncLogs from './SyncLogs';

const Dashboard = () => {
    const { isAuthenticated } = useAuth();
    const [syncStatus, setSyncStatus] = useState('idle'); // idle, running, success, error
    const [lastSync, setLastSync] = useState(null);
    const [syncProgress, setSyncProgress] = useState(0);
    const [syncLogs, setSyncLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncData, setSyncData] = useState({
        totalRecords: 0,
        syncedRecords: 0,
        failedRecords: 0,
        lastSyncTime: null
    });

    // Load initial sync status and statistics
    useEffect(() => {
        if (isAuthenticated) {
            loadInitialData();
        }
    }, [isAuthenticated]);

    const loadInitialData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                loadSyncStatus(),
                loadSyncStatistics(),
                loadSyncHistory()
            ]);
        } catch (error) {
            console.error('Failed to load initial data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadSyncStatus = async () => {
        try {
            const apiClient = new ApiClient();
            const status = await apiClient.getSyncStatus();
            
            if (status.syncInProgress) {
                setSyncStatus('running');
            } else if (status.lastSyncTime) {
                setSyncStatus('success');
                setLastSync(status.lastSyncTime);
            }
        } catch (error) {
            console.error('Failed to load sync status:', error);
        }
    };

    const loadSyncStatistics = async () => {
        try {
            const apiClient = new ApiClient();
            const stats = await apiClient.getSyncStatistics();
            
            setSyncData({
                totalRecords: stats.totalEntitiesSynced || 0,
                syncedRecords: stats.successfulSyncs || 0,
                failedRecords: stats.failedSyncs || 0,
                lastSyncTime: stats.lastSyncTime
            });
        } catch (error) {
            console.error('Failed to load sync statistics:', error);
        }
    };

    const loadSyncHistory = async () => {
        try {
            const apiClient = new ApiClient();
            const history = await apiClient.getSyncHistory(5);
            
            const logs = history.map(sync => ({
                timestamp: sync.syncStartTime || new Date().toISOString(),
                message: sync.syncStatus === 'COMPLETED' 
                    ? `Sync completed: ${sync.totalEntitiesPushed} pushed, ${sync.totalEntitiesPulled} pulled`
                    : `Sync ${sync.syncStatus.toLowerCase()}: ${sync.syncErrorMessage || 'Unknown error'}`,
                type: sync.syncStatus === 'COMPLETED' ? 'success' : 'error'
            }));
            
            setSyncLogs(logs);
        } catch (error) {
            console.error('Failed to load sync history:', error);
        }
    };

    const handleSync = async () => {
        if (!isAuthenticated) {
            setSyncLogs(prev => [
                { timestamp: new Date().toISOString(), message: 'Please log in to start sync', type: 'error' },
                ...prev.slice(0, 9)
            ]);
            return;
        }

        setSyncStatus('running');
        setSyncProgress(0);
        
        try {
            // Add initial log entry
            setSyncLogs(prev => [
                { timestamp: new Date().toISOString(), message: 'Starting sync operation...', type: 'info' },
                ...prev.slice(0, 9)
            ]);

            // Create API client - no auth token needed for local server
            const apiClient = new ApiClient();
            
            // Call sync API
            const result = await apiClient.startFullSync();
            
            // Simulate progress updates while sync is running
            // In a real implementation, you might use WebSocket or polling for real-time updates
            const interval = setInterval(() => {
                setSyncProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);

            // Wait for simulated progress to complete
            setTimeout(() => {
                clearInterval(interval);
                setSyncProgress(100);
                setSyncStatus('success');
                setLastSync(new Date().toISOString());
                
                setSyncLogs(prev => [
                    { 
                        timestamp: new Date().toISOString(), 
                        message: `Sync completed successfully. Duration: ${result.durationMillis || 0}ms, ` +
                                `Entities pushed: ${result.entitiesPushed || 0}, ` +
                                `Entities pulled: ${result.entitiesPulled || 0}`, 
                        type: 'success' 
                    },
                    ...prev.slice(0, 9)
                ]);

                // Reload statistics after successful sync
                loadSyncStatistics();
                loadSyncHistory();
            }, 3000);

        } catch (error) {
            console.error('Sync failed:', error);
            setSyncStatus('error');
            setSyncProgress(0);
            
            setSyncLogs(prev => [
                { 
                    timestamp: new Date().toISOString(), 
                    message: `Sync failed: ${error.message}`, 
                    type: 'error' 
                },
                ...prev.slice(0, 9)
            ]);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading sync dashboard...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <SyncControlPanel
                        syncStatus={syncStatus}
                        syncProgress={syncProgress}
                        onSync={handleSync}
                    />

                    <StatisticsCards
                        syncData={syncData}
                        lastSync={lastSync}
                    />

                    <SyncLogs logs={syncLogs} />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;