
import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface UpSparkLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const UpSparkLogo = ({ size = 'medium', className = '' }: UpSparkLogoProps) => {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  };

  const iconSizes = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative flex items-center">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
        
        {/* Main logo container */}
        <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-3 shadow-xl">
          <div className="flex items-center space-x-2">
            {/* Up arrow with spark */}
            <div className="relative">
              <div className="bg-white bg-opacity-20 rounded-lg p-2">
                <div className="text-white font-bold text-lg">↗</div>
              </div>
              <Sparkles className={`absolute -top-1 -right-1 text-yellow-300 ${iconSizes[size]} animate-bounce`} />
            </div>
            
            {/* Text */}
            <div className="text-white">
              <div className={`font-bold bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent ${sizeClasses[size]}`}>
                UpSpark
              </div>
            </div>
            
            {/* Lightning bolt */}
            <Zap className={`text-yellow-300 ${iconSizes[size]} animate-pulse`} />
          </div>
        </div>
        
        {/* Floating spark elements */}
        <Sparkles className="absolute -top-2 left-1/4 w-4 h-4 text-yellow-400 animate-ping" />
        <Sparkles className="absolute -bottom-2 right-1/4 w-3 h-3 text-pink-400 animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

export default UpSparkLogo;
