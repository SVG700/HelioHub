"use client";

import { FiMoon } from 'react-icons/fi';

export function ThemeToggle() {
  return (
    <div className="surface-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-100">
      <FiMoon className="text-amber-200" />
      Dark Mode
      <span className="ml-1 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(54,242,164,0.8)]" aria-hidden="true" />
    </div>
  );
}

