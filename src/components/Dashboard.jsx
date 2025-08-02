import React, { useState } from 'react';
import Header from './Header';
import SyncControlPanel from './SyncControlPanel';
import StatisticsCards from './StatisticsCards';
import SyncLogs from './SyncLogs';

const Dashboard = () => {
    const [syncStatus, setSyncStatus] = useState('idle'); // idle, running, success, error
    const [lastSync, setLastSync] = useState(null);
    const [syncProgress, setSyncProgress] = useState(0);
    const [syncLogs, setSyncLogs] = useState([]);

    // Mock sync data - replace with actual API calls
    const mockSyncData = {
        totalRecords: 1250,
        syncedRecords: 875,
        failedRecords: 12,
        lastSyncTime: '2024-08-02T10:30:00Z'
    };

    const handleSync = async () => {
        setSyncStatus('running');
        setSyncProgress(0);

        // TODO: Replace with actual sync API call
        // Simulate sync progress
        const interval = setInterval(() => {
            setSyncProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setSyncStatus('success');
                    setLastSync(new Date().toISOString());
                    setSyncLogs(prev => [
                        { timestamp: new Date().toISOString(), message: 'Sync completed successfully', type: 'success' },
                        ...prev.slice(0, 9)
                    ]);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

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
                        syncData={mockSyncData}
                        lastSync={lastSync}
                    />

                    <SyncLogs logs={syncLogs} />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;