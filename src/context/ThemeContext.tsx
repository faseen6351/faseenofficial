import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModeType = 'professional' | 'personal';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  cardBg: string;
  cardBorder: string;
  buttonGradient: string;
  textAccent: string;
}

interface ThemeContextType {
  mode: ModeType;
  toggleMode: () => void;
  isProfessional: boolean;
  isPersonal: boolean;
  colors: ThemeColors;
}

const professionalColors: ThemeColors = {
  primary: 'from-primary-900 via-primary-800 to-primary-900',
  secondary: 'from-accent-400 to-emerald-400',
  accent: 'accent-400',
  gradient: 'from-accent-400/20 to-emerald-400/20',
  cardBg: 'bg-white/10',
  cardBorder: 'border-white/20',
  buttonGradient: 'from-accent-500 to-accent-600',
  textAccent: 'text-accent-400',
};

const personalColors: ThemeColors = {
  primary: 'from-rose-950 via-pink-900 to-purple-950',
  secondary: 'from-pink-400 to-rose-400',
  accent: 'pink-400',
  gradient: 'from-pink-400/20 to-rose-400/20',
  cardBg: 'bg-pink-50/10',
  cardBorder: 'border-pink-300/20',
  buttonGradient: 'from-pink-500 to-rose-500',
  textAccent: 'text-pink-400',
};

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
    colors: mode === 'professional' ? professionalColors : personalColors,
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
