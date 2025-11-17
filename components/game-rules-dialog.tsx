

"use client";

import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function GameRulesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 text-sm sm:text-base">
          <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          How to Play
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-2xl">📖 How to Play InnerWords</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm leading-relaxed">
          <p>
            Pick a <strong className="text-foreground">sequence</strong> of <strong className="text-foreground">2 or more consecutive letters</strong> from the starting word. Then, build a new word by adding letters <strong className="text-foreground">before and/or after</strong> that <strong className="text-foreground">sequence</strong>. Next, pick a <strong className="text-foreground">sequence</strong> of <strong className="text-foreground">2 or more consecutive letters</strong> from that word and keep going, building as many new words and scoring as many points as you can in 60 seconds.
          </p>
          
          <div className="bg-muted/50 p-3 sm:p-4 rounded-lg">
            <p className="font-semibold text-foreground mb-2 text-xs sm:text-sm">Example:</p>
            <p className="text-xs sm:text-sm">
              From <span className="text-primary font-bold">CORIANDER</span>, the sequence <span className="text-primary font-bold">AND</span> ✅ can make <span className="text-primary font-bold">SAND</span>, <span className="text-primary font-bold">HANDY</span>, or <span className="text-primary font-bold">COMMANDER</span> etc. ✨
            </p>
          </div>
          
          <div className="bg-destructive/10 p-3 sm:p-4 rounded-lg border border-destructive/20">
            <p className="text-xs sm:text-sm">
              ❌ <span className="text-primary font-bold">RAND</span> isn't valid in CORIANDER because those letters aren't a consecutive sequence.
            </p>
          </div>
          
          <div className="pt-2">
            <h3 className="font-semibold text-foreground text-base sm:text-lg mb-2 sm:mb-3">Scoring:</h3>
            
            <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
              You score in InnerWords three ways: by how many letters you pick for your <strong className="text-foreground">sequence</strong>, where that <strong className="text-foreground">sequence</strong> sits in the word you've picked from, and whether your new word is longer than the last one.
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-primary">⭐</span>
                <div>
                  <strong className="text-foreground">Edge sequence</strong> (at the start or end of the source word, e.g., COR, CO, DER): <strong className="text-foreground">1 point per letter</strong>
                </div>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-primary">💎</span>
                <div>
                  <strong className="text-foreground">Inner sequence</strong> (inside the source word, e.g., RIA, AND, ORIA): <strong className="text-foreground">2 points per letter</strong>
                </div>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-primary">📝</span>
                <div>
                  <strong className="text-foreground">Length bonus:</strong> <strong className="text-foreground">+1 point</strong> for every extra letter beyond the previous word
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-primary/10 p-3 sm:p-4 rounded-lg border border-primary/20">
            <p className="font-semibold text-foreground mb-2 text-xs sm:text-sm">Scoring Example:</p>
            <p className="mb-2 text-xs sm:text-sm">
              From CORIANDER, the sequence <span className="text-primary font-bold">AND</span> (inner, 3 letters) can make:
            </p>
            <ul className="space-y-1 ml-4 text-xs sm:text-sm">
              <li>• <span className="text-primary font-bold">SAND</span> = 6 points (3 letters × 2 for inner sequence)</li>
              <li>• <span className="text-primary font-bold">HANDY</span> = 6 points (sequence) + 1 point (length bonus) = 7 points</li>
            </ul>
          </div>
          
          <p className="text-sm sm:text-base font-medium text-foreground text-center pt-2">
            How high can you score in 60 seconds? Check the leaderboards! ⏱️
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}



