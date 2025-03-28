import React from 'react';
import { cn } from '../lib/utils';

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ 
  className,
  children
}) => {
  return (
    <div className="relative overflow-hidden">
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift",
          className
        )} 
        style={{ 
          backgroundSize: '200% 200%',
          filter: 'blur(100px)',
          opacity: 0.6
        }}
      />
      {children}
    </div>
  );
};

export default AnimatedGradient;