

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function GameRules() {
  return (
    <div className="mb-2 sm:mb-6 px-2 sm:px-0">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="rules" className="border-border">
          <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:text-primary py-2 sm:py-4">
            📖 *InnerWords Rules*
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed space-y-2 sm:space-y-4 text-xs sm:text-base">
            <p>
              Pick a <strong className="text-foreground">sequence</strong> of <strong className="text-foreground">2 or more consecutive letters</strong> from the starting word. Then, build a new word by adding letters <strong className="text-foreground">before and/or after</strong> that <strong className="text-foreground">sequence</strong>. Next, pick a <strong className="text-foreground">sequence</strong> of <strong className="text-foreground">2 or more consecutive letters</strong> from that word and keep going, building as many new words and scoring as many points as you can in 60 seconds.
            </p>
            
            <p>
              <strong className="text-foreground">Example:</strong><br /><br />
              From CORIANDER, the sequence AND ✅ can make SAND, HANDY, or COMMANDER etc. ✨
            </p>
            
            <p>
              ❌ RAND isn't valid because in CORIANDER, the R and AND aren't next to each other.
            </p>
            
            <p className="font-semibold text-foreground">
              Scoring:
            </p>
            
            <p>
              You score in InnerWords three ways: by how many letters you pick for your <strong className="text-foreground">sequence</strong>, where that <strong className="text-foreground">sequence</strong> sits in the word you've picked from, and whether your new word is longer than the last one.
            </p>
            
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Edge sequence</strong> (your chosen sequence is at the start or end of the source word, for example: COR, CO, DER etc.): <strong className="text-foreground">1 point per letter</strong> ⭐</li>
              <li><strong className="text-foreground">Inner sequence</strong> (your chosen sequence sits inside the source word, for example: RIA, AND, ORIA etc.): <strong className="text-foreground">2 points per letter</strong> 💎</li>
              <li><strong className="text-foreground">Length bonus:</strong> <strong className="text-foreground">+1 point</strong> for every extra letter beyond the previous word 📝</li>
            </ul>
            
            <p className="font-semibold text-foreground">
              Scoring Example:
            </p>
            
            <p>
              From CORIANDER, the sequence AND (inner, 3 letters) can make:
            </p>
            
            <ul className="list-disc list-inside space-y-1">
              <li>SAND = 6 points (3 letters × 2 for inner sequence)</li>
              <li>HANDY = 6 points (sequence) + 1 point (length bonus) = 7 points</li>
            </ul>
            
            <p className="text-sm sm:text-lg font-medium text-foreground">
              How high can you score in 60 seconds? Check the leaderboards! ⏱️
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}










