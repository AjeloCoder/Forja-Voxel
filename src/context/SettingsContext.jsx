import React, { useMemo } from 'react';
import { SettingsContext } from './SettingsContextDefinition';

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
