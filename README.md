

# InnerWords - Daily Word Puzzle Game

A daily word puzzle game where players create new words using contiguous letter sequences from a base word. Compete in daily challenges, track your progress, and climb the leaderboards. Built with Next.js and Convex.

## 🎮 Game Concept

InnerWords is a **daily word puzzle challenge** similar to Wordle, where:
- **New challenge every day** with a unique starting word
- **60 seconds** to score as many points as possible
- **Daily leaderboards** to compete with other players worldwide
- **Challenge archive** to replay previous days and improve your scores
- **Persistent stats** tracking your performance and streaks over time

## 📅 Daily Challenge System

### Today's Challenge
- Visit the homepage to see today's challenge word
- View the challenge number (e.g., Challenge #42)
- Track your current streak and personal statistics
- See how many players have already played today
- One new word every day at midnight

### Archive Mode (`/archive`)
- Browse all previous daily challenges
- Filter by played/unplayed challenges
- See your rank and score for completed challenges
- Replay any past challenge to beat your previous score
- Compare your performance with top scores from that day
- Top 10 badge for exceptional performances

### Leaderboards (`/leaderboards`)
- **Challenge-specific rankings**: Each day has its own leaderboard
- **Daily view**: See today's top players in real-time
- **All-time view**: Best performances across all challenges
- **Personal stats**: Track your ranking and improvement
- Detailed player stats: score, turns, average per turn
- Top 3 positions highlighted with special badges

## 🎯 How to Play

1. **Start with a base word** (e.g., "CORIANDER")
2. **Create a new word** that contains at least 2 consecutive letters from the base word
3. **Score points** based on:
   - Sequence length (2+ letters)
   - Inner sequences (not at word edges) score double points
   - Length bonus for longer words
4. **Beat the clock** - You have 60 seconds once you start playing
5. **Submit your score** to compete on the leaderboard

## 🏆 Features

### Daily Challenge System
- **New word every day** at midnight UTC
- **Challenge numbering** for easy reference and sharing
- **Persistent scoring** - Your scores are saved forever
- **Streak tracking** - Maintain your daily play streak
- **Personal statistics** - Average score, best score, games played
- **Archive access** - Replay any previous day's challenge

### Core Gameplay
- **60-second timer** for competitive play
- **Real-time scoring** with sequence detection
- **Turn history** tracking your moves
- **Dynamic feedback** on valid/invalid words
- **Dictionary validation** - Only real English words count

### Social Features
- **Beautiful scorecard** - Screenshot-worthy results display
- **One-click sharing** - Share to Twitter/X, Facebook, LinkedIn
- **Copy-to-clipboard** - Easy text sharing with formatted stats
- **Viral mechanics** - Challenge friends to beat your score
- **Shareable stats** - Score, rank, turns, and average performance

### Admin & Analytics
- **Email notifications** - Get notified when new scores are submitted
- **IP tracking** - Monitor unique visitors and engagement
- **Admin dashboard** - View visitor statistics and game analytics
- **Real-time monitoring** - Track game usage and player activity

### Technical Features
- **Responsive design** - Optimized for mobile and desktop
- **Real-time database** with Convex
- **Secure data handling** with IP anonymization options
- **Email integration** for notifications
- **Modern UI** with Tailwind CSS and shadcn/ui

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` to view:
- **Unique visitor count** and total visits
- **Recent IP addresses** with visit frequency
- **Engagement metrics** and user analytics
- **Email notification status** and delivery tracking

## 🔧 Technical Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Convex (real-time database)
- **Styling**: Tailwind CSS, shadcn/ui components
- **Email**: Resend API integration
- **Analytics**: Custom IP tracking and visitor analytics

## 📧 Email Notifications

The system automatically sends email notifications when:
- New scores are submitted to the leaderboard
- Includes player name, score, word, and timestamp
- Delivered to the configured admin email address

## 🎯 Game Rules

### Valid Moves
- New word must contain at least 2 consecutive letters from the current word
- Letters must be contiguous (no gaps in the sequence)
- Only letters A-Z are allowed
- Minimum word length is 2 letters

### Scoring System
- **Edge sequences**: 1 point per letter
- **Inner sequences**: 2 points per letter (double points!)
- **Length bonus**: +1 point for each letter longer than the previous word
- **Time limit**: 60 seconds to maximize your score

### Examples
From "CORIANDER":
- "ARIA" → Uses "ARI" (inner sequence) = 6 points
- "ORDAIN" → Uses "OR" (edge sequence) = 2 points + length bonus

## 🚀 Deployment

The game is deployed on the Macaly platform with:
- Automatic scaling and hosting
- Real-time database synchronization
- Email delivery infrastructure
- Analytics and monitoring tools

## 📦 Self-Hosting (Static Export)

To build and self-host this application:

### Quick Build
```bash
./build.sh
```

This script will:
1. Install dependencies (if needed)
2. Build the static export
3. Create `innerwords-static-build.zip`

### Manual Build
```bash
npm install
npm run build
cd out && zip -r ../innerwords-static-build.zip . && cd ..
```

### Important Notes
⚠️ **This app requires Convex backend** - The static export contains frontend files only. You must keep your Convex deployment active for the app to function.

📖 **Full deployment guide**: See `BUILD_INSTRUCTIONS.md` for detailed hosting instructions including:
- Environment variable setup
- SPA fallback configuration for various web servers (Nginx, Apache)
- Deployment to Cloudflare Pages, Netlify, Vercel
- Troubleshooting common issues

## 📈 Analytics & Privacy

- **IP tracking** for visitor analytics (anonymized)
- **User agent detection** for device insights
- **Visit frequency** and engagement metrics
- **Privacy-focused** data collection

---

Created by Tom Kwei © 2025 | Powered by Macaly Platform



