"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Hero } from '@/components/hero';
import {
  FiActivity,
  FiAlertTriangle,
  FiArrowRight,
  FiBatteryCharging,
  FiBarChart2,
  FiCheckCircle,
  FiCloudLightning,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiShield,
  FiSun,
  FiTrendingUp,
  FiZap
} from 'react-icons/fi';

const sectionMotion = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.4 }
};

export default function HomePage() {
  const router = useRouter();

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Hero onExplore={() => router.push('/dashboard')} onFeasibility={() => router.push('/feasibility-tool')} />

        <motion.section {...sectionMotion} className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
          <article className="glass-card lift-card rounded-[2rem] border border-amber-300/10 p-5 shadow-[0_0_30px_rgba(247,183,51,0.06)] sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200">Problem</p>
            <h2 className="font-display mt-3 max-w-[28ch] text-2xl font-semibold text-white sm:text-3xl">Power reliability is still a daily challenge</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300 sm:mt-5 sm:leading-7">
              <p className="flex items-start gap-3 border-l-2 border-amber-300/70 pl-3"><span className="mt-0.5">⚡</span> Frequent power shortages interrupt charging access.</p>
              <p className="flex items-start gap-3 border-l-2 border-cyan-300/60 pl-3"><span className="mt-0.5">🌐</span> Grid dependency creates unstable service in remote zones.</p>
              <p className="flex items-start gap-3 border-l-2 border-emerald-300/60 pl-3"><span className="mt-0.5">📊</span> Rising demand needs smarter energy allocation and monitoring.</p>
            </div>
          </article>

          <article className="glass-card lift-card rounded-[2rem] border border-emerald-300/25 bg-[linear-gradient(145deg,rgba(9,19,39,0.92),rgba(54,242,164,0.08))] p-5 shadow-[0_0_35px_rgba(54,242,164,0.12)] sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-emerald-200">Solution</p>
            <h2 className="font-display mt-3 max-w-[28ch] text-2xl font-semibold text-white sm:text-3xl">HelioHub delivers AI-guided solar autonomy</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300 sm:mt-5 sm:leading-7">
              <p className="flex items-start gap-3 border-l-2 border-emerald-300/70 pl-3"><span className="mt-0.5">⚡</span> Intelligent charging orchestration with real-time control.</p>
              <p className="flex items-start gap-3 border-l-2 border-cyan-300/60 pl-3"><span className="mt-0.5">🔋</span> Battery-backed operation for outage resilience.</p>
              <p className="flex items-start gap-3 border-l-2 border-amber-300/60 pl-3"><span className="mt-0.5">📊</span> Predictive insights from Helios AI for better decisions.</p>
            </div>
          </article>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 glass-card rounded-[2rem] p-5 sm:mt-12 sm:p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">How It Works</p>
          <h2 className="font-display mt-3 max-w-[24ch] text-2xl font-semibold text-white sm:text-3xl">From sunlight to smart output</h2>
          <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-5">
            {[
              { step: 1, label: 'Solar Panel', desc: 'Captures sunlight', color: '#facc15', lightColor: 'rgba(250,204,21,0.15)', icon: '☀️' },
              { step: 2, label: 'Charge Controller', desc: 'Regulates voltage', color: '#f97316', lightColor: 'rgba(249,115,22,0.15)', icon: '⚙️' },
              { step: 3, label: 'Battery', desc: 'Stores energy', color: '#34d399', lightColor: 'rgba(52,211,153,0.15)', icon: '🔋' },
              { step: 4, label: 'DC-DC Converter', desc: 'Converts voltage', color: '#a78bfa', lightColor: 'rgba(167,139,250,0.15)', icon: '⚡' },
              { step: 5, label: 'USB Output', desc: 'Delivers power', color: '#60a5fa', lightColor: 'rgba(96,165,250,0.15)', icon: '🔌' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.12, duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <div 
                  className="relative flex h-24 w-24 items-center justify-center rounded-3xl border-2 shadow-lg"
                  style={{ 
                    backgroundColor: item.lightColor,
                    borderColor: item.color
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl opacity-50" style={{
                    background: `radial-gradient(circle, ${item.color}20, transparent 70%)`
                  }} />
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="mt-1 text-xs font-bold text-white" style={{ color: item.color }}>
                      STEP {item.step}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold text-white text-center">{item.label}</p>
                <p className="text-xs text-slate-400 text-center mt-1">{item.desc}</p>
                {index < 4 && (
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }}
                    className="mt-4 md:mt-6 text-slate-400"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 sm:mt-12">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Feature Highlights</p>
          <h2 className="font-display mt-3 max-w-[24ch] text-2xl font-semibold text-white sm:text-3xl">Explore core platform modules</h2>
          <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-3">
            {[
              { title: 'Smart Dashboard', description: 'Live telemetry, battery behavior, and animated flow analytics.', href: '/dashboard', icon: FiBarChart2, badge: '📊', border: 'border-t-cyan-400' },
              { title: 'Helios AI', description: 'Intent-aware assistant with confidence-based recommendations.', href: '/ai-assistant', icon: FiCpu, badge: '🤖', border: 'border-t-amber-300' },
              { title: 'Solar Feasibility Tool', description: 'Fast viability analysis for planning and deployment.', href: '/feasibility-tool', icon: FiSun, badge: '☀️', border: 'border-t-emerald-400' }
            ].map((item) => (
              <Link key={item.title} href={item.href} className={`glass-card lift-card group relative h-full overflow-hidden rounded-[2rem] border border-white/10 p-5 transition duration-300 hover:-translate-y-2 hover:border-amber-300/35 hover:shadow-[0_0_30px_rgba(247,183,51,0.16)] sm:p-6 ${item.border} border-t-2`}>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(247,183,51,0.24),rgba(54,242,164,0.1))] text-amber-100">
                  <span className="mr-1 text-lg">{item.badge}</span>
                  <item.icon />
                </div>
                <span className="text-xs uppercase tracking-[0.28em] text-slate-400 opacity-0 transition group-hover:opacity-100">→ Explore</span>
              </div>
              <h2 className="font-display mt-4 text-xl font-semibold text-white sm:mt-5 sm:text-2xl">{item.title}</h2>
              <p className="mt-2 max-w-[36ch] text-sm leading-6 text-slate-300 sm:mt-3 sm:leading-7">{item.description}</p>
            </Link>
          ))}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
          {[
            { text: 'Eco-friendly energy routing', icon: FiGlobe, accent: 'text-emerald-200', bg: 'bg-emerald-500/8 border-emerald-500/20' },
            { text: 'Reduces grid dependency', icon: FiZap, accent: 'text-amber-200', bg: 'bg-blue-500/8 border-blue-500/20' },
            { text: 'Effective for rural deployment', icon: FiLayers, accent: 'text-cyan-200', bg: 'bg-orange-500/8 border-orange-500/20' },
            { text: 'Emergency-ready architecture', icon: FiShield, accent: 'text-red-200', bg: 'bg-red-500/8 border-red-500/20' }
          ].map((impact) => (
            <article key={impact.text} className={`glass-card lift-card rounded-2xl border border-white/10 p-4 shadow-[0_0_20px_rgba(255,255,255,0.03)] sm:p-5 ${impact.bg}`}>
              <impact.icon className={`text-xl ${impact.accent}`} />
              <p className="mt-3 max-w-[30ch] text-sm font-semibold text-white">{impact.text}</p>
            </article>
          ))}
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="glass-card rounded-[2rem] p-5 shadow-[0_0_26px_rgba(247,183,51,0.06)] sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Mini Demo Preview</p>
            <h2 className="font-display mt-3 max-w-[24ch] text-2xl font-semibold text-white sm:text-3xl">Live snapshot of system performance</h2>
            <div className="mt-5 rounded-2xl border border-white/10 bg-[#071222] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] sm:mt-6 sm:p-5">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  ['Voltage', '12.4V'],
                  ['Current', '2.1A'],
                  ['Power', '26.0W']
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-[0_0_18px_rgba(255,255,255,0.03)]">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{k}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-24 rounded-xl border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(15,23,42,0.25))] shadow-[0_0_30px_rgba(34,211,238,0.08)]" />
            </div>
            <Link href="/dashboard" className="glow-button mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(54,242,164,0.2)] sm:mt-6">
              View Live Dashboard
              <FiArrowRight />
            </Link>
          </article>

          <article className="glass-card rounded-[2rem] border border-white/10 p-5 shadow-[0_0_26px_rgba(255,255,255,0.03)] sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">AI Capabilities</p>
            <h2 className="font-display mt-3 max-w-[20ch] text-2xl font-semibold text-white sm:text-3xl">Helios AI in action</h2>
            <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
              {[
                ['Energy prediction', 'Forecasts panel output from local sunlight trends and battery state.', '🔮'],
                ['Smart recommendations', 'Suggests panel sizing, storage balance, and port capacity changes.', '💡'],
                ['System monitoring', 'Tracks voltage, current, temperature, and load behavior in real time.', '📡']
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(9,19,39,0.75))] p-4 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 max-w-[38ch] text-sm leading-6 text-slate-300 sm:leading-7">{desc}</p>
                </div>
              ))}
            </div>
          </article>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 rounded-[2rem] border border-amber-300/25 bg-[linear-gradient(140deg,rgba(5,17,31,0.95),rgba(247,183,51,0.08),rgba(34,211,238,0.08))] p-6 text-center shadow-[0_0_35px_rgba(247,183,51,0.14)] sm:mt-12 sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Ready to explore HelioHub?</h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-6 text-slate-300 sm:leading-7">
            Navigate through our live modules to experience intelligent solar charging, AI insights, and simulation-ready operations.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6">
            <Link href="/dashboard" className="glow-button rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-7 py-4 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(54,242,164,0.22)]">Explore Dashboard →</Link>
            <Link href="/ai-assistant" className="glow-button rounded-full border border-amber-300/35 bg-amber-300/10 px-7 py-4 text-sm font-semibold text-amber-100 shadow-[0_0_24px_rgba(247,183,51,0.14)]">Try Helios AI →</Link>
          </div>
        </motion.section>

      </div>
    </section>
  );
}

