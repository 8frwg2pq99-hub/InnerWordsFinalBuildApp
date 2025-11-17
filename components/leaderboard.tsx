


"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Trophy, Medal, Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoundLogDialog from "./round-log-dialog";

interface LeaderboardProps {
  word: string;
}

export default function Leaderboard({ word }: LeaderboardProps) {
  const topScores = useQuery(api.leaderboard.getTopScores, { word });
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  if (topScores === undefined) {
    return (
      <div className="text-center text-muted-foreground py-6 sm:py-8">
        <div className="animate-pulse text-xs sm:text-sm">Loading leaderboard...</div>
      </div>
    );
  }

  if (!topScores || topScores.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8">
        <p className="text-muted-foreground mb-2 text-xs sm:text-sm">You're the first player for this word!</p>
        <p className="text-xs sm:text-sm text-muted-foreground">Your score has been recorded. 🎉</p>
      </div>
    );
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />;
      case 3:
        return <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />;
      default:
        return <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs sm:text-sm font-bold text-muted-foreground">#{position}</span>;
    }
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
    <div>
      <div className="space-y-2 sm:space-y-3">
        {topScores.map((entry, index) => {
          const position = index + 1;
          const avgPerTurn = entry.turns > 0 ? (entry.score / entry.turns).toFixed(1) : "0.0";
          
          return (
            <div
              key={entry._id}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border ${
                position <= 3 ? "bg-card/50" : "bg-background/50"
              }`}
            >
              <div className="flex-shrink-0">
                {getPositionIcon(position)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate text-xs sm:text-base">{entry.playerName}</div>
                <div className="text-[10px] sm:text-sm text-muted-foreground">
                  {entry.turns} turns • {avgPerTurn} avg
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <div className={`text-sm sm:text-lg font-bold ${getRankColor(entry.score)}`}>
                  {getRankLetter(entry.score)}
                </div>
                <div className="text-right">
                  <div className="text-base sm:text-xl font-bold text-blue-400">{entry.score}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">points</div>
                </div>
              </div>

              {/* Show Round Log button for top 3 */}
              {position <= 3 && entry.turnHistory && entry.turnHistory.length > 0 && (
                <div className="flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedEntry(entry)}
                    className="text-xs h-8 px-2 sm:px-3 gap-1"
                  >
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Round Log</span>
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Ranking System Legend */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
        <div className="text-xs sm:text-sm font-medium mb-2">Ranking System:</div>
        <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold">S</span>
            <span className="text-muted-foreground">= 100+ points</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">A</span>
            <span className="text-muted-foreground">= 90-99 points</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-bold">B</span>
            <span className="text-muted-foreground">= 80-89 points</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">C</span>
            <span className="text-muted-foreground">= 60-79 points</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400 font-bold">D</span>
            <span className="text-muted-foreground">= 40-59 points</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-bold">E</span>
            <span className="text-muted-foreground">= 0-39 points</span>
          </div>
        </div>
      </div>

      {/* Round Log Dialog */}
      {selectedEntry && (
        <RoundLogDialog
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          playerName={selectedEntry.playerName}
          score={selectedEntry.score}
          turns={selectedEntry.turns}
          turnHistory={selectedEntry.turnHistory}
          startWord={word}
        />
      )}
    </div>
  );
}











