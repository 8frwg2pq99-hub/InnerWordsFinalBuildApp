import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import LeaderboardPageContent from '@/components/leaderboard-page-content';

export const metadata: Metadata = siteMetadata['/leaderboards'];

export default function LeaderboardsPage() {
  return <LeaderboardPageContent />;
}

