import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import DailyChallengeHome from '@/components/daily-challenge-home';

export const metadata: Metadata = siteMetadata['/'];

export default function HomePage() {
  return <DailyChallengeHome />;
}


