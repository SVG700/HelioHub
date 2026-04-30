"use client";

import { motion } from 'framer-motion';
import { FiCpu, FiZap } from 'react-icons/fi';

export function Hero({ onExplore, onFeasibility }: { onExplore: () => void; onFeasibility: () => void }) {
  return (
    <section className="relative overflow-hidden px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <div className="absolute inset-0 -z-10 bg-solar-radial" />
      <div className="grid-overlay absolute inset-0 -z-20 opacity-20" />
      
      {/* Subtle background energy grid */}
      <svg
        className="absolute inset-0 -z-20 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="energyGrid" x="40" y="40" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="1.5" fill="#facc15" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="40" cy="40" r="3" fill="none" stroke="#facc15" strokeWidth="0.5" opacity="0.4">
              <animate attributeName="r" values="3;6;3" dur="4s" repeatCount="indefinite" />
            </circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#energyGrid)" />
      </svg>
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

        {/* Solar System Animation - Desktop and Mobile */}
        <div className="mx-auto hidden w-full max-w-xl flex-col items-center justify-center lg:flex">
          <svg 
            viewBox="0 0 400 400" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full drop-shadow-[0_0_30px_rgba(250,204,21,0.25)]"
          >
            {/* Animated Sun */}
            <circle cx="200" cy="100" r="40" fill="#facc15" opacity="0.9">
              <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
            </circle>
            
            {/* Sun rays rotating */}
            <g>
              <animateTransform attributeName="transform" type="rotate" 
                from="0 200 100" to="360 200 100" dur="20s" repeatCount="indefinite"/>
              <line x1="200" y1="45" x2="200" y2="30" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="200" y1="155" x2="200" y2="170" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="145" y1="100" x2="130" y2="100" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="255" y1="100" x2="270" y2="100" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="159" y1="59" x2="148" y2="48" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="241" y1="141" x2="252" y2="152" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="241" y1="59" x2="252" y2="48" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="159" y1="141" x2="148" y2="152" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
            </g>

            {/* Solar Panel */}
            <rect x="140" y="170" width="120" height="80" rx="5" 
              fill="none" stroke="#60a5fa" strokeWidth="2"/>
            <line x1="200" y1="170" x2="200" y2="250" stroke="#60a5fa" strokeWidth="1" opacity="0.5"/>
            <line x1="140" y1="210" x2="260" y2="210" stroke="#60a5fa" strokeWidth="1" opacity="0.5"/>
            <rect x="145" y="175" width="50" height="30" fill="#1e40af" opacity="0.6"/>
            <rect x="205" y="175" width="50" height="30" fill="#1e40af" opacity="0.6"/>
            <rect x="145" y="215" width="50" height="30" fill="#1e40af" opacity="0.6"/>
            <rect x="205" y="215" width="50" height="30" fill="#1e40af" opacity="0.6"/>

            {/* Energy flow line from panel to battery */}
            <path d="M 200 250 L 200 290" stroke="#facc15" strokeWidth="2" 
              strokeDasharray="5,5">
              <animate attributeName="strokeDashoffset" values="0;-20" 
                dur="1s" repeatCount="indefinite"/>
            </path>

            {/* Battery */}
            <rect x="160" y="290" width="80" height="50" rx="5" 
              fill="none" stroke="#34d399" strokeWidth="2"/>
            <rect x="185" y="283" width="30" height="8" rx="2" fill="#34d399"/>
            <rect x="165" y="295" width="50" height="35" rx="3" fill="#065f46" opacity="0.8">
              <animate attributeName="width" values="10;50;10" dur="4s" repeatCount="indefinite"/>
            </rect>
            <text x="200" y="318" textAnchor="middle" fill="#34d399" fontSize="10">
              BATTERY
            </text>

            {/* Energy flow line from battery to output */}
            <path d="M 200 340 L 200 370" stroke="#34d399" strokeWidth="2" 
              strokeDasharray="5,5">
              <animate attributeName="strokeDashoffset" values="0;-20" 
                dur="1s" repeatCount="indefinite"/>
            </path>

            {/* USB Output */}
            <rect x="150" y="370" width="100" height="30" rx="5" 
              fill="none" stroke="#a78bfa" strokeWidth="2"/>
            <text x="200" y="390" textAnchor="middle" fill="#a78bfa" fontSize="10">
              USB OUTPUT
            </text>

            {/* Glow effects */}
            <circle cx="200" cy="100" r="60" fill="#facc15" opacity="0.05">
              <animate attributeName="r" values="60;70;60" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.05;0.1;0.05" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* Mobile Solar System Animation */}
        <div className="mx-auto flex w-full flex-col items-center justify-center lg:hidden">
          <svg 
            viewBox="0 0 400 400" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full max-w-sm drop-shadow-[0_0_30px_rgba(250,204,21,0.25)]"
          >
            {/* Animated Sun */}
            <circle cx="200" cy="100" r="40" fill="#facc15" opacity="0.9">
              <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
            </circle>
            
            {/* Sun rays rotating */}
            <g>
              <animateTransform attributeName="transform" type="rotate" 
                from="0 200 100" to="360 200 100" dur="20s" repeatCount="indefinite"/>
              <line x1="200" y1="45" x2="200" y2="30" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="200" y1="155" x2="200" y2="170" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="145" y1="100" x2="130" y2="100" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="255" y1="100" x2="270" y2="100" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="159" y1="59" x2="148" y2="48" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="241" y1="141" x2="252" y2="152" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="241" y1="59" x2="252" y2="48" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
              <line x1="159" y1="141" x2="148" y2="152" stroke="#facc15" strokeWidth="3" opacity="0.7"/>
            </g>

            {/* Solar Panel */}
            <rect x="140" y="170" width="120" height="80" rx="5" 
              fill="none" stroke="#60a5fa" strokeWidth="2"/>
            <line x1="200" y1="170" x2="200" y2="250" stroke="#60a5fa" strokeWidth="1" opacity="0.5"/>
            <line x1="140" y1="210" x2="260" y2="210" stroke="#60a5fa" strokeWidth="1" opacity="0.5"/>
            <rect x="145" y="175" width="50" height="30" fill="#1e40af" opacity="0.6"/>
            <rect x="205" y="175" width="50" height="30" fill="#1e40af" opacity="0.6"/>
            <rect x="145" y="215" width="50" height="30" fill="#1e40af" opacity="0.6"/>
            <rect x="205" y="215" width="50" height="30" fill="#1e40af" opacity="0.6"/>

            {/* Energy flow line from panel to battery */}
            <path d="M 200 250 L 200 290" stroke="#facc15" strokeWidth="2" 
              strokeDasharray="5,5">
              <animate attributeName="strokeDashoffset" values="0;-20" 
                dur="1s" repeatCount="indefinite"/>
            </path>

            {/* Battery */}
            <rect x="160" y="290" width="80" height="50" rx="5" 
              fill="none" stroke="#34d399" strokeWidth="2"/>
            <rect x="185" y="283" width="30" height="8" rx="2" fill="#34d399"/>
            <rect x="165" y="295" width="50" height="35" rx="3" fill="#065f46" opacity="0.8">
              <animate attributeName="width" values="10;50;10" dur="4s" repeatCount="indefinite"/>
            </rect>
            <text x="200" y="318" textAnchor="middle" fill="#34d399" fontSize="10">
              BATTERY
            </text>

            {/* Energy flow line from battery to output */}
            <path d="M 200 340 L 200 370" stroke="#34d399" strokeWidth="2" 
              strokeDasharray="5,5">
              <animate attributeName="strokeDashoffset" values="0;-20" 
                dur="1s" repeatCount="indefinite"/>
            </path>

            {/* USB Output */}
            <rect x="150" y="370" width="100" height="30" rx="5" 
              fill="none" stroke="#a78bfa" strokeWidth="2"/>
            <text x="200" y="390" textAnchor="middle" fill="#a78bfa" fontSize="10">
              USB OUTPUT
            </text>

            {/* Glow effects */}
            <circle cx="200" cy="100" r="60" fill="#facc15" opacity="0.05">
              <animate attributeName="r" values="60;70;60" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.05;0.1;0.05" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

