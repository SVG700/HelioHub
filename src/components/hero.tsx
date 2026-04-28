"use client";

import { motion } from 'framer-motion';
import { FiCpu, FiZap } from 'react-icons/fi';

export function Hero({ onExplore, onFeasibility }: { onExplore: () => void; onFeasibility: () => void }) {
  return (
    <section className="relative overflow-hidden px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <div className="absolute inset-0 -z-10 bg-solar-radial" />
      <div className="grid-overlay absolute inset-0 -z-20 opacity-20" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ backgroundPositionX: ['0%', '100%'] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 28, ease: 'linear' }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(247,183,51,0.14), transparent 0 16%), radial-gradient(circle at 75% 25%, rgba(54,242,164,0.10), transparent 0 14%), radial-gradient(circle at 60% 80%, rgba(56,189,248,0.08), transparent 0 12%)',
          backgroundSize: '120% 120%'
        }}
      />
      {Array.from({ length: 7 }).map((_, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-1.5 w-1.5 rounded-full bg-amber-200/60 shadow-[0_0_18px_rgba(247,183,51,0.75)]"
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ opacity: [0.2, 0.8, 0.25], y: [0, -40, 0], x: [0, 18, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6 + index, delay: index * 0.35, ease: 'easeInOut' }}
          style={{ left: `${14 + index * 11}%`, top: `${18 + (index % 3) * 16}%` }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-7xl flex-col gap-10 py-14 lg:min-h-[92vh] lg:flex-row lg:items-center"
      >
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-white/5 px-4 py-2 text-sm text-amber-100 backdrop-blur">
            <motion.span
              className="text-lg"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.08, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3.8 }}
            >
              ☀️
            </motion.span>
            AI-Powered Solar Solutions for a Brighter Tomorrow
          </div>
          <h1 className="font-display section-title max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="block text-white sm:text-transparent sm:bg-clip-text sm:bg-[linear-gradient(90deg,#fff7d6_0%,#f7b733_35%,#36f2a4_70%,#8adfff_100%)] sm:animate-[shine_6s_linear_infinite]">HelioHub</span>
            <span className="mt-2 block text-4xl font-bold text-white/95 sm:text-5xl lg:text-6xl">Smart Solar Charging Station</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            A premium solar mobility platform combining battery intelligence, real-time monitoring, and Helios AI to deliver a futuristic charging experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={onExplore} className="glow-button rounded-full border border-cyan-200/40 bg-[linear-gradient(145deg,rgba(34,211,238,0.95),rgba(54,242,164,0.92))] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_26px_rgba(34,211,238,0.28)] transition hover:scale-105">
              Explore Dashboard
            </button>
            <button onClick={onFeasibility} className="glow-button rounded-full border border-amber-300/35 bg-[linear-gradient(145deg,rgba(247,183,51,0.18),rgba(255,143,31,0.12))] px-6 py-3 text-sm font-semibold text-amber-100 shadow-[0_0_24px_rgba(247,183,51,0.16)] transition hover:scale-105 hover:border-amber-300/55">
              Check Solar Feasibility
            </button>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Solar Panel Capacity', value: '50W Panel', icon: '☀️' },
              { label: 'Battery Storage', value: '12V 20Ah Battery', icon: '🔋' },
              { label: 'Charging Ports', value: '6 USB Ports', icon: '🔌' }
            ].map((stat) => (
              <div key={stat.label} className="surface-panel lift-card rounded-3xl border border-amber-300/15 px-4 py-4 shadow-[0_0_0_1px_rgba(247,183,51,0.04),0_0_24px_rgba(247,183,51,0.04)] hover:border-amber-300/35 hover:shadow-[0_0_26px_rgba(247,183,51,0.14)]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{stat.label}</p>
                  <span className="text-lg">{stat.icon}</span>
                </div>
                <p className="mt-3 text-xl font-bold text-white sm:text-2xl">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-emerald-300/10" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(54,242,164,0.8)]" /> Live System Core</span>
              <span className="rounded-full border border-emerald-400/30 px-3 py-1 text-emerald-200">Operational</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Sun Harvest', '92%'],
                ['Battery Sync', '87%'],
                ['Output Stability', '95%'],
                ['AI Confidence', 'High']
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_18px_rgba(255,255,255,0.03)]">
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

