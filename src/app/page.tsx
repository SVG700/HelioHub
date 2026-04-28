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
          <div className="mt-5 grid gap-3 sm:mt-6 md:grid-cols-5">
            {[
              { label: 'Solar Panel', icon: FiSun, tone: 'from-amber-300/30 to-amber-100/10', accent: 'text-amber-100' },
              { label: 'Charge Controller', icon: FiLayers, tone: 'from-orange-300/28 to-orange-100/8', accent: 'text-orange-100' },
              { label: 'Battery', icon: FiBatteryCharging, tone: 'from-cyan-300/28 to-cyan-100/8', accent: 'text-cyan-100' },
              { label: 'DC-DC Converter', icon: FiActivity, tone: 'from-violet-300/28 to-violet-100/8', accent: 'text-violet-100' },
              { label: 'Output', icon: FiZap, tone: 'from-emerald-300/28 to-emerald-100/8', accent: 'text-emerald-100' }
            ].map((step, index) => (
              <div key={step.label} className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${step.tone} p-4 text-center shadow-[0_0_20px_rgba(255,255,255,0.03)]`}>
                <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ${step.accent}`}>
                  <step.icon />
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{step.label}</p>
                {index < 4 ? <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }} className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-cyan-200 md:block"><FiArrowRight /></motion.div> : null}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 sm:mt-12">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Feature Highlights</p>
          <h2 className="font-display mt-3 max-w-[24ch] text-2xl font-semibold text-white sm:text-3xl">Explore core platform modules</h2>
          <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-3">
            {[
              { title: 'Smart Dashboard', description: 'Live telemetry, battery behavior, and animated flow analytics.', href: '/dashboard', icon: FiBarChart2, badge: '📊' },
              { title: 'Helios AI', description: 'Intent-aware assistant with confidence-based recommendations.', href: '/ai-assistant', icon: FiCpu, badge: '🤖' },
              { title: 'Solar Feasibility Tool', description: 'Fast viability analysis for planning and deployment.', href: '/feasibility-tool', icon: FiSun, badge: '☀️' }
            ].map((item) => (
              <Link key={item.title} href={item.href} className="glass-card lift-card group rounded-[2rem] border border-white/10 p-5 transition duration-300 hover:-translate-y-2 hover:border-amber-300/35 hover:shadow-[0_0_30px_rgba(247,183,51,0.16)] sm:p-6">
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
            { text: 'Eco-friendly energy routing', icon: FiGlobe, accent: 'text-emerald-200' },
            { text: 'Reduces grid dependency', icon: FiZap, accent: 'text-amber-200' },
            { text: 'Effective for rural deployment', icon: FiLayers, accent: 'text-cyan-200' },
            { text: 'Emergency-ready architecture', icon: FiShield, accent: 'text-red-200' }
          ].map((impact) => (
            <article key={impact.text} className="glass-card lift-card rounded-2xl border border-white/10 p-4 shadow-[0_0_20px_rgba(255,255,255,0.03)] sm:p-5">
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
                  ['Voltage', '49.8V'],
                  ['Current', '12.7A'],
                  ['Power', '632W']
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

