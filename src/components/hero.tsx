"use client";

import { motion } from 'framer-motion';

export function Hero({ onExplore, onFeasibility }: { onExplore: () => void; onFeasibility: () => void }) {
  return (
    <section className="relative overflow-hidden px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <div className="absolute inset-0 -z-10 bg-solar-radial" />
      <div className="grid-overlay absolute inset-0 -z-20 opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-7xl flex-col gap-10 py-14 lg:min-h-[92vh] lg:flex-row lg:items-center"
      >
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-white/5 px-4 py-2 text-sm text-amber-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(247,183,51,0.9)]" />
            AI-Powered Solar Solutions for a Brighter Tomorrow
          </div>
          <h1 className="font-display section-title max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            HelioHub – Smart Solar Charging Station
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            A premium solar mobility platform combining battery intelligence, real-time monitoring, and Helios AI to deliver a futuristic charging experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={onExplore} className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-200">
              Explore Dashboard
            </button>
            <button onClick={onFeasibility} className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:scale-105 hover:bg-emerald-300/20">
              Check Solar Feasibility
            </button>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ['Solar Yield', '1.8 MWh/mo'],
              ['Grid Savings', '28% lower cost'],
              ['AI Readiness', 'Investor demo ready']
            ].map(([label, value]) => (
              <div key={label} className="surface-panel lift-card rounded-3xl px-4 py-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{label}</p>
                <p className="mt-3 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-emerald-300/10" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Live System Core</span>
              <span className="rounded-full border border-emerald-400/30 px-3 py-1 text-emerald-200">Operational</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Sun Harvest', '92%'],
                ['Battery Sync', '87%'],
                ['Output Stability', '95%'],
                ['AI Confidence', 'High']
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-cyan-400/10 bg-slate-950/50 p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Solar Glow Spectrum</span>
                <span className="animate-pulse text-amber-200">Tracking</span>
              </div>
              <div className="mt-4 h-40 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(247,183,51,0.32),transparent_36%),radial-gradient(circle_at_75%_25%,rgba(54,242,164,0.22),transparent_20%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.8))]" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

