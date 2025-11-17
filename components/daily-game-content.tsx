


"use client";

import { useState } from "react";
import GameHeader from "@/components/game-header";
import CurrentWordDisplay from "@/components/current-word-display";
import GameInputs from "@/components/game-inputs";
import GameFooter from "@/components/game-footer";
import FeedbackMessage from "@/components/feedback-message";
import TurnLog, { type TurnData } from "@/components/turn-log";
import GameTimer from "@/components/game-timer";
import GameRules from "@/components/game-rules";
import GameEndModal from "@/components/game-end-modal";
import ChallengeHeader from "@/components/challenge-header";
import { isValidEnglishWord } from "@/lib/dictionary";

interface DailyGameContentProps {
  challengeNumber: number;
  challengeDate: string;
  initialWord: string;
  isToday: boolean;
}

const generateExamples = (currentWord: string): string => {
  const examples: { [key: string]: string[] } = {
    "CORIANDER": ["ARIA", "ORDAIN"],
    "CHEWINESS": ["WINE", "CHESS"],
    "MASTODON": ["MAST", "DONKEY"],
    "SCUTTLING": ["CUTTING", "GUTTURAL"],
  };
  
  const wordExamples = examples[currentWord] || ["WORD", "EXAMPLE"];
  return `E.g. ${wordExamples.join(", ")}`;
};

