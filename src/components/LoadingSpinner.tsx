import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading Data...</p>
        <p className="text-gray-400 text-sm mt-2">Fetching voltage analytics</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;