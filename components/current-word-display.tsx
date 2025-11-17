interface CurrentWordDisplayProps {
  word: string;
}

export default function CurrentWordDisplay({ word }: CurrentWordDisplayProps) {
  const newWords = ["FLUCTUATION", "ACRE", "UNPRECEDENTED", "HAIRLESSNESS", "EVERYTHING"];
  const isNewWord = newWords.includes(word);
  
  // Dynamic font size based on word length
  const getFontSizeClass = () => {
    if (word.length >= 13) return "text-xl sm:text-2xl md:text-3xl lg:text-4xl";
    if (word.length >= 11) return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";
    return "text-2xl sm:text-4xl md:text-5xl lg:text-6xl";
  };
  
  return (
    <div
      className="
        bg-white text-black border-2 border-border rounded-lg shadow-sm
        flex items-center justify-center text-center gap-2
        mx-auto my-2 sm:my-4 px-2 py-2 sm:px-4 sm:py-4 lg:py-6
        w-full max-w-[95vw] sm:max-w-[600px] lg:max-w-[700px]
        min-h-[60px] sm:min-h-[100px]
      "
      data-testid="text-current-word"
    >
      <h1
        className={`
          font-extrabold tracking-[0.05em] sm:tracking-[0.1em]
          ${getFontSizeClass()}
          leading-tight
          m-0
          break-words
          hyphens-auto
        `}
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto"
        }}
      >
        {word}
      </h1>
      {isNewWord && (
        <span className="text-base sm:text-lg lg:text-xl" title="New word!">🆕</span>
      )}
    </div>
  );
}




