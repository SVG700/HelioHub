"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionShell } from './section-shell';
import { estimateSolarOutcome } from '@/lib/solar';
import { FiActivity, FiDollarSign, FiTarget, FiZap } from 'react-icons/fi';

type DemoScenario = 'high' | 'medium' | 'low';

const scenarioDefaults: Record<DemoScenario, { location: string; sunlightHours: number }> = {
  high: { location: 'Rajasthan', sunlightHours: 8.6 },
  medium: { location: 'Chennai', sunlightHours: 6.5 },
  low: { location: 'Bengaluru Rain Belt', sunlightHours: 3.8 }
};

export function FeasibilityTool({
  onResult,
  scenario,
  demoMode
}: {
  onResult: (context: { location: string; sunlightHours: number; feasibility: string; energy: string; panels: string; savings: string }) => void;
  scenario: DemoScenario;
  demoMode: boolean;
}) {
  const [location, setLocation] = useState('Chennai');
  const [sunlightHours, setSunlightHours] = useState(6.5);

  const result = useMemo(() => estimateSolarOutcome(location, sunlightHours), [location, sunlightHours]);
  const sunlightProgress = Math.round((sunlightHours / 10) * 100);

  useEffect(() => {
    if (!demoMode) return;

    const defaults = scenarioDefaults[scenario];
    setLocation(defaults.location);
    setSunlightHours(defaults.sunlightHours);
  }, [scenario, demoMode]);

  useEffect(() => {
    onResult({
      location,
      sunlightHours,
      feasibility: result.feasibility,
      energy: result.energy,
      panels: result.panels,
      savings: result.savings
    });
  }, [location, sunlightHours, result.feasibility, result.energy, result.panels, result.savings, onResult]);

  const resultCards = [
    { label: 'Feasibility', value: result.feasibility.toUpperCase(), icon: FiTarget },
    { label: 'Panels', value: result.panels, icon: FiZap },
    { label: 'Energy', value: result.energy, icon: FiActivity },
    { label: 'Savings', value: result.savings, icon: FiDollarSign }
  ];

  return (
    <SectionShell
      id="feasibility"
      eyebrow="Solar Feasibility"
      title="Evaluate deployment potential in seconds"
      description="A simulation-based planner that estimates performance, panel sizing, and savings while generating an intelligent Helios AI recommendation."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-card lift-card rounded-[2rem] p-6">
          <label className="block text-sm text-slate-300">Location</label>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/50"
            placeholder="Enter city, region, or site name"
          />

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Sunlight hours</span>
              <span>{sunlightHours.toFixed(1)} hrs/day</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="0.1"
              value={sunlightHours}
              onChange={(event) => setSunlightHours(Number(event.target.value))}
              className="mt-3 w-full accent-amber-300"
            />
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>Sunlight Readiness</span>
              <span>{sunlightProgress}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div animate={{ width: `${sunlightProgress}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {resultCards.map((card) => (
              <motion.div key={card.label} layout className="surface-panel lift-card rounded-3xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
                  <card.icon className="text-base text-amber-200" />
                </div>
                <p className="mt-3 text-lg font-semibold text-white">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div key={result.recommendation} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="glass-card lift-card rounded-[2rem] p-6">
          <div className="rounded-3xl border border-amber-300/10 bg-[linear-gradient(145deg,rgba(247,183,51,0.08),rgba(54,242,164,0.04))] p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Helios AI Recommendation</p>
            <p className="mt-4 text-lg leading-8 text-slate-100">{result.recommendation}</p>
          </div>
          <button
            type="button"
            onClick={() => onResult({ location, sunlightHours, feasibility: result.feasibility, energy: result.energy, panels: result.panels, savings: result.savings })}
            className="glow-button mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950"
          >
            Use this data in Helios AI
          </button>
          <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-emerald-300/5 p-5 text-sm leading-7 text-slate-300">
            A higher sunlight score increases feasibility, panel efficiency, and projected savings while improving confidence in charging reliability. The current site profile is framed as a product-grade deployment rather than a prototype.
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}