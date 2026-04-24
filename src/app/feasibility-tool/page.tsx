"use client";

import { motion } from 'framer-motion';
import { FeasibilityTool } from '@/components/feasibility-tool';
import { useHelioState } from '@/components/helio-state';

export default function FeasibilityPage() {
  const { demoMode, scenario, syncScenarioContext, setSolarContext } = useHelioState();

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="glass-card rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Feasibility Tool</p>
          <h1 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">Solar viability analysis</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            A focused analysis page for sunlight, panel sizing, projected output, and Helios AI recommendations.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {(['high', 'medium', 'low'] as const).map((item) => (
              <button key={item} type="button" onClick={() => syncScenarioContext(item)} className={`rounded-full px-4 py-2 text-sm transition ${scenario === item ? 'bg-amber-300 text-slate-950' : 'surface-panel text-slate-200'}`}>
                {item === 'high' ? 'High Sunlight ☀️' : item === 'medium' ? 'Medium ⛅' : 'Low 🌧️'}
              </button>
            ))}
            <span className={`ml-auto rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${demoMode ? 'bg-emerald-300/15 text-emerald-100' : 'surface-panel text-slate-300'}`}>
              Demo Mode
            </span>
          </div>
        </motion.div>

        <div className="mt-6">
          <FeasibilityTool onResult={setSolarContext} scenario={scenario} demoMode={demoMode} />
        </div>
      </div>
    </section>
  );
}