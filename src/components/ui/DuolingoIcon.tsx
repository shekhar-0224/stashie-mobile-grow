
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DuolingoIconProps {
  Icon: LucideIcon;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const DuolingoIcon = ({ 
  Icon, 
  color = '#10B981', 
  size = 'md',
  onClick,
  className = ''
}: DuolingoIconProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        boxShadow: `0 4px 15px ${color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
      }}
      onClick={onClick}
    >
      <Icon className={`${iconSizes[size]} text-white`} />
    </div>
  );
};

export default DuolingoIcon;
