import React from 'react';
import { Badge } from './ui/badge';
import { getContrastingTextColor } from '../utils/colorUtils';
import { Card } from './ui/card';
import { ExtractedColor,ColorInfo, BrandColor,} from '../types/types';

interface ColorCardProps {
  color: ColorInfo | BrandColor | ExtractedColor;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ColorCard: React.FC<ColorCardProps> = ({ 
  color, 
  showPercentage = false, 
  size = 'md', 
  className = '' 
}) => {
  const textColor = getContrastingTextColor(color);
  const isExtractedColor = 'percentage' in color;
  const isBrandColor = 'name' in color;
  
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };
  
  return (
    <Card 
      className={`overflow-hidden rounded-lg transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div 
        className={`${sizeClasses[size]} flex flex-col justify-between p-3`}
        style={{ 
          backgroundColor: color.hex,
          color: textColor
        }}
      >
        <div className="flex justify-between items-start">
          {isBrandColor && (
            <span className="text-xs font-medium opacity-90">
              {(color as BrandColor).name}
            </span>
          )}
          
          {showPercentage && isExtractedColor && (
            <Badge 
              variant="outline" 
              className="ml-auto bg-white/20 backdrop-blur-sm text-xs"
            >
              {(color as ExtractedColor).percentage}%
            </Badge>
          )}
        </div>
        
        <div className="text-xs font-mono mt-auto">
          {color.hex}
        </div>
      </div>
    </Card>
  );
};

export default ColorCard;