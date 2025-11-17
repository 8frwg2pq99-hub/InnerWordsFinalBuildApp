





"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Calendar, Trophy, Play, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Leaderboard from "@/components/leaderboard";
import { useState } from "react";

interface Challenge {
  number: number;
  date: string;
  word: string;
}

export default function ArchivePageContent() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  
  // Available challenges with real words from database
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

  // Fetch top scores for all challenges
  const topScoresFluctuation = useQuery(api.leaderboard.getTopScores, { word: "FLUCTUATION" });
  const topScoresEverything = useQuery(api.leaderboard.getTopScores, { word: "EVERYTHING" });
  const topScoresUnprecedented = useQuery(api.leaderboard.getTopScores, { word: "UNPRECEDENTED" });
  const topScoresCoriander = useQuery(api.leaderboard.getTopScores, { word: "CORIANDER" });
  const topScoresMastodon = useQuery(api.leaderboard.getTopScores, { word: "MASTODON" });
  const topScoresChewiness = useQuery(api.leaderboard.getTopScores, { word: "CHEWINESS" });
  const topScoresAcre = useQuery(api.leaderboard.getTopScores, { word: "ACRE" });
  const topScoresRewinder = useQuery(api.leaderboard.getTopScores, { word: "REWINDER" });

  const getScoresForWord = (word: string) => {
    switch(word) {
      case "FLUCTUATION": return topScoresFluctuation;
      case "EVERYTHING": return topScoresEverything;
      case "UNPRECEDENTED": return topScoresUnprecedented;
      case "CORIANDER": return topScoresCoriander;
      case "MASTODON": return topScoresMastodon;
      case "CHEWINESS": return topScoresChewiness;
      case "ACRE": return topScoresAcre;
      case "REWINDER": return topScoresRewinder;
      default: return [];
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
              Back to Today
            </a>
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Challenge Archive</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Replay past challenges and beat your previous scores
          </p>
        </div>

        {/* Challenge List */}
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const scores = getScoresForWord(challenge.word);
            const topScore = scores && scores.length > 0 ? scores[0].score : 0;
            const totalPlayers = scores ? scores.length : 0;
            const isToday = challenge.number === 8; // Current challenge

            return (
              <Card 
                key={challenge.number} 
                className={`p-4 sm:p-6 hover:border-primary/50 transition-all ${
                  isToday ? 'border-2 border-primary/30 bg-primary/5' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 w-full sm:w-auto">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold">Challenge #{challenge.number}</h3>
                      {isToday && (
                        <Badge variant="default">Today</Badge>
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">{challenge.date}</p>
                    
                    <div className="flex items-center gap-4 mb-3 overflow-x-auto">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-primary whitespace-nowrap">
                        {challenge.word}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap">
                      <div>
                        <span className="text-muted-foreground">Top Score: </span>
                        <span className="font-semibold">{topScore}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Players: </span>
                        <span className="font-semibold">{totalPlayers}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button size="lg" className="gap-2 flex-1 sm:flex-initial" asChild>
                      <a href="/challenge">
                        <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                        Play
                      </a>
                    </Button>
                  
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="gap-2 flex-1 sm:flex-initial"
                          onClick={() => setSelectedWord(challenge.word)}
                        >
                          <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            <div className="flex items-center gap-3">
                              <Trophy className="h-6 w-6 text-yellow-500" />
                              <span>Challenge #{challenge.number} Leaderboard</span>
                            </div>
                            <div className="text-2xl font-bold tracking-wider text-primary mt-2">
                              {challenge.word}
                            </div>
                          </DialogTitle>
                        </DialogHeader>
                        <Leaderboard word={challenge.word} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <footer className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          Created by Tom Kwei © 2025
        </footer>
      </div>
    </div>
  );
}













