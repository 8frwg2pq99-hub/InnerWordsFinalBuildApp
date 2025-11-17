import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import ChallengePageContent from '@/components/challenge-page-content';

export const metadata: Metadata = siteMetadata['/challenge'];

export default function ChallengePage() {
  return <ChallengePageContent />;
}

