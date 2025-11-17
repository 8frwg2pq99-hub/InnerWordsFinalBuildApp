



"use client";

import { useState, useEffect } from "react";
import { Trophy, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Leaderboard from "@/components/leaderboard";
import Link from "next/link";

interface GameHeaderProps {
  score: number;
  currentWord: string;
}

export default function GameHeader({ score, currentWord }: GameHeaderProps) {
  const [prevScore, setPrevScore] = useState(score);
  const [scoreAnimation, setScoreAnimation] = useState("");
  const [showScoreIncrease, setShowScoreIncrease] = useState(false);
  const [scoreIncrease, setScoreIncrease] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    if (score > prevScore && prevScore > 0) {
      const increase = score - prevScore;
      setScoreIncrease(increase);
      setShowScoreIncrease(true);
      setScoreAnimation("animate-bounce-success");
      
      // Clear animations
      setTimeout(() => {
        setScoreAnimation("");
        setShowScoreIncrease(false);
      }, 1500);
    }
    setPrevScore(score);
  }, [score, prevScore]);

  return (
    <>
      <header className="flex items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-8">
        <div className="flex flex-col flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent truncate">
            InnerWords
          </h1>
          <p className="text-xs sm:text-xs text-muted-foreground mt-0.5 hidden sm:block">A game of sequences and vocabulary</p>
          <div className="flex flex-col gap-1 sm:gap-2 mt-1 sm:mt-2">
            <Button
              onClick={() => setShowLeaderboard(true)}
              variant="outline"
              size="sm"
              className="w-fit gap-1 sm:gap-2 text-xs sm:text-sm h-7 sm:h-8"
            >
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
              <span className="hidden sm:inline">Leaderboard</span>
              <span className="sm:hidden">Top</span>
            </Button>
            {/* Temporarily disabled - Challenge Mode on ice for launch */}
            {/* <Link href="/challenge">
              <Button
                variant="outline"
                size="sm"
                className="w-fit gap-2"
              >
                <Sword className="h-5 w-5 text-red-400" />
                Challenge Mode
              </Button>
            </Link> */}
          </div>
        </div>
        <div 
          className={`bg-card border-2 border-card-border px-3 py-2 sm:px-5 sm:py-3 rounded-lg text-sm sm:text-lg font-bold relative transition-all duration-300 ${scoreAnimation}`}
          data-testid="text-score"
        >
          <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider block mb-0.5 sm:mb-1">Score</span>
          <span className="text-xl sm:text-2xl font-bold text-foreground" data-testid="text-score-value">{score}</span>
          
          {/* Flying score increase animation */}
          {showScoreIncrease && (
            <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 text-lg sm:text-xl font-bold text-green-400 animate-score-fly pointer-events-none">
              +{scoreIncrease}
            </div>
          )}
        </div>
      </header>

      <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Leaderboard - {currentWord}</DialogTitle>
          </DialogHeader>
          <Leaderboard word={currentWord} />
        </DialogContent>
      </Dialog>
    </>
  );
}







