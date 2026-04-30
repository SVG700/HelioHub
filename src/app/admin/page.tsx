"use client";

import { AdminSessionGate } from '@/components/admin-auth';
import { AdminControlPanel } from '@/components/admin-control-panel';
import { clearAdminSession } from '@/lib/adminAuth';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  return (
    <AdminSessionGate>
      <AdminControlPanel
        onLogout={() => {
          clearAdminSession();
          router.replace('/admin/login');
        }}
      />
    </AdminSessionGate>
  );
}
