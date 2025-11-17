import Link from "next/link";

export default function LeaderboardsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="max-w-xl text-center space-y-4 px-4">
        <h1 className="text-3xl font-bold">Leaderboards coming soon</h1>
        <p className="text-slate-300">
          Public leaderboards will be added in a future update.
        </p>
        <p className="text-slate-400 text-sm">
          For now, you can play the daily word and share your score card on
          social using the built in share button.
        </p>
        <p className="mt-4">
          <Link href="/" className="underline text-blue-300">
            ← Back to today&apos;s game
          </Link>
        </p>
      </div>
    </main>
  );
}
