"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  score: number;
  turns: number;
  word: string;
  rank: string;
  playerName?: string;
  challengeNumber: number;
  wordChain: string[];
}

export default function SocialShare({ 
  score, 
  turns, 
  word, 
  challengeNumber,
  wordChain
}: SocialShareProps) {
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  // Generate the share text exactly as specified
  const generateShareText = () => {
    // First 4 words from chain, followed by "…" if more exist
    const first4 = wordChain.slice(0, 4).join(" → ") + (wordChain.length > 4 ? " …" : "");
    const wordsCount = wordChain.length;
    
    // Use smart quotes around the start word
    const shareText = [
      `🧩 InnerWords — Challenge #${challengeNumber}: '${word.toUpperCase()}'`,
      first4,
      `${score} pts 🏆 | ${wordsCount} words`,
      `Think you can beat it? innerwords.game`
    ].join("\n");

    return shareText;
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareText = generateShareText();

    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(shareText);
      
      // Show success toast
      toast({
        description: "Result copied! Paste anywhere to share.",
        duration: 3000,
      });

      // Try native share if supported
      if (navigator.share) {
        try {
          await navigator.share({
            text: shareText,
          });
        } catch (shareError) {
          // User cancelled share or it failed - that's okay, we already copied
          console.log("Share cancelled or failed:", shareError);
        }
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        description: "Failed to copy result. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-sm sm:text-base">Share Your Result</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Challenge your friends to beat your score!
        </p>
      </div>

      <Button
        onClick={handleShare}
        disabled={isSharing}
        className="w-full gap-2"
        size="lg"
      >
        <Share2 className="h-4 w-4" />
        Share Result
      </Button>

      {/* Preview of what will be shared */}
      <div className="bg-muted/50 rounded-lg p-3 sm:p-4 border border-border">
        <div className="text-xs sm:text-sm font-mono whitespace-pre-wrap break-words">
          {generateShareText()}
        </div>
      </div>
    </div>
  );
}
