import type { Metadata } from 'next';
import ArchivePageContent from '@/components/archive-page-content';

export const metadata: Metadata = {
  title: 'Challenge Archive - InnerWords',
  description: 'Browse and replay past InnerWords daily challenges. Beat your previous scores and climb the leaderboards.',
};

export default function ArchivePage() {
  return <ArchivePageContent />;
}
