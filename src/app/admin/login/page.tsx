"use client";

import { useRouter } from 'next/navigation';
import { AdminLoginForm } from '@/components/admin-auth';

export default function AdminLoginPage() {
  const router = useRouter();

  return <AdminLoginForm onSuccess={() => router.replace('/admin')} />;
}
