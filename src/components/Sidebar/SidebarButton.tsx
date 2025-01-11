import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarButtonProps {
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon: Icon,
  isActive,
  onClick,
  className = ''
}) => (
  <button 
    className={`p-3 rounded-lg transition-colors ${
      isActive ? 'bg-blue-500 text-white' : 'hover:bg-zinc-800'
    } ${className}`}
    onClick={onClick}
  >
    <Icon size={24} />
  </button>
);