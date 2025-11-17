"use client";

import { Button } from "@/components/ui/button";

interface GameFooterProps {
  onReset: () => void;
  onEndRun: () => void;
  isGameActive: boolean;
}

export default function GameFooter({ onReset, onEndRun, isGameActive }: GameFooterProps) {
  return (
    <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6 justify-center px-2 sm:px-0">
      <Button
        onClick={onReset}
        variant="outline"
        size="sm"
        className="px-4 sm:px-6 text-sm flex-1 sm:flex-none max-w-[150px] sm:max-w-none"
      >
        Reset Game
      </Button>
      
      {isGameActive && (
        <Button
          onClick={onEndRun}
          variant="outline"
          size="sm"
          className="px-4 sm:px-6 text-sm flex-1 sm:flex-none max-w-[150px] sm:max-w-none"
        >
          End Run
        </Button>
      )}
    </div>
  );
}
