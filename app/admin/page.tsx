import type { Metadata } from 'next';
import AdminDashboard from '@/components/admin-dashboard';

export const metadata: Metadata = {
  title: 'InnerWords Admin Dashboard',
  description: 'View game statistics and unique IP tracking data',
};

export default function AdminPage() {
  return <AdminDashboard />;
}