import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const SyncLogs = ({ logs }) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Sync Activity</h3>
            </div>
            <ul className="divide-y divide-gray-200">
                {logs.length === 0 ? (
                    <li className="px-6 py-4">
                        <p className="text-sm text-gray-500">No sync activity yet</p>
                    </li>
                ) : (
                    logs.map((log, index) => (
                        <li key={index} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {log.type === 'success' ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-500 mr-3" />
                                    )}
                                    <p className="text-sm text-gray-900">{log.message}</p>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {new Date(log.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default SyncLogs;