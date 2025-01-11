import React from 'react';
import { Grid, Search } from 'lucide-react';
import { SidebarButton } from './SidebarButton';

type ActiveItem = 'dashboard' | 'search' | null;

interface NavigationButtonsProps {
  activeItem: ActiveItem;
  onItemClick: (item: ActiveItem) => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  activeItem,
  onItemClick
}) => (
  <div className="flex flex-col items-center space-y-8">
    <SidebarButton
      icon={Grid}
      isActive={activeItem === 'dashboard'}
      onClick={() => onItemClick('dashboard')}
    />
    <SidebarButton
      icon={Search}
      isActive={activeItem === 'search'}
      onClick={() => onItemClick('search')}
    />
  </div>
);