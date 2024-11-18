import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
      {children}
    </span>
  );
};