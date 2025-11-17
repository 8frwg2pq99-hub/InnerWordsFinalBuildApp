"use client";

import { useEffect, useRef } from "react";

interface SoundEffectsProps {
  enabled?: boolean;
}

export default function SoundEffects({ enabled = false }: SoundEffectsProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (enabled && typeof window !== "undefined") {
      // Initialize Web Audio API
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.log("Web Audio API not supported");
      }
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [enabled]);

  const playTone = (frequency: number, duration: number, type: OscillatorType = "sine") => {
    if (!enabled || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration);
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  const playSuccessSound = () => {
    // Pleasant ascending chord
    playTone(523.25, 0.2); // C5
    setTimeout(() => playTone(659.25, 0.2), 100); // E5
    setTimeout(() => playTone(783.99, 0.3), 200); // G5
  };

  const playInnerSequenceSound = () => {
    // More dramatic success sound
    playTone(523.25, 0.15); // C5
    setTimeout(() => playTone(659.25, 0.15), 80); // E5
    setTimeout(() => playTone(783.99, 0.15), 160); // G5
    setTimeout(() => playTone(1046.50, 0.25), 240); // C6
  };

  const playErrorSound = () => {
    // Gentle descending tone
    playTone(400, 0.15, "triangle");
    setTimeout(() => playTone(300, 0.2, "triangle"), 100);
  };

  // Expose methods globally for other components to use
  useEffect(() => {
    if (enabled) {
      (window as any).gameSounds = {
        playSuccess: playSuccessSound,
        playInnerSequence: playInnerSequenceSound,
        playError: playErrorSound,
      };
    }

    return () => {
      if ((window as any).gameSounds) {
        delete (window as any).gameSounds;
      }
    };
  }, [enabled]);

  return null; // This component doesn't render anything
}

// Helper hook for other components
export function useGameSounds() {
  const playSuccess = () => {
    if ((window as any).gameSounds?.playSuccess) {
      (window as any).gameSounds.playSuccess();
    }
  };

  const playInnerSequence = () => {
    if ((window as any).gameSounds?.playInnerSequence) {
      (window as any).gameSounds.playInnerSequence();
    }
  };

  const playError = () => {
    if ((window as any).gameSounds?.playError) {
      (window as any).gameSounds.playError();
    }
  };

  return { playSuccess, playInnerSequence, playError };
}