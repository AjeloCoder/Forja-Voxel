import React, { createContext, useContext, useState, useRef, useEffect, useMemo } from 'react';
import titleMusic from '/audio/title-music.mp3'; // Asegúrate que está en public/audio

// 1. Crear el contexto
const SettingsContext = createContext(null);

// 2. Crear el hook para usarlo fácilmente
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === null) {
    throw new Error('useSettings debe usarse dentro de un SettingsProvider');
  }
  return context;
};

// 3. Crear el componente Provider que contiene toda la lógica
export function SettingsProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false); // Por defecto, no está sonando
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(titleMusic);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    // --- Lógica de Autoplay Inteligente ---
    const audio = audioRef.current;
    
    // Intentamos darle play
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Autoplay tuvo éxito, sincronizamos nuestro estado de React
        setIsPlaying(true);
      }).catch(error => {
        // Autoplay fue bloqueado. No pasa nada, lo dejamos en pausa
        // y el estado 'isPlaying' se queda en 'false'. El usuario usará el botón.
        console.log("Autoplay bloqueado. Esperando interacción del usuario.");
        setIsPlaying(false);
      });
    }

  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldPlay = !isPlaying;
    if (shouldPlay) {
      audio.play().catch(e => console.log("Navegador bloqueó autoplay, se necesita interacción."));
    } else {
      audio.pause();
    }
    setIsPlaying(shouldPlay);
  };
  
  // Usamos useMemo para optimizar el valor del contexto
  const value = useMemo(() => ({
    isPlaying,
    toggleMusic,
  }), [isPlaying]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}