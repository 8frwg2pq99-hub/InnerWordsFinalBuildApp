"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DailyGameContent from "@/components/daily-game-content";

// Mock data - in production, this would come from database
const challenges = [
  { number: 42, date: "January 8, 2025", word: "CORIANDER", isToday: true },
  { number: 41, date: "January 7, 2025", word: "MASTODON", isToday: false },
  { number: 40, date: "January 6, 2025", word: "CHEWINESS", isToday: false },
  { number: 39, date: "January 5, 2025", word: "SCUTTLING", isToday: false },
];

function ChallengeContent() {
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("id");
  
  const challenge = challengeId 
    ? challenges.find(c => c.number === Number(challengeId)) 
    : challenges[0]; // Default to today's challenge

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Challenge Not Found</h1>
          <p className="text-muted-foreground mb-4">This challenge doesn't exist.</p>
          <a href="/" className="text-primary hover:underline">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <DailyGameContent
      challengeNumber={challenge.number}
      challengeDate={challenge.date}
      initialWord={challenge.word}
      isToday={challenge.isToday}
    />
  );
}

export default function ChallengePageContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <ChallengeContent />
    </Suspense>
  );
}

