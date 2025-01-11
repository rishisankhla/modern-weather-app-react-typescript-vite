import React from 'react';
import { LogOut } from 'lucide-react';
import { SidebarButton } from './SidebarButton';
import { ThemeToggle } from './ThemeToggle';

interface SettingsButtonsProps {
  onLogout: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export const SettingsButtons: React.FC<SettingsButtonsProps> = ({ 
  onLogout, 
  isDark,
  onThemeToggle 
}) => (
  <div className="flex flex-col items-center space-y-4">
    <SidebarButton
      icon={LogOut}
      isActive={false}
      onClick={onLogout}
      className="text-red-500 hover:bg-red-500/10"
    />
    <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
  </div>
);