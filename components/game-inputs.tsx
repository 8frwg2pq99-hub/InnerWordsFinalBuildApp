



"use client";

import React, { useState, useEffect } from "react";

type Props = {
  newWord: string;
  onNewWordChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  lastSubmissionResult?: "success" | "error" | null;
  examples?: string;
  isTimerActive?: boolean;
};

export default function GameInputs({
  newWord,
  onNewWordChange,
  onSubmit,
  disabled,
  label = "Your Word",
  placeholder = "E.g. ARIA, ORDAIN",
  lastSubmissionResult,
  examples,
  isTimerActive = false,
}: Props) {
  const [inputAnimation, setInputAnimation] = useState("");
  const [buttonAnimation, setButtonAnimation] = useState("");

  useEffect(() => {
    if (lastSubmissionResult) {
      // Reset animations
      setInputAnimation("");
      setButtonAnimation("");
      
      setTimeout(() => {
        if (lastSubmissionResult === "success") {
          setInputAnimation("animate-bounce-success");
          setButtonAnimation("animate-pulse-celebration");
        } else if (lastSubmissionResult === "error") {
          setInputAnimation("animate-shake-error");
          setButtonAnimation("animate-shake-error");
        }
      }, 50);

      // Clear animations
      const timeout = setTimeout(() => {
        setInputAnimation("");
        setButtonAnimation("");
      }, lastSubmissionResult === "success" ? 800 : 500);

      return () => clearTimeout(timeout);
    }
  }, [lastSubmissionResult]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  const getInputStyles = () => {
    let baseStyles = "w-full border rounded-md px-3 py-3 sm:py-2 text-center tracking-[0.08em] bg-input text-foreground border-border focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 text-base sm:text-sm ";
    
    if (lastSubmissionResult === "success") {
      baseStyles += "border-green-500 focus:ring-green-500 ";
    } else if (lastSubmissionResult === "error") {
      baseStyles += "border-red-500 focus:ring-red-500 ";
    }
    
    return baseStyles + inputAnimation;
  };

  const getButtonStyles = () => {
    let baseStyles = "bg-primary text-primary-foreground font-semibold py-3 sm:py-2 px-4 rounded-md hover:opacity-90 disabled:opacity-50 w-full max-w-[380px] transition-all duration-200 text-base sm:text-sm ";
    
    if (newWord.trim().length > 0 && !disabled) {
      baseStyles += "animate-glow-pulse ";
    }
    
    return baseStyles + buttonAnimation;
  };

  return (
    <div className="mt-4 sm:mt-6 px-2 sm:px-0">
      {/* Hide label on mobile when timer is active */}
      <label className={`block mb-3 sm:mb-2 text-base sm:text-sm md:text-base font-medium text-foreground ${isTimerActive ? 'hidden sm:block' : ''}`}>
        {label}
      </label>

      <input
        className={getInputStyles()}
        value={newWord}
        onChange={(e) => onNewWordChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={isTimerActive ? "" : (examples || placeholder)}
        disabled={disabled}
        inputMode="text"
        autoCapitalize="characters"
        autoCorrect="off"
      />

      <div className="mt-4 flex justify-center">
        <button
          onClick={onSubmit}
          disabled={disabled || !newWord.trim()}
          className={getButtonStyles()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}








