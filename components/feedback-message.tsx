"use client";

import { useEffect, useState } from "react";

interface FeedbackMessageProps {
  message: string;
  type: "success" | "error" | "info";
}

export default function FeedbackMessage({ message, type }: FeedbackMessageProps) {
  const [animationClass, setAnimationClass] = useState("");
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (message) {
      // Reset animation
      setAnimationClass("");
      setShowSparkles(false);
      
      // Trigger animation based on type
      setTimeout(() => {
        if (type === "success") {
          setAnimationClass("animate-bounce-success");
          // Show sparkles for success messages containing "Inner"
          if (message.includes("Inner")) {
            setShowSparkles(true);
          }
        } else if (type === "error") {
          setAnimationClass("animate-shake-error");
        }
      }, 50);

      // Clear animation after it completes
      const timeout = setTimeout(() => {
        setAnimationClass("");
        setShowSparkles(false);
      }, type === "success" ? 1200 : 500);

      return () => clearTimeout(timeout);
    }
  }, [message, type]);

  if (!message) return <div className="min-h-[1.5rem]" />; // Prevent layout shift

  const getMessageStyles = () => {
    let baseStyles = "relative ";
    switch (type) {
      case "success":
        baseStyles += message.includes("Inner") 
          ? "text-green-400 celebration-inner" 
          : "text-green-400 celebration-edge";
        break;
      case "error":
        baseStyles += "text-red-400 bg-red-900/20 border border-red-700/50 rounded-lg px-4 py-2";
        break;
      default:
        baseStyles += "text-muted-foreground";
    }
    return baseStyles;
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return message.includes("Inner") ? "🎉 " : "✨ ";
      case "error":
        return "⚠️ ";
      default:
        return "";
    }
  };

  return (
    <div className={`text-xs sm:text-sm mt-3 sm:mt-4 text-center transition-all duration-300 px-2 sm:px-0 ${getMessageStyles()} ${animationClass}`}>
      {showSparkles && (
        <>
          <div className="sparkle-effect animate-sparkle"></div>
          <div className="sparkle-effect animate-sparkle"></div>
          <div className="sparkle-effect animate-sparkle"></div>
          <div className="sparkle-effect animate-sparkle"></div>
        </>
      )}
      <span className="relative z-10 leading-relaxed">
        {getIcon()}{message}
      </span>
    </div>
  );
}

