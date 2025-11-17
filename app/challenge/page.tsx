import Link from "next/link";

export default function ChallengePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="max-w-xl text-center space-y-4 px-4">
        <h1 className="text-3xl font-bold">InnerWords challenges</h1>
        <p className="text-slate-300">
          Custom challenge sharing will be added soon.
        </p>
        <p className="text-slate-400 text-sm">
          In the meantime, you can play today&apos;s daily word and share your
          scores directly from the main game screen.
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
