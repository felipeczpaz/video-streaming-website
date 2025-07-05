// Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-14 h-14 border-8 border-t-8 border-red-500 border-t-transparent rounded-full animate-spin-fast"></div>
    </div>
  );
};

export default Spinner;
