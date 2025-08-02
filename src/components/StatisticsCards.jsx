import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const StatisticsCards = ({ syncData, lastSync }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">T</span>
                            </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Records</dt>
                                <dd className="text-lg font-medium text-gray-900">{syncData.totalRecords.toLocaleString()}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Synced</dt>
                                <dd className="text-lg font-medium text-gray-900">{syncData.syncedRecords.toLocaleString()}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <XCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Failed</dt>
                                <dd className="text-lg font-medium text-gray-900">{syncData.failedRecords}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Clock className="w-8 h-8 text-gray-500" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Last Sync</dt>
                                <dd className="text-lg font-medium text-gray-900">
                                    {lastSync ? new Date(lastSync).toLocaleTimeString() : 'Never'}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCards;