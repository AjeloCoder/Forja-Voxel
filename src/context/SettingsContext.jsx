import React, { createContext, useContext, useMemo } from 'react';

const SettingsContext = createContext(null);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === null) {
    throw new Error('useSettings debe usarse dentro de un SettingsProvider');
  }
  return context;
};

export function SettingsProvider({ children }) {
  const value = useMemo(() => ({
    isPlaying: false,
    toggleMusic: () => {},
  }), []);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
