import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorCardProps {
  message: string;
  onRetry?: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
          <h2 className="text-xl font-semibold text-red-700">Connection Error</h2>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            Make sure your Flask backend is running on http://127.0.0.1:5000
          </p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Connection
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorCard;