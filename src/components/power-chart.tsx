"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function PowerChart() {
  const [powerData, setPowerData] = useState<number[]>([26, 27, 25, 28, 26, 29, 27, 25, 28, 26]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [telemetry, setTelemetry] = useState({
    voltage: 12.4,
    current: 2.1,
    power: 26.0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate realistic variations
      const newVoltage = 12.2 + Math.random() * 0.4;
      const newCurrent = 1.8 + Math.random() * 0.6;
      const newPower = Math.round((newVoltage * newCurrent) * 10) / 10;

      setTelemetry({
        voltage: Math.round(newVoltage * 10) / 10,
        current: Math.round(newCurrent * 10) / 10,
        power: newPower
      });

      setPowerData((prev) => {
        const newData = [...prev.slice(1), newPower];
        return newData;
      });

      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate SVG points for sparkline
  const maxPower = Math.max(...powerData, 35);
  const minPower = Math.min(...powerData, 15);
  const range = maxPower - minPower || 1;
  const chartHeight = 80;
  const chartWidth = 300;
  const pointSpacing = chartWidth / (powerData.length - 1);

  const points = powerData
    .map((value, index) => {
      const x = index * pointSpacing;
      const y = chartHeight - ((value - minPower) / range) * (chartHeight * 0.8) - 8;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          ['Voltage', telemetry.voltage.toFixed(1) + 'V'],
          ['Current', telemetry.current.toFixed(1) + 'A'],
          ['Power', telemetry.power.toFixed(1) + 'W']
        ].map(([k, v]) => (
          <motion.div
            key={k}
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: 'easeInOut' }}
            className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-[0_0_18px_rgba(255,255,255,0.03)]"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{k}</p>
            <p className="mt-2 text-lg font-semibold text-white">{v}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-amber-400/25 bg-[linear-gradient(180deg,rgba(250,204,21,0.06),rgba(250,204,21,0.02))] p-4 shadow-[0_0_30px_rgba(250,204,21,0.08)]">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Power Output (W)</p>
          <motion.span
            className="inline-block text-xs font-bold text-amber-300"
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            {telemetry.power.toFixed(1)}W
          </motion.span>
        </div>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="h-24 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="powerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#facc15" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[1, 2, 3].map((i) => (
            <line
              key={`grid-${i}`}
              x1="0"
              y1={(chartHeight / 4) * i}
              x2={chartWidth}
              y2={(chartHeight / 4) * i}
              stroke="#facc15"
              strokeWidth="0.5"
              opacity="0.1"
            />
          ))}
          {/* Area under line */}
          <polygon
            points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
            fill="url(#powerGradient)"
          />
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="#facc15"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Data points */}
          {powerData.map((_, index) => {
            const x = index * pointSpacing;
            const value = powerData[index];
            const y = chartHeight - ((value - minPower) / range) * (chartHeight * 0.8) - 8;
            return (
              <circle
                key={`point-${index}`}
                cx={x}
                cy={y}
                r="2.5"
                fill="#facc15"
                opacity={index === powerData.length - 1 ? 1 : 0.5}
              />
            );
          })}
        </svg>
      </div>

      {/* USB Port Status */}
      <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Charging Port Status
        </p>
        <div className="grid grid-cols-6 gap-2">
          {[
            { port: 1, status: 'Active', icon: '🟢' },
            { port: 2, status: 'Active', icon: '🟢' },
            { port: 3, status: 'Standby', icon: '🟡' },
            { port: 4, status: 'Empty', icon: '⚫' },
            { port: 5, status: 'Empty', icon: '⚫' },
            { port: 6, status: 'Empty', icon: '⚫' }
          ].map((portInfo) => (
            <motion.div
              key={`port-${portInfo.port}`}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center rounded-lg border border-white/10 bg-white/5 p-2 text-center transition hover:border-white/20"
              title={`Port ${portInfo.port}: ${portInfo.status}`}
            >
              <span className="text-lg">{portInfo.icon}</span>
              <p className="mt-1 text-xs font-semibold text-white">P{portInfo.port}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Status */}
      <div className="flex items-center justify-between rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2">
        <div className="flex items-center gap-2">
          <motion.span
            className="inline-block h-2 w-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-200">Live</p>
        </div>
        <p className="text-xs text-slate-400">
          Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
