
import React from 'react';
import { Sparkles } from 'lucide-react';

interface UpSparkLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const UpSparkLogo = ({ size = 'medium', className = '' }: UpSparkLogoProps) => {
  const sizeClasses = {
    small: 'text-lg sm:text-xl',
    medium: 'text-2xl sm:text-3xl',
    large: 'text-4xl sm:text-5xl'
  };

  const iconSizes = {
    small: 'w-4 h-4 sm:w-5 sm:h-5',
    medium: 'w-6 h-6 sm:w-7 sm:h-7',
    large: 'w-8 h-8 sm:w-10 sm:h-10'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Simple spark icon */}
        <Sparkles className={`text-yellow-400 ${iconSizes[size]}`} />
        
        {/* Simple text */}
        <div className={`font-black text-white ${sizeClasses[size]}`}>
          UpSpark
        </div>
        
        {/* Another spark */}
        <Sparkles className={`text-pink-300 ${iconSizes[size]}`} />
      </div>
    </div>
  );
};

export default UpSparkLogo;
