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
          <article className="glass-card rounded-[2rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Problem</p>
            <h2 className="font-display mt-3 max-w-[28ch] text-2xl font-semibold text-white sm:text-3xl">Power reliability is still a daily challenge</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300 sm:mt-5 sm:leading-7">
              <p className="flex items-start gap-3"><FiAlertTriangle className="mt-1 text-amber-200" /> Frequent power shortages interrupt charging access.</p>
              <p className="flex items-start gap-3"><FiCloudLightning className="mt-1 text-amber-200" /> Grid dependency creates unstable service in remote zones.</p>
              <p className="flex items-start gap-3"><FiTrendingUp className="mt-1 text-amber-200" /> Rising demand needs smarter energy allocation and monitoring.</p>
            </div>
          </article>

          <article className="glass-card rounded-[2rem] border border-emerald-300/25 bg-[linear-gradient(145deg,rgba(9,19,39,0.92),rgba(54,242,164,0.08))] p-5 shadow-[0_0_35px_rgba(54,242,164,0.12)] sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Solution</p>
            <h2 className="font-display mt-3 max-w-[28ch] text-2xl font-semibold text-white sm:text-3xl">HelioHub delivers AI-guided solar autonomy</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300 sm:mt-5 sm:leading-7">
              <p className="flex items-start gap-3"><FiCheckCircle className="mt-1 text-emerald-300" /> Intelligent charging orchestration with real-time control.</p>
              <p className="flex items-start gap-3"><FiCheckCircle className="mt-1 text-emerald-300" /> Battery-backed operation for outage resilience.</p>
              <p className="flex items-start gap-3"><FiCheckCircle className="mt-1 text-emerald-300" /> Predictive insights from Helios AI for better decisions.</p>
            </div>
          </article>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 glass-card rounded-[2rem] p-5 sm:mt-12 sm:p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">How It Works</p>
          <h2 className="font-display mt-3 max-w-[24ch] text-2xl font-semibold text-white sm:text-3xl">From sunlight to smart output</h2>
          <div className="mt-5 grid gap-3 sm:mt-6 md:grid-cols-5">
            {[
              { label: 'Solar Panel', icon: FiSun },
              { label: 'Charge Controller', icon: FiLayers },
              { label: 'Battery', icon: FiBatteryCharging },
              { label: 'DC-DC Converter', icon: FiActivity },
              { label: 'Output', icon: FiZap }
            ].map((step, index) => (
              <div key={step.label} className="relative rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(145deg,rgba(247,183,51,0.24),rgba(54,242,164,0.1))] text-amber-100">
                  <step.icon />
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{step.label}</p>
                {index < 4 ? <FiArrowRight className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-cyan-200 md:block" /> : null}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 sm:mt-12">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Feature Highlights</p>
          <h2 className="font-display mt-3 max-w-[24ch] text-2xl font-semibold text-white sm:text-3xl">Explore core platform modules</h2>
          <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-3">
            {[
              { title: 'Smart Dashboard', description: 'Live telemetry, battery behavior, and animated flow analytics.', href: '/dashboard', icon: FiBarChart2 },
              { title: 'Helios AI', description: 'Intent-aware assistant with confidence-based recommendations.', href: '/ai-assistant', icon: FiCpu },
              { title: 'Solar Feasibility Tool', description: 'Fast viability analysis for planning and deployment.', href: '/feasibility-tool', icon: FiSun }
            ].map((item) => (
              <Link key={item.title} href={item.href} className="glass-card lift-card group rounded-[2rem] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(247,183,51,0.24),rgba(54,242,164,0.1))] text-amber-100">
                  <item.icon />
                </div>
                <FiArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-amber-200" />
              </div>
              <h2 className="font-display mt-4 text-xl font-semibold text-white sm:mt-5 sm:text-2xl">{item.title}</h2>
              <p className="mt-2 max-w-[36ch] text-sm leading-6 text-slate-300 sm:mt-3 sm:leading-7">{item.description}</p>
            </Link>
          ))}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
          {[
            { text: 'Eco-friendly energy routing', icon: FiGlobe },
            { text: 'Reduces grid dependency', icon: FiZap },
            { text: 'Effective for rural deployment', icon: FiLayers },
            { text: 'Emergency-ready architecture', icon: FiShield }
          ].map((impact) => (
            <article key={impact.text} className="glass-card lift-card rounded-2xl p-4 sm:p-5">
              <impact.icon className="text-xl text-emerald-200" />
              <p className="mt-3 max-w-[30ch] text-sm font-semibold text-white">{impact.text}</p>
            </article>
          ))}
        </motion.section>

        <motion.section {...sectionMotion} className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="glass-card rounded-[2rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Mini Demo Preview</p>
            <h2 className="font-display mt-3 max-w-[24ch] text-2xl font-semibold text-white sm:text-3xl">Live snapshot of system performance</h2>
            <div className="mt-5 rounded-2xl border border-white/10 bg-[#071222] p-4 sm:mt-6 sm:p-5">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  ['Voltage', '49.8V'],
                  ['Current', '12.7A'],
                  ['Power', '632W']
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{k}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-24 rounded-xl border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(15,23,42,0.25))]" />
            </div>
            <Link href="/dashboard" className="glow-button mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 sm:mt-6">
              View Live Dashboard
              <FiArrowRight />
            </Link>
          </article>

          <article className="glass-card rounded-[2rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">AI Capabilities</p>
            <h2 className="font-display mt-3 max-w-[20ch] text-2xl font-semibold text-white sm:text-3xl">Helios AI in action</h2>
            <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
              {[
                ['Energy prediction', 'Forecasts generation patterns using sunlight context.'],
                ['Smart recommendations', 'Suggests panel sizing and deployment adjustments.'],
                ['System monitoring', 'Tracks anomalies in voltage, current, and thermal behavior.']
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
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
            <Link href="/dashboard" className="glow-button rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-6 py-3 text-sm font-semibold text-slate-950">Explore Dashboard</Link>
            <Link href="/ai-assistant" className="glow-button rounded-full border border-amber-300/35 bg-amber-300/10 px-6 py-3 text-sm font-semibold text-amber-100">Try Helios AI</Link>
          </div>
        </motion.section>

      </div>
    </section>
  );
}

