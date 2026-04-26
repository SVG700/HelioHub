"use client";

import { motion } from 'framer-motion';
import { DashboardSection } from '@/components/dashboard-section';
import { useHelioState } from '@/components/helio-state';

export default function DashboardPage() {
  const { demoMode, scenario, syncScenarioContext } = useHelioState();

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="glass-card rounded-[2rem] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Dashboard</p>
              <h1 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">Live solar operations</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                A focused control room for telemetry, storage, and generation. Demo Mode keeps the data moving for presentations and investor demos.
              </p>
            </div>
            <div className={`rounded-full px-4 py-3 text-sm font-semibold ${demoMode ? 'bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300 text-slate-950 shadow-[0_0_18px_rgba(247,183,51,0.26)]' : 'surface-panel text-slate-200'}`}>
              Demo Mode
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {(['high', 'medium', 'low'] as const).map((item) => (
              <button key={item} type="button" onClick={() => syncScenarioContext(item)} className={`rounded-full px-4 py-2 text-sm transition ${scenario === item ? 'bg-amber-300 text-slate-950' : 'surface-panel text-slate-200'}`}>
                {item === 'high' ? 'High Sunlight ☀️' : item === 'medium' ? 'Medium ⛅' : 'Low 🌧️'}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-6">
          <DashboardSection demoMode={demoMode} scenario={scenario} />
        </div>
      </div>
    </section>
  );
}

