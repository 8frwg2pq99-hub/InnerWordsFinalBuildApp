import "./globals.css"

import type { Metadata } from "next"
import { ConvexClientProvider } from "@/components/convex-client-provider"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { Trophy } from "lucide-react"

export const metadata: Metadata = {
  title: "InnerWords — Word Puzzle Game",
  description: "Build new words by extracting letter sequences. Score points based on inner vs edge sequences in this engaging word puzzle game.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ConvexClientProvider>
          <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
              <div className="flex justify-between items-center h-12 sm:h-14">
                <Link href="/" className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  InnerWords
                </Link>
                <Link 
                  href="/leaderboards" 
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                  Leaderboard
                </Link>
              </div>
            </div>
          </nav>
          {children}
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  )
}




