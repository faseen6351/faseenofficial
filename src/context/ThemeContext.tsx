import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModeType = 'professional' | 'personal';

interface ThemeContextType {
  mode: ModeType;
  toggleMode: () => void;
  isProfessional: boolean;
  isPersonal: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ModeType>('professional');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'professional' ? 'personal' : 'professional'));
  };

  const value = {
    mode,
    toggleMode,
    isProfessional: mode === 'professional',
    isPersonal: mode === 'personal',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
