





"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, RotateCcw } from "lucide-react";
import Leaderboard from "./leaderboard";
import SocialShare from "./social-share";

interface GameEndModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  turns: number;
  word: string;
  onPlayAgain: () => void;
  challengeNumber: number;
  wordChain: string[];
  turnHistory: Array<{
    from: string;
    to: string;
    sequence: string;
    type: "INNER" | "EDGE";
    points: number;
    sequencePoints: number;
    lengthBonus: number;
    totalScore: number;
  }>;
}

export default function GameEndModal({
  isOpen,
  onClose,
  score,
  turns,
  word,
  onPlayAgain,
  challengeNumber,
  wordChain,
  turnHistory,
}: GameEndModalProps) {
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  
  const addScore = useMutation(api.leaderboard.addScore);

  // Fetch IP address when component mounts
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.log('Could not fetch IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  const handleSubmitScore = async () => {
    if (!playerName.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await addScore({
        playerName: playerName.trim(),
        score,
        turns,
        word,
        ipAddress: ipAddress || undefined,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        turnHistory: turnHistory.length > 0 ? turnHistory : undefined,
      });
      
      // Wait a brief moment to ensure database has updated
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setHasSubmitted(true);
    } catch (error) {
      console.error("Failed to submit score:", error);
      alert("Failed to submit score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Log when leaderboard should be displayed
  useEffect(() => {
    if (hasSubmitted) {
      console.log("Leaderboard section should now be visible for word:", word);
    }
  }, [hasSubmitted, word]);

  const handlePlayAgain = () => {
    setPlayerName("");
    setHasSubmitted(false);
    setIsSubmitting(false);
    onPlayAgain();
    onClose();
  };

  const getRankColor = (score: number) => {
    if (score >= 100) return "text-yellow-400"; // S rank
    if (score >= 90) return "text-green-400";   // A rank
    if (score >= 80) return "text-blue-400";    // B rank
    if (score >= 60) return "text-purple-400";  // C rank
    if (score >= 40) return "text-orange-400";  // D rank
    return "text-gray-400";                     // E rank
  };

  const getRankLetter = (score: number) => {
    if (score >= 100) return "S";
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 60) return "C";
    if (score >= 40) return "D";
    return "E";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center text-lg sm:text-xl">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            Time's Up!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Here's how you did</p>
            
            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-card border rounded-lg p-3 sm:p-4">
                <div className="text-[10px] sm:text-sm text-muted-foreground mb-1">FINAL SCORE</div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">{score}</div>
              </div>
              
              <div className="bg-card border rounded-lg p-3 sm:p-4">
                <div className="text-[10px] sm:text-sm text-muted-foreground mb-1">RANK</div>
                <div className={`text-2xl sm:text-3xl font-bold ${getRankColor(score)}`}>
                  {getRankLetter(score)}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-card border rounded-lg p-2 sm:p-3">
                <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">TURNS</div>
                <div className="text-lg sm:text-xl font-bold">{turns}</div>
              </div>
              
              <div className="bg-card border rounded-lg p-2 sm:p-3">
                <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">AVG/TURN</div>
                <div className="text-lg sm:text-xl font-bold">
                  {turns > 0 ? (score / turns).toFixed(1) : "0.0"}
                </div>
              </div>
            </div>
          </div>

          {/* Name Entry Form */}
          {!hasSubmitted ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Submit to Leaderboard</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Enter your name to save your score and compete with others!
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="playerName">Your Name</Label>
                <Input
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={20}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmitScore();
                    }
                  }}
                />
              </div>
              
              <Button
                onClick={handleSubmitScore}
                disabled={!playerName.trim() || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Score"}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-400 font-semibold">
                ✅ Score submitted successfully!
              </div>
              <p className="text-sm text-muted-foreground">
                Your score has been added to the leaderboard.
              </p>
            </div>
          )}

          {/* Show leaderboard after successful submission */}
          {hasSubmitted && (
            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              {/* Social Sharing Section */}
              <SocialShare 
                score={score}
                turns={turns}
                word={word}
                rank={getRankLetter(score)}
                playerName={playerName}
                challengeNumber={challengeNumber}
                wordChain={wordChain}
              />
              
              {/* Leaderboard */}
              <div className="pt-4 sm:pt-6 border-t border-border">
                <h3 className="font-semibold mb-3 sm:mb-4 text-center text-sm sm:text-base">🏆 Leaderboard for {word}</h3>
                <Leaderboard word={word} key={`${word}-${Date.now()}`} />
              </div>
            </div>
          )}

          {/* Play Again Button */}
          <Button
            onClick={handlePlayAgain}
            variant="outline"
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}










