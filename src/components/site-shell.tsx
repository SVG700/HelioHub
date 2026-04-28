"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { FiMenu, FiSun, FiX } from 'react-icons/fi';
import { HelioStateProvider, useHelioState } from './helio-state';
import { Footer } from './footer';
import { ThemeToggle } from './theme-toggle';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/ai-assistant', label: 'AI Assistant' },
  { href: '/feasibility-tool', label: 'Feasibility Tool' },
  { href: '/team', label: 'Team' }
];

function Navigation() {
  const pathname = usePathname();
  const { demoMode, setDemoMode } = useHelioState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Hidden admin shortcut: Ctrl/Cmd + Shift + D toggles demo mode for testing.
    const onKeyDown = (event: KeyboardEvent) => {
      const isModifier = event.ctrlKey || event.metaKey;
      if (isModifier && event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        setDemoMode((value) => !value);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setDemoMode]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040816]/80 backdrop-blur-xl">
      <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(247,183,51,0.9),rgba(54,242,164,0.85),transparent)]" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(247,183,51,0.34),rgba(54,242,164,0.12))] text-lg font-bold text-white shadow-[0_0_24px_rgba(247,183,51,0.24)] transition duration-200 group-hover:scale-105">
            <FiSun className="text-[1.05rem]" />
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.38em] text-amber-200/90 sm:text-base">HelioHub</p>
            <p className="text-sm text-slate-300">Smart Solar Charging Station</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {navigationItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-full px-4 py-2 text-sm transition ${active ? 'bg-gradient-to-r from-amber-300 to-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(247,183,51,0.18)]' : 'text-slate-300 hover:text-white'}`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-[linear-gradient(90deg,rgba(247,183,51,0),rgba(247,183,51,1),rgba(54,242,164,1),rgba(247,183,51,0))] transition-transform duration-300 group-hover:scale-x-100 ${active ? 'scale-x-100 shadow-[0_0_12px_rgba(247,183,51,0.65)]' : ''}`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className={`surface-panel hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] sm:flex ${demoMode ? 'text-emerald-100 shadow-[0_0_22px_rgba(54,242,164,0.16)]' : 'text-slate-300 opacity-80'}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${demoMode ? 'bg-emerald-300 shadow-[0_0_14px_rgba(54,242,164,0.8)]' : 'bg-slate-500'}`} />
            Demo Mode
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="surface-panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:border-amber-300/35 hover:text-white md:hidden"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
            className="mx-4 mb-4 rounded-2xl border border-white/10 bg-[#091427]/90 p-3 shadow-[0_18px_38px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:mx-6 md:hidden"
          >
            <div className="mb-2 border-b border-white/10 px-2 pb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Navigate
            </div>
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${active ? 'bg-gradient-to-r from-amber-300/95 to-emerald-300/90 font-semibold text-slate-950' : 'text-slate-200 hover:bg-white/5'}`}
                  >
                    <span>{item.label}</span>
                    {active ? <span className="h-2 w-2 rounded-full bg-slate-950/70" /> : null}
                  </Link>
                );
              })}
            </div>
            <div className={`mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] ${demoMode ? 'text-emerald-100' : 'text-slate-300'}`}>
              Demo Mode
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function TransitionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <HelioStateProvider>
      <div className="min-h-screen bg-[#040816] text-white">
        <ScrollProgress />
        <div className="fixed inset-0 -z-20 bg-solar-radial" />
        <div className="fixed inset-0 -z-10 opacity-40 blur-3xl">
          <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-400/20" />
          <div className="absolute right-10 top-48 h-80 w-80 rounded-full bg-emerald-400/18" />
        </div>
        <Navigation />
        <main>
          <TransitionShell>{children}</TransitionShell>
        </main>
        <Footer />
      </div>
    </HelioStateProvider>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-[linear-gradient(90deg,rgba(247,183,51,1),rgba(54,242,164,1),rgba(56,189,248,1))]"
      style={{ scaleX }}
    />
  );
}

