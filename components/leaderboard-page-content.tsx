
"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Trophy, Medal, Award, Calendar, ChevronLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RoundLogDialog from "@/components/round-log-dialog";

interface Challenge {
  number: number;
  date: string;
  word: string;
}

export default function LeaderboardPageContent() {
  // Available challenges
  const challenges: Challenge[] = [
    { number: 8, date: "Jan 8, 2025", word: "FLUCTUATION" },
    { number: 7, date: "Jan 7, 2025", word: "EVERYTHING" },
    { number: 6, date: "Jan 6, 2025", word: "UNPRECEDENTED" },
    { number: 5, date: "Jan 5, 2025", word: "CORIANDER" },
    { number: 4, date: "Jan 4, 2025", word: "MASTODON" },
    { number: 3, date: "Jan 3, 2025", word: "CHEWINESS" },
    { number: 2, date: "Jan 2, 2025", word: "ACRE" },
    { number: 1, date: "Jan 1, 2025", word: "REWINDER" },
  ];

  const [selectedChallenge, setSelectedChallenge] = useState<number>(8);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const currentChallenge = challenges.find(c => c.number === selectedChallenge);
  
  // Fetch real leaderboard data from Convex
  const topScores = useQuery(
    api.leaderboard.getTopScores, 
    currentChallenge ? { word: currentChallenge.word } : "skip"
  );

  const getPositionIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            className="mb-4"
            asChild
          >
            <a href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </a>
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">All-Time Leaderboard</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Top players across all challenges
          </p>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedChallenge.toString()} onValueChange={(v) => setSelectedChallenge(Number(v))}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {challenges.map((challenge) => (
                  <SelectItem key={challenge.number} value={challenge.number.toString()}>
                    Challenge #{challenge.number} - {challenge.word}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Challenge Info */}
        {currentChallenge && (
          <Card className="p-4 sm:p-6 mb-6 border-primary/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1">Challenge #{currentChallenge.number}</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">{currentChallenge.date}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Today's Word</p>
                <div className="text-2xl sm:text-3xl font-bold tracking-wide text-primary break-all">
                  {currentChallenge.word}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Leaderboard Table */}
        <Card className="overflow-hidden">
          <div className="bg-muted/30 px-6 py-3 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Top Players</h3>
              <Badge variant="secondary">{topScores?.length || 0} players</Badge>
            </div>
          </div>
          
          <div className="divide-y">
            {!topScores ? (
              <div className="px-6 py-8 text-center text-muted-foreground">
                Loading leaderboard...
              </div>
            ) : topScores.length === 0 ? (
              <div className="px-6 py-8 text-center text-muted-foreground">
                No scores yet for this challenge. Be the first to play!
              </div>
            ) : (
              topScores.map((entry, index) => {
                const rank = index + 1;
                const avgPerTurn = entry.turns > 0 ? (entry.score / entry.turns).toFixed(1) : "0.0";
                const date = new Date(entry.timestamp).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                });

                return (
                  <div
                    key={entry._id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors"
                  >
                    {/* Rank */}
                    <div className="w-12 flex items-center justify-center">
                      {getPositionIcon(rank) || (
                        <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate flex items-center gap-2">
                        {entry.playerName}
                      </div>
                      <div className="text-sm text-muted-foreground">{date}</div>
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:flex flex-col items-center gap-1 min-w-[80px]">
                      <div className="text-xs text-muted-foreground">Turns</div>
                      <div className="font-semibold">{entry.turns}</div>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-1 min-w-[80px]">
                      <div className="text-xs text-muted-foreground">Avg/Turn</div>
                      <div className="font-semibold">{avgPerTurn}</div>
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-end gap-1 min-w-[80px]">
                      <div className="text-xs text-muted-foreground">Score</div>
                      <div className="text-2xl font-bold text-primary">{entry.score}</div>
                    </div>

                    {/* Show Round Log button for top 3 */}
                    {rank <= 3 && entry.turnHistory && entry.turnHistory.length > 0 && (
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
              })
            )}
          </div>
        </Card>

        {/* Pagination hint */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Showing top {topScores?.length || 0} players
        </div>

        <footer className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          Created by Tom Kwei © 2025
        </footer>
      </div>

      {/* Round Log Dialog */}
      {selectedEntry && currentChallenge && (
        <RoundLogDialog
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          playerName={selectedEntry.playerName}
          score={selectedEntry.score}
          turns={selectedEntry.turns}
          turnHistory={selectedEntry.turnHistory}
          startWord={currentChallenge.word}
        />
      )}
    </div>
  );
}








