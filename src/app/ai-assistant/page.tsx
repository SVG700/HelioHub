"use client";

import { motion } from 'framer-motion';
import { HeliosChat } from '@/components/helios-chat';
import { useHelioState } from '@/components/helio-state';

export default function AIAssistantPage() {
  const { demoMode, scenario, scenarioSignal, solarContext } = useHelioState();

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="glass-card rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">AI Assistant</p>
          <h1 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">Helios AI for solar decisions</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            AI-Powered Intelligence for solar decisions with Gemini-backed context-aware analysis.
          </p>
        </motion.div>

        <div className="mt-6">
          <HeliosChat context={solarContext} demoMode={demoMode} scenario={scenario} scenarioSignal={scenarioSignal} />
        </div>
      </div>
    </section>
  );
}

