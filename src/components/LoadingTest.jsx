import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoadingTest = () => {
  const [showTest, setShowTest] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowTest(!showTest)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        Test Loading
      </button>
      
      {showTest && (
        <div className="absolute bottom-12 right-0 bg-white p-4 rounded-lg shadow-lg border min-w-48">
          <h3 className="font-semibold text-gray-800 mb-2">Test Navigation</h3>
          <div className="space-y-2">
            <Link 
              to="/" 
              className="block text-blue-600 hover:text-blue-800 text-sm"
            >
              Home
            </Link>
            <Link 
              to="/layanan/pendirian-badan-usaha" 
              className="block text-blue-600 hover:text-blue-800 text-sm"
            >
              Pendirian Badan Usaha
            </Link>
            <Link 
              to="/datapemenuhanalat" 
              className="block text-blue-600 hover:text-blue-800 text-sm"
            >
              Data Pemenuhan Alat
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingTest;
