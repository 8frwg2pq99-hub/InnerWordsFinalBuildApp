
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface TurnHistoryItem {
  from: string;
  to: string;
  sequence: string;
  type: "INNER" | "EDGE";
  points: number;
  sequencePoints: number;
  lengthBonus: number;
  totalScore: number;
}

interface RoundLogDialogProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  score: number;
  turns: number;
  turnHistory?: TurnHistoryItem[];
  startWord: string;
}

// Fetch word definition from Free Dictionary API
async function fetchDefinition(word: string): Promise<string> {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    if (!response.ok) return "Definition not available";
    
    const data = await response.json();
    const firstMeaning = data[0]?.meanings?.[0]?.definitions?.[0];
    if (firstMeaning) {
      return firstMeaning.definition;
    }
    return "Definition not available";
  } catch (error) {
    return "Definition not available";
  }
}

export default function RoundLogDialog({
  isOpen,
  onClose,
  playerName,
  score,
  turns,
  turnHistory,
  startWord,
}: RoundLogDialogProps) {
  const [definitions, setDefinitions] = useState<Record<string, string>>({});
  const [loadingDefs, setLoadingDefs] = useState(false);

  // Fetch definitions when dialog opens
  useEffect(() => {
    if (isOpen && turnHistory && turnHistory.length > 0) {
      setLoadingDefs(true);
      const uniqueWords = Array.from(new Set(turnHistory.map(t => t.to)));
      
      Promise.all(
        uniqueWords.map(async (word) => {
          const def = await fetchDefinition(word);
          return [word, def];
        })
      ).then((results) => {
        const defsMap = Object.fromEntries(results);
        setDefinitions(defsMap);
        setLoadingDefs(false);
      });
    }
  }, [isOpen, turnHistory]);

  if (!turnHistory || turnHistory.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-w-[95vw]">
          <DialogHeader>
            <DialogTitle>Round Log - {playerName}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            No turn history available for this entry.
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Reverse to show turns in chronological order
  const chronologicalTurns = [...turnHistory].reverse();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-w-[95vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">
            🏆 {playerName}'s Winning Strategy
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Header Summary */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-2 border-primary/30 rounded-xl p-4">
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">START</div>
                <div className="text-sm sm:text-base font-bold text-primary">{startWord}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">TURNS</div>
                <div className="text-lg sm:text-xl font-bold">{turns}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">SCORE</div>
                <div className="text-lg sm:text-xl font-bold text-blue-400">{score}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">AVG</div>
                <div className="text-lg sm:text-xl font-bold text-green-400">
                  {turns > 0 ? (score / turns).toFixed(1) : "0.0"}
                </div>
              </div>
            </div>
          </div>

          {/* Turn-by-turn breakdown */}
          <ScrollArea className="h-[450px] pr-4">
            <div className="space-y-4">
              {chronologicalTurns.map((turn, index) => {
                const isInner = turn.type === "INNER";
                const sequenceColor = isInner ? "text-green-400" : "text-yellow-400";
                const bgGradient = isInner 
                  ? "from-green-900/20 to-green-800/10" 
                  : "from-yellow-900/20 to-yellow-800/10";

                return (
                  <div 
                    key={index}
                    className={`bg-gradient-to-br ${bgGradient} border-2 ${isInner ? 'border-green-700/50' : 'border-yellow-700/50'} rounded-xl p-4 space-y-3 relative overflow-hidden`}
                  >
                    {/* Turn number badge */}
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold border">
                      Turn {index + 1}
                    </div>

                    {/* Word transformation - prominently displayed */}
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground font-medium">From:</span>
                        <span className="text-base sm:text-lg font-mono">{turn.from}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-muted-foreground font-medium">To:</span>
                        <span className="text-xl sm:text-2xl font-bold">{turn.to}</span>
                      </div>
                    </div>

                    {/* Sequence highlight */}
                    <div className="bg-background/60 rounded-lg p-3 border">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${sequenceColor} border-current`}>
                          {turn.type} SEQUENCE
                        </Badge>
                        <span className={`text-sm font-mono font-bold ${sequenceColor}`}>
                          "{turn.sequence}"
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isInner ? "💎 Inner sequence = DOUBLE points!" : "📍 Edge sequence"}
                      </div>
                    </div>

                    {/* Scoring breakdown */}
                    <div className="bg-card/50 rounded-lg p-3 space-y-2 border">
                      <div className="text-xs font-semibold text-muted-foreground mb-2">📊 SCORING BREAKDOWN:</div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Sequence ({turn.sequence.length} letters × {isInner ? "2" : "1"})
                        </span>
                        <span className="font-bold">{turn.sequencePoints} pts</span>
                      </div>
                      
                      {turn.lengthBonus > 0 && (
                        <div className="flex justify-between text-sm text-green-400">
                          <span>Length bonus</span>
                          <span className="font-bold">+{turn.lengthBonus} pts</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between pt-2 border-t text-base font-bold">
                        <span>Points earned:</span>
                        <span className="text-blue-400">+{turn.points}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span className="text-muted-foreground">Running total:</span>
                        <span className="font-bold text-lg">{turn.totalScore}</span>
                      </div>
                    </div>

                    {/* Word definition */}
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                      <div className="text-xs font-semibold text-primary mb-1">
                        📖 DEFINITION:
                      </div>
                      {loadingDefs ? (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Loading definition...
                        </div>
                      ) : (
                        <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          <span className="font-semibold">{turn.to.toLowerCase()}</span> - {definitions[turn.to] || "Definition not available"}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Final Summary */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-xl p-4 text-center">
            <p className="text-sm sm:text-base">
              <span className="font-semibold">{playerName}</span> completed{" "}
              <span className="font-bold text-primary">{turns}</span> turn{turns !== 1 ? 's' : ''} and scored{" "}
              <span className="font-bold text-2xl text-blue-400">{score}</span> points! 🎉
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Can you beat this strategy? 🤔
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


