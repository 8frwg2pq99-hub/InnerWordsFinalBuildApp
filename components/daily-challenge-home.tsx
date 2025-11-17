





"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Calendar, Archive, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GameRulesDialog from "@/components/game-rules-dialog";

export default function DailyChallengeHome() {
  const today = new Date();
  const todayChallenge = {
    number: 8,
    date: today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    word: "FLUCTUATION",
  };

  // Fetch real player count from database
  const topScores = useQuery(api.leaderboard.getTopScores, { word: todayChallenge.word });
  const playersToday = topScores ? topScores.length : 0;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            InnerWords
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            A game of sequences and vocabulary
          </p>
        </div>

        {/* Today's Challenge Card */}
        <Card className="p-4 sm:p-6 md:p-8 mb-6 border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Challenge #{todayChallenge.number}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">{todayChallenge.date}</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-3">Today's word</p>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide md:tracking-widest mb-4 text-primary break-all">
              {todayChallenge.word}
            </div>
            <p className="text-sm text-muted-foreground">
              {playersToday} {playersToday === 1 ? 'player has' : 'players have'} played this word
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 text-base sm:text-lg py-5 sm:py-6"
              asChild
            >
              <a href="/challenge">Play Today's Challenge</a>
            </Button>
            <GameRulesDialog />
          </div>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 sm:p-6 hover:border-primary/50 transition-colors cursor-pointer">
            <a href="/archive" className="flex items-center gap-4">
              <Archive className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-1">Archive</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Past challenges
                </p>
              </div>
            </a>
          </Card>
          <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
            <a href="/leaderboards" className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Leaderboard</h3>
                <p className="text-sm text-muted-foreground">
                  Top scores
                </p>
              </div>
            </a>
          </Card>
        </div>

        <footer className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          Created by Tom Kwei © 2025
        </footer>
      </div>
    </div>
  );
}














