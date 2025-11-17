"use client";

import { Calendar, Trophy, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChallengeHeaderProps {
  challengeNumber: number;
  challengeDate: string;
  isToday: boolean;
}

export default function ChallengeHeader({ challengeNumber, challengeDate, isToday }: ChallengeHeaderProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <Button 
        variant="ghost" 
        size="sm"
        className="mb-2 sm:mb-3 text-xs sm:text-sm"
        asChild
      >
        <a href="/">
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Back to Home
        </a>
      </Button>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
          <div>
            <h2 className="text-base sm:text-xl font-bold">Challenge #{challengeNumber}</h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground">{challengeDate}</p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          {isToday && (
            <Badge variant="default" className="text-xs sm:text-sm">
              Today
            </Badge>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs sm:text-sm flex-1 sm:flex-initial"
            asChild
          >
            <a href={`/leaderboards?challenge=${challengeNumber}`}>
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">View Leaderboard</span>
              <span className="sm:hidden">Leaderboard</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

