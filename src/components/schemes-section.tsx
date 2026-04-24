"use client";

import { useMemo, useState } from 'react';
import { SectionShell } from './section-shell';
import { regionOptions, schemes } from '@/lib/data';

export function SchemesSection() {
  const [region, setRegion] = useState('All');

  const filtered = useMemo(() => (region === 'All' ? schemes : schemes.filter((scheme) => scheme.region === region)), [region]);

  return (
    <SectionShell
      id="schemes"
      eyebrow="Government Schemes"
      title="Subsidy intelligence and regional filters"
      description="A curated demo layer with policy-style cards to make the project feel grounded in deployment reality."
    >
      <div className="mb-6 flex flex-wrap gap-3">
        {regionOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setRegion(option)}
            className={`rounded-full px-4 py-2 text-sm transition ${region === option ? 'bg-cyan-300 text-slate-950' : 'border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/30'}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((scheme) => (
          <div key={scheme.name} className="glass-card rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{scheme.region}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{scheme.name}</h3>
            <p className="mt-2 text-sm text-emerald-200">{scheme.amount}</p>
            <p className="mt-4 leading-7 text-slate-300">{scheme.description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}