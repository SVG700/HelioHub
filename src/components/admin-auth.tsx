"use client";

import Link from 'next/link';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiLock, FiSun } from 'react-icons/fi';
import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  clearAdminSession,
  createAdminSession,
  readAdminSession,
  storeAdminSession
} from '@/lib/adminAuth';

export function AdminSessionGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = readAdminSession();
    if (!session) {
      router.replace('/admin/login');
      return;
    }

    setReady(true);

    const timeout = window.setTimeout(() => {
      clearAdminSession();
      router.replace('/admin/login');
    }, Math.max(0, session.expiresAt - Date.now()));

    const interval = window.setInterval(() => {
      if (!readAdminSession()) {
        clearAdminSession();
        router.replace('/admin/login');
      }
    }, 60_000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [router]);

  if (!ready) {
    return (
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-center rounded-[2rem] border border-white/10 bg-[#08111f] p-10 text-slate-300 shadow-[0_0_30px_rgba(0,0,0,0.25)]">
          <div className="text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2, ease: 'linear' }} className="mx-auto h-10 w-10 rounded-full border-2 border-amber-300/30 border-t-amber-300" />
            <p className="mt-4 text-sm uppercase tracking-[0.28em] text-slate-400">Verifying admin session</p>
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}

export function AdminLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const session = readAdminSession();
    if (session) {
      router.replace('/admin');
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (username.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        throw new Error('Invalid username or password.');
      }

      const session = createAdminSession();
      storeAdminSession(session);
      onSuccess();
      router.replace('/admin');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card rounded-[2rem] border border-amber-300/15 p-6 shadow-[0_0_30px_rgba(247,183,51,0.08)]">
          <Link href="/" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-amber-300/35 hover:text-white">
            <FiSun className="text-amber-200" />
            Back to HelioHub
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.32em] text-cyan-200">Admin Access</p>
          <h1 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">HelioHub Admin Login</h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            Use the manual control panel to enter live sensor readings, push demo presets, and mirror the current system state to the dashboard in real time.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Credentials</p>
            <p className="mt-2">Username: <span className="text-amber-200">{ADMIN_USERNAME}</span></p>
            <p>Password: <span className="text-amber-200">admin2024</span></p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">Session expires after 2 hours</p>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-[0_0_30px_rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-100">
              <FiLock />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-amber-200">Secure Sign In</p>
              <p className="text-sm text-slate-400">Hardcoded access for admin operations</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm text-slate-300">Username</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                placeholder="heliohub"
                autoComplete="username"
              />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                placeholder="admin2024"
                autoComplete="current-password"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="glow-button inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Enter Admin Panel'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
