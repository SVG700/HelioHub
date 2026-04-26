"use client";

import { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { SectionShell } from './section-shell';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type DemoScenario = 'high' | 'medium' | 'low';

type Telemetry = {
  voltage: number;
  current: number;
  battery: number;
  temperature: number;
};

const scenarioRanges: Record<DemoScenario, { voltage: [number, number]; current: [number, number]; temperature: [number, number]; generation: [number, number]; consumption: [number, number] }> = {
  high: { voltage: [49, 54], current: [12.8, 18], temperature: [28, 38], generation: [33, 50], consumption: [19, 33] },
  medium: { voltage: [46, 52], current: [9.5, 14], temperature: [30, 40], generation: [21, 38], consumption: [17, 30] },
  low: { voltage: [43, 49], current: [6.2, 10.2], temperature: [27, 35], generation: [9, 24], consumption: [15, 28] }
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function stepValue(current: number, min: number, max: number, drift = 0.8) {
  const next = current + (Math.random() - 0.5) * drift;
  return Number(clamp(next, min, max).toFixed(1));
}

function makeTelemetryForScenario(scenario: DemoScenario): Telemetry {
  const range = scenarioRanges[scenario];
  return {
    voltage: Number(((range.voltage[0] + range.voltage[1]) / 2).toFixed(1)),
    current: Number(((range.current[0] + range.current[1]) / 2).toFixed(1)),
    battery: scenario === 'high' ? 84 : scenario === 'medium' ? 72 : 58,
    temperature: Number(((range.temperature[0] + range.temperature[1]) / 2).toFixed(1))
  };
}

export function DashboardSection({ demoMode, scenario }: { demoMode: boolean; scenario: DemoScenario }) {
  const [ready, setReady] = useState(false);
  const [chargeDirection, setChargeDirection] = useState<1 | -1>(1);
  const [telemetry, setTelemetry] = useState<Telemetry>(makeTelemetryForScenario(scenario));
  const [generationSeries, setGenerationSeries] = useState([12, 22, 36, 42, 28, 15]);
  const [consumptionSeries, setConsumptionSeries] = useState([8, 16, 24, 30, 35, 18]);

  useEffect(() => {
    setTelemetry(makeTelemetryForScenario(scenario));
  }, [scenario]);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 700);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!demoMode) return;

    const id = window.setInterval(() => {
      setTelemetry((current) => {
        const range = scenarioRanges[scenario];
        const nextBattery = clamp(current.battery + chargeDirection * (0.4 + Math.random() * 0.7), 22, 98);

        if (nextBattery >= 96) setChargeDirection(-1);
        if (nextBattery <= 28) setChargeDirection(1);

        return {
          voltage: stepValue(current.voltage, range.voltage[0], range.voltage[1], 1.1),
          current: stepValue(current.current, range.current[0], range.current[1], 0.85),
          battery: Number(nextBattery.toFixed(1)),
          temperature: stepValue(current.temperature, range.temperature[0], range.temperature[1], 0.65)
        };
      });

      setGenerationSeries((current) => {
        const [min, max] = scenarioRanges[scenario].generation;
        const nextPoint = Number((min + Math.random() * (max - min)).toFixed(1));
        return [...current.slice(1), nextPoint];
      });

      setConsumptionSeries((current) => {
        const [min, max] = scenarioRanges[scenario].consumption;
        const nextPoint = Number((min + Math.random() * (max - min)).toFixed(1));
        return [...current.slice(1), nextPoint];
      });
    }, 2400);

    return () => window.clearInterval(id);
  }, [demoMode, scenario, chargeDirection]);

  const voltage = telemetry.voltage;
  const current = telemetry.current;
  const power = Number((voltage * current).toFixed(1));
  const temperature = telemetry.temperature;
  const battery = telemetry.battery;

  const chartData = useMemo(
    () => ({
      labels: ['T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'Now'],
      datasets: [
        {
          label: 'Generation',
          data: generationSeries,
          borderColor: 'rgba(247, 183, 51, 1)',
          backgroundColor: 'rgba(247, 183, 51, 0.2)',
          tension: 0.38,
          fill: true
        },
        {
          label: 'Consumption',
          data: consumptionSeries,
          borderColor: 'rgba(54, 242, 164, 1)',
          backgroundColor: 'rgba(54, 242, 164, 0.14)',
          tension: 0.38,
          fill: true
        }
      ]
    }),
    [consumptionSeries, generationSeries]
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#cbd5e1', font: { size: 12 } } },
      tooltip: {
        backgroundColor: 'rgba(2, 6, 23, 0.92)',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(247, 183, 51, 0.45)',
        borderWidth: 1
      }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148, 163, 184, 0.08)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148, 163, 184, 0.08)' } }
    }
  };

  return (
    <SectionShell
      id="dashboard"
      eyebrow="Live Dashboard"
      title="A simulated control room with real product energy"
      description="HelioHub's dashboard animates operating telemetry, battery state, and energy flow using a futuristic OLED-inspired interface."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_1.05fr]">
        <div className="glass-card lift-card rounded-[2rem] p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {[
              ['Voltage', `${voltage.toFixed(1)} V`],
              ['Current', `${current.toFixed(1)} A`],
              ['Power', `${power.toFixed(1)} W`],
              ['Temp', `${temperature.toFixed(1)} °C`]
            ].map(([label, value]) => (
              <div key={label} className="surface-panel rounded-3xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-amber-300/10 bg-[linear-gradient(145deg,rgba(247,183,51,0.07),rgba(15,43,77,0.24))] p-5">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Battery Charge</span>
              <span>{battery.toFixed(0)}%</span>
            </div>
            <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/10 shadow-[inset_0_0_18px_rgba(255,255,255,0.08)]">
              <motion.div animate={{ width: `${battery}%` }} transition={{ duration: 1.1, ease: 'easeInOut' }} className="h-full rounded-full bg-gradient-to-r from-amber-300 via-emerald-300 to-lime-300 shadow-[0_0_18px_rgba(54,242,164,0.45)]" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['Charge Controller Active', 'Thermal Guard On', 'Load Balancing Enabled', 'Emergency Mode Ready'].map((item) => (
                <div key={item} className="surface-panel rounded-2xl px-4 py-3 text-sm text-slate-200">{item}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card lift-card rounded-[2rem] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Energy Flow</p>
              <h3 className="font-display mt-2 text-2xl font-semibold text-white">Generation vs Consumption</h3>
            </div>
            <div className={`rounded-full border px-3 py-1 text-sm ${demoMode ? 'border-emerald-300/30 bg-emerald-300/15 text-emerald-100 shadow-[0_0_20px_rgba(54,242,164,0.24)]' : 'border-slate-400/25 bg-slate-500/15 text-slate-300'}`}>
              {demoMode ? 'Live' : 'Paused'}
            </div>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-[1.75rem] bg-slate-950/70 p-4">
            {!ready ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[1.75rem] bg-slate-950/80">
                <div className="space-y-4 text-center">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-amber-300/40 border-t-amber-300" />
                  <p className="text-sm tracking-[0.28em] text-slate-300 uppercase">Initializing telemetry</p>
                </div>
              </div>
            ) : null}
            <Line data={chartData} options={chartOptions as never} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['Solar Harvest', '1.8 kWh'],
              ['Storage Reserve', '4.2 kWh'],
              ['Output Utilization', '87%']
            ].map(([label, value]) => (
              <div key={label} className="surface-panel rounded-3xl p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
                <p className="mt-3 text-xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

