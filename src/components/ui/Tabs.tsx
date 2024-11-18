import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => {
  return (
    <div className="w-full">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  value, 
  children, 
  className = '',
  ...props
}) => {
  const context = props as any;
  const isSelected = context.value === value;

  return (
    <button
      onClick={() => context.onValueChange?.(value)}
      className={`
        px-4 py-2 rounded-md text-sm font-medium transition-all
        ${isSelected 
          ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
          : 'text-gray-400 hover:text-indigo-400'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, ...props }) => {
  const context = props as any;
  const isSelected = context.value === value;

  if (!isSelected) return null;

  return <div>{children}</div>;
}