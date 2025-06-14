
import React from 'react';
import { Sparkles } from 'lucide-react';

interface UpSparkLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const UpSparkLogo = ({ size = 'medium', className = '' }: UpSparkLogoProps) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-5xl'
  };

  const iconSizes = {
    small: 'w-5 h-5',
    medium: 'w-7 h-7',
    large: 'w-10 h-10'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-3">
        {/* Simple spark icon */}
        <Sparkles className={`text-yellow-400 ${iconSizes[size]}`} />
        
        {/* Simple text */}
        <div className={`font-bold text-white ${sizeClasses[size]}`}>
          UpSpark
        </div>
        
        {/* Another spark */}
        <Sparkles className={`text-pink-300 ${iconSizes[size]}`} />
      </div>
    </div>
  );
};

export default UpSparkLogo;