export default function DailyGameContent({ 
  challengeNumber, 
  challengeDate, 
  initialWord,
  isToday 
}: DailyGameContentProps) {
  const [currentWord, setCurrentWord] = useState(initialWord);
  const [score, setScore] = useState(0);
  const [prevWordLen, setPrevWordLen] = useState(initialWord.length);
  const [newWord, setNewWord] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" }>({
    text: "",
    type: "info",
  });
  const [turns, setTurns] = useState<TurnData[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [lastSubmissionResult, setLastSubmissionResult] = useState<"success" | "error" | null>(null);

  const normalize = (s: string) => s.trim().toUpperCase();

  const isInnerSequence = (base: string, startIndex: number, seqLen: number) => {
    if (startIndex === 0) return false;
    if (startIndex + seqLen === base.length) return false;
    return true;
  };

  const findSequenceInWord = (
    base: string,
    word: string
  ): { sequence: string; indexInBase: number; indexInWord: number } | null => {
    let longestSeq = "";
    let longestIndexBase = -1;
    let longestIndexWord = -1;

    for (let i = 0; i < base.length; i++) {
      for (let j = i + 2; j <= base.length; j++) {
        const seq = base.substring(i, j);
        const indexInWord = word.indexOf(seq);
        if (indexInWord !== -1 && seq.length > longestSeq.length) {
          longestSeq = seq;
          longestIndexBase = i;
          longestIndexWord = indexInWord;
        }
      }
    }
    if (longestSeq.length < 2) return null;
    return { sequence: longestSeq, indexInBase: longestIndexBase, indexInWord: longestIndexWord };
  };

  const verifyWordStructure = (word: string, sequence: string, indexInWord: number) => {
    const prefix = word.substring(0, indexInWord);
    const suffix = word.substring(indexInWord + sequence.length);
    return word === prefix + sequence + suffix;
  };

  const handleSubmit = () => {
    if (isGameOver) return;

    const base = normalize(currentWord);
    const word = normalize(newWord);

    if (word.length < 2) {
      setMessage({ text: "New word must be at least 2 letters.", type: "error" });
      setLastSubmissionResult("error");
      return;
    }
    if (!/^[A-Z]+$/.test(word)) {
      setMessage({ text: "New word must be letters only (A–Z).", type: "error" });
      setLastSubmissionResult("error");
      return;
    }

    if (!isValidEnglishWord(word)) {
      setMessage({ 
        text: `"${word}" is not a valid English word. Please try a different word.`, 
        type: "error" 
      });
      setLastSubmissionResult("error");
      return;
    }

    const result = findSequenceInWord(base, word);
    if (!result) {
      setMessage({
        text: `No contiguous sequence from ${base} found in ${word}. The new word must contain at least 2 consecutive letters from the current word.`,
        type: "error",
      });
      setLastSubmissionResult("error");
      return;
    }

    const { sequence, indexInBase, indexInWord } = result;

    if (!verifyWordStructure(word, sequence, indexInWord)) {
      setMessage({
        text: `Letters cannot be inserted inside the sequence "${sequence}".`,
        type: "error",
      });
      setLastSubmissionResult("error");
      return;
    }

    if (!isTimerActive && turns.length === 0) {
      setIsTimerActive(true);
    }

    const inner = isInnerSequence(base, indexInBase, sequence.length);
    const seqPoints = sequence.length * (inner ? 2 : 1);
    const lengthBonus = Math.max(0, word.length - prevWordLen);
    const points = seqPoints + lengthBonus;
    const newScore = score + points;

    setScore(newScore);
    setPrevWordLen(word.length);

    const bonusText = lengthBonus ? `, +${lengthBonus} length bonus` : "";
    setMessage({
      text: `+${points} points (${inner ? "Inner" : "Edge"} ${sequence.length}-letter sequence: "${sequence}"${bonusText}).`,
      type: "success",
    });
    setLastSubmissionResult("success");

    setTurns([
      {
        from: currentWord,
        to: word,
        sequence,
        type: inner ? "INNER" : "EDGE",
        points,
        sequencePoints: seqPoints,
        lengthBonus,
        totalScore: newScore,
      },
      ...turns,
    ]);

    setCurrentWord(word);
    setNewWord("");
  };

  const handleTimeUp = () => {
    setIsGameOver(true);
    setIsTimerActive(false);
    setShowEndModal(true);
    setMessage({ text: "Time is up! Check out your final score above.", type: "info" });
  };

  const handleReset = () => {
    setScore(0);
    setCurrentWord(initialWord);
    setPrevWordLen(initialWord.length);
    setNewWord("");
    setTurns([]);
    setIsTimerActive(false);
    setIsGameOver(false);
    setShowEndModal(false);
    setMessage({ text: "", type: "info" });
  };

  const handleEndRun = () => {
    setIsGameOver(true);
    setIsTimerActive(false);
    setShowEndModal(true);
    setMessage({ text: "Run ended. Check out your final score above.", type: "info" });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4 lg:p-6">
      <div className="w-full max-w-[95vw] sm:max-w-2xl bg-card border border-card-border rounded-xl p-3 sm:p-6 lg:p-8 shadow-xl">
        <ChallengeHeader 
          challengeNumber={challengeNumber} 
          challengeDate={challengeDate}
          isToday={isToday}
        />
        
        <GameHeader score={score} currentWord={initialWord} />
        
        <GameTimer isActive={isTimerActive} onTimeUp={handleTimeUp} duration={60} />
        
        <div className={`${isTimerActive ? 'hidden sm:block' : 'block'}`}>
          <CurrentWordDisplay word={currentWord} />
        </div>
        
        <GameRules />
        
        <div className={`${isTimerActive ? 'block sm:hidden mb-2' : 'hidden'}`}>
          <CurrentWordDisplay word={currentWord} />
        </div>
        
        <GameInputs
          newWord={newWord}
          onNewWordChange={setNewWord}
          onSubmit={handleSubmit}
          disabled={isGameOver}
          lastSubmissionResult={lastSubmissionResult}
          examples={generateExamples(currentWord)}
          isTimerActive={isTimerActive}
        />
        
        <GameFooter
          onReset={handleReset}
          onEndRun={handleEndRun}
          isGameActive={isTimerActive && !isGameOver}
        />
        
        <FeedbackMessage message={message.text} type={message.type} />
        
        <TurnLog turns={turns} />
        
        <GameEndModal
          isOpen={showEndModal}
          onClose={() => setShowEndModal(false)}
          score={score}
          turns={turns.length}
          word={initialWord}
          onPlayAgain={handleReset}
          challengeNumber={challengeNumber}
          wordChain={turns.map(t => t.to).reverse()}
          turnHistory={turns}
        />
      </div>
    </div>
  );
}



