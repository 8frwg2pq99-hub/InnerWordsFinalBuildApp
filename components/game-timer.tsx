"use client";

import { useState, useEffect } from "react";

interface GameTimerProps {
  isActive: boolean;
  onTimeUp: () => void;
  duration: number; // in seconds
}

export default function GameTimer({ isActive, onTimeUp, duration }: GameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration);
      return;
    }

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (!isActive) return "text-muted-foreground";
    if (timeLeft <= 10) return "text-red-500";
    if (timeLeft <= 30) return "text-yellow-500";
    return "text-foreground";
  };

  return (
    <div className="text-center mb-3 sm:mb-4">
      <div className={`text-xl sm:text-2xl font-bold ${getTimerColor()}`}>
        {formatTime(timeLeft)}
      </div>
      {!isActive && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Timer starts when you make your first move
        </p>
      )}
    </div>
  );
}
