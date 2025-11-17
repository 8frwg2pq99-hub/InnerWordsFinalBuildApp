
"use client";

import { useState, useEffect } from "react";

export interface TurnData {
  from: string;
  to: string;
  sequence: string;
  type: "INNER" | "EDGE";
  points: number;
  sequencePoints: number;
  lengthBonus: number;
  totalScore: number;
}

interface TurnLogProps {
  turns: TurnData[];
}

function TurnLogItem({ turn, isNew }: { turn: TurnData; isNew?: boolean }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);

  useEffect(() => {
    if (isNew) {
      // Trigger entry animation
      setTimeout(() => setShowAnimation(true), 100);
      // Trigger score animation
      setTimeout(() => setShowScoreAnimation(true), 300);
      
      // Clear animations
      setTimeout(() => {
        setShowAnimation(false);
        setShowScoreAnimation(false);
      }, 2000);
    }
  }, [isNew]);

  const sequenceTypeColor = turn.type === "INNER" 
    ? "bg-green-900/30 text-green-300 border-green-700" 
    : "bg-yellow-900/30 text-yellow-300 border-yellow-700";

  const getItemStyles = () => {
    let baseStyles = "bg-card border border-card-border rounded-lg p-3 mb-2 transition-all duration-500 ";
    
    if (isNew && showAnimation) {
      baseStyles += turn.type === "INNER" 
        ? "celebration-inner animate-bounce-success " 
        : "celebration-edge animate-pulse-celebration ";
    }
    
    return baseStyles;
  };

  const getSequenceBadgeStyles = () => {
    let baseStyles = `px-2 py-1 rounded text-xs border transition-all duration-300 ${sequenceTypeColor} `;
    
    if (isNew && showAnimation) {
      baseStyles += "animate-glow-pulse ";
    }
    
    return baseStyles;
  };

  return (
    <div className={getItemStyles()}>
      {/* Sparkle effects for INNER sequences */}
      {isNew && showAnimation && turn.type === "INNER" && (
        <>
          <div className="sparkle-effect animate-sparkle"></div>
          <div className="sparkle-effect animate-sparkle"></div>
          <div className="sparkle-effect animate-sparkle"></div>
          <div className="sparkle-effect animate-sparkle"></div>
        </>
      )}
      
      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-4 sm:gap-3 items-start sm:items-center relative">
        <div className="text-xs sm:text-sm sm:col-span-2 min-w-0 w-full">
          <div className="break-words overflow-wrap-anywhere">
            <span className="text-muted-foreground">{turn.from}</span>
            <span className="mx-1 sm:mx-2 text-muted-foreground">→</span>
            <span className="font-medium">{turn.to}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:col-span-1 sm:justify-center flex-shrink-0">
          <span className={getSequenceBadgeStyles()}>
            {turn.type} "{turn.sequence}"
          </span>
        </div>
        
        <div className="text-left sm:text-right relative sm:col-span-1 flex-shrink-0">
          <span className={`font-bold text-primary transition-all duration-300 ${
            isNew && showScoreAnimation ? 'text-base sm:text-lg animate-bounce-success' : 'text-sm sm:text-base'
          }`}>
            +{turn.points}
          </span>
          {turn.lengthBonus > 0 && (
            <span className="text-[10px] sm:text-xs text-muted-foreground ml-1">
              (+{turn.lengthBonus} bonus)
            </span>
          )}
          
          {/* Flying score animation */}
          {isNew && showScoreAnimation && (
            <div className="absolute -top-6 sm:-top-8 right-0 text-lg sm:text-2xl font-bold text-primary animate-score-fly pointer-events-none">
              +{turn.points}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TurnLog({ turns }: TurnLogProps) {
  if (turns.length === 0) {
    return (
      <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-border">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Turn History</h3>
        <p className="text-muted-foreground text-xs sm:text-sm text-center py-3 sm:py-4">
          No moves yet. Start playing to see your turn history!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-border">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Turn History</h3>
      <div className="max-h-64 sm:max-h-80 overflow-y-auto">
        {turns.map((turn, index) => (
          <TurnLogItem 
            key={`${turn.from}-${turn.to}-${index}`} 
            turn={turn} 
            isNew={index === 0} // Most recent turn is always first
          />
        ))}
      </div>
    </div>
  );
}




