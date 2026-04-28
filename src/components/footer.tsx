"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/ai-assistant', label: 'AI Assistant' },
  { href: '/feasibility-tool', label: 'Feasibility Tool' },
  { href: '/team', label: 'Team' }
];

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 280);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative mt-10 border-t border-cyan-300/10 bg-[#030712]/95 px-4 pb-8 pt-12 text-sm text-slate-300 shadow-[0_-10px_50px_rgba(0,0,0,0.3)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-white">HelioHub</p>
          <p className="mt-3 max-w-sm leading-7 text-slate-400">AI-Powered Solar Solutions for a Brighter Tomorrow</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Quick Links</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-1">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="w-fit text-slate-300 transition hover:translate-x-1 hover:text-amber-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Credits</p>
          <p className="mt-4 leading-7 text-slate-300">Developed by Samhith V Gupta, Madhan B V, and Ruchika Amol Patil.</p>
          <p className="mt-1 leading-7 text-slate-300">Presidency University, Bangalore</p>
          <p className="mt-1 leading-7 text-slate-300">Guided by Dr. Divyarani M S.</p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs uppercase tracking-[0.25em] text-slate-500">
        HelioHub Platform
      </div>

      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="glow-button fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-[#081426]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100 shadow-[0_0_24px_rgba(247,183,51,0.2)]"
          aria-label="Scroll to top"
        >
          <FiArrowUp />
          Top
        </button>
      ) : null}
    </footer>
  );
}

