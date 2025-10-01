import React from 'react';
import { useEffect, useState } from 'react';

const LoadingAnimation = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 300);
    }
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className={`fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 transition-opacity duration-300 ${
      isLoading ? 'opacity-100' : 'opacity-0'
    }`}>
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
      
      {/* Loading spinner overlay */}
      <div className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-40 flex items-center justify-center transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
          </div>
          
          {/* Loading text */}
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">Memuat halaman...</p>
            <p className="text-sm text-gray-600">Valpro Intertech</p>
          </div>
          
          {/* Progress bar */}
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
