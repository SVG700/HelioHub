"use client";

import { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { SectionShell } from './section-shell';
import { supabase } from '@/lib/supabaseClient';
import { DEFAULT_SENSOR_READING, normalizeSensorReading, type SensorReading } from '@/lib/sensorReadings';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type DemoScenario = 'high' | 'medium' | 'low';

type Telemetry = {
  voltage: number;
  current: number;
  battery: number;
  temperature: number;
  power: number;
};

const scenarioRanges: Record<DemoScenario, { voltage: [number, number]; current: [number, number]; temperature: [number, number]; generation: [number, number]; consumption: [number, number] }> = {
  high: { voltage: [11.5, 14.2], current: [0.5, 4.0], temperature: [28, 35], generation: [18, 34], consumption: [12, 24] },
  medium: { voltage: [11.5, 14.2], current: [0.5, 4.0], temperature: [28, 35], generation: [12, 24], consumption: [10, 20] },
  low: { voltage: [11.5, 14.2], current: [0.5, 4.0], temperature: [28, 35], generation: [8, 16], consumption: [9, 18] }
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function stepValue(current: number, min: number, max: number, drift = 0.8) {
  const next = current + (Math.random() - 0.5) * drift;
  return Number(clamp(next, min, max).toFixed(1));
}

function demoTelemetryForScenario(scenario: DemoScenario): Telemetry {
  const battery = scenario === 'high' ? 88 : scenario === 'medium' ? 73 : 61;

  return {
    voltage: 12.4,
    current: 2.1,
    battery,
    temperature: 31.0,
    power: 26.0
  };
}

function makeTelemetryForScenario(scenario: DemoScenario): Telemetry {
  return demoTelemetryForScenario(scenario);
}

function telemetryFromSensorReading(reading: SensorReading): Telemetry {
  return {
    voltage: Number(reading.voltage.toFixed(1)),
    current: Number(reading.current_amp.toFixed(1)),
    battery: Number(reading.battery_percent.toFixed(0)),
    temperature: Number(reading.temperature.toFixed(1)),
    power: Number(reading.power.toFixed(1))
  };
}

function seriesFromReading(reading: Telemetry) {
  const generationSeed = reading.power;
  const consumptionSeed = Math.max(8, reading.power * 0.72);

  return {
    generation: Array.from({ length: 6 }, (_, index) => Number(clamp(generationSeed - 6 + index * 2.4 + (Math.random() - 0.5) * 2, 6, 60).toFixed(1))),
    consumption: Array.from({ length: 6 }, (_, index) => Number(clamp(consumptionSeed - 5 + index * 1.6 + (Math.random() - 0.5) * 1.5, 4, 48).toFixed(1)))
  };
}

export function DashboardSection({ demoMode, scenario }: { demoMode: boolean; scenario: DemoScenario }) {
  const [ready, setReady] = useState(false);
  const [chargeDirection, setChargeDirection] = useState<1 | -1>(1);
  const [telemetry, setTelemetry] = useState<Telemetry>(makeTelemetryForScenario(scenario));
  const [generationSeries, setGenerationSeries] = useState([12, 22, 36, 42, 28, 15]);
  const [consumptionSeries, setConsumptionSeries] = useState([8, 16, 24, 30, 35, 18]);
  const [isLiveData, setIsLiveData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loadingLiveData, setLoadingLiveData] = useState(true);

  useEffect(() => {
    if (isLiveData) return;
    setTelemetry(makeTelemetryForScenario(scenario));
    const series = seriesFromReading(makeTelemetryForScenario(scenario));
    setGenerationSeries(series.generation);
    setConsumptionSeries(series.consumption);
  }, [scenario, isLiveData]);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 700);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!demoMode || isLiveData) return;

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
          temperature: stepValue(current.temperature, range.temperature[0], range.temperature[1], 0.65),
          power: Number((current.voltage * current.current).toFixed(1))
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
  }, [demoMode, scenario, chargeDirection, isLiveData]);

  useEffect(() => {
    let isActive = true;

    const loadLatestSensorReading = async () => {
      setLoadingLiveData(true);

      try {
        const { data, error } = await supabase
          .from('sensor_readings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          throw error;
        }

        const latestRow = data?.[0];

        if (!isActive) return;

        if (latestRow) {
          const normalizedRow = normalizeSensorReading(latestRow);
          const liveReading = telemetryFromSensorReading(normalizedRow);
          const series = seriesFromReading(liveReading);

          setTelemetry(liveReading);
          setGenerationSeries(series.generation);
          setConsumptionSeries(series.consumption);
          setIsLiveData(true);
          setLastUpdated(normalizedRow.created_at ?? new Date().toISOString());
        } else {
          const demoReading = makeTelemetryForScenario(scenario);
          const series = seriesFromReading(demoReading);

          setTelemetry(demoReading);
          setGenerationSeries(series.generation);
          setConsumptionSeries(series.consumption);
          setIsLiveData(false);
          setLastUpdated(new Date().toISOString());
        }
      } catch {
        if (!isActive) return;
        const demoReading = makeTelemetryForScenario(scenario);
        const series = seriesFromReading(demoReading);

        setTelemetry(demoReading);
        setGenerationSeries(series.generation);
        setConsumptionSeries(series.consumption);
        setIsLiveData(false);
        setLastUpdated(new Date().toISOString());
      } finally {
        if (isActive) setLoadingLiveData(false);
      }
    };

    void loadLatestSensorReading();

    const refreshId = window.setInterval(() => {
      void loadLatestSensorReading();
    }, 10_000);

    const channel = supabase
      .channel('sensor_readings')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sensor_readings' }, (payload) => {
        if (!isActive) return;

        const normalizedRow = normalizeSensorReading(payload.new as Record<string, unknown>);
        const liveReading = telemetryFromSensorReading(normalizedRow);
        const series = seriesFromReading(liveReading);

        setTelemetry(liveReading);
        setGenerationSeries(series.generation);
        setConsumptionSeries(series.consumption);
        setIsLiveData(true);
        setLastUpdated(normalizedRow.created_at ?? new Date().toISOString());
      })
      .subscribe();

    return () => {
      isActive = false;
      window.clearInterval(refreshId);
      void supabase.removeChannel(channel);
    };
  }, [scenario]);

  const voltage = telemetry.voltage;
  const current = telemetry.current;
  const power = telemetry.power ?? Number((voltage * current).toFixed(1));
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
      title="A production-grade control room with real product energy"
      description="HelioHub's dashboard animates operating telemetry, battery state, and energy flow using a futuristic OLED-inspired interface."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_1.05fr]">
        <div className="glass-card lift-card rounded-[2rem] p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {[
              { label: 'Voltage', value: `${voltage.toFixed(1)} V`, icon: '⚡', tone: 'from-amber-300/18 to-amber-200/6' },
              { label: 'Current', value: `${current.toFixed(1)} A`, icon: '🔌', tone: 'from-cyan-300/18 to-cyan-200/6' },
              { label: 'Power', value: `${power.toFixed(1)} W`, icon: '☀️', tone: 'from-emerald-300/18 to-emerald-200/6' },
              { label: 'Temp', value: `${temperature.toFixed(1)} °C`, icon: '🌡️', tone: 'from-violet-300/18 to-violet-200/6' }
            ].map((item) => (
              <div key={item.label} className={`surface-panel rounded-3xl border border-white/10 bg-gradient-to-br ${item.tone} p-4 shadow-[0_0_22px_rgba(255,255,255,0.03)]`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <p className="mt-3 text-4xl font-black tracking-tight text-white shadow-[0_0_12px_rgba(255,255,255,0.08)]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-amber-300/10 bg-[linear-gradient(145deg,rgba(247,183,51,0.07),rgba(15,43,77,0.24))] p-5">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(54,242,164,0.8)]" /> Battery Charge</span>
              <span className="text-base font-semibold text-emerald-100 shadow-[0_0_10px_rgba(54,242,164,0.22)]">{battery.toFixed(0)}%</span>
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
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${isLiveData ? 'border-emerald-300/30 bg-emerald-300/15 text-emerald-100 shadow-[0_0_20px_rgba(54,242,164,0.24)]' : 'border-amber-300/25 bg-amber-300/10 text-amber-100'}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${isLiveData ? 'bg-emerald-300 shadow-[0_0_16px_rgba(54,242,164,0.85)] animate-pulse' : 'bg-amber-300 shadow-[0_0_12px_rgba(247,183,51,0.7)] animate-pulse'}`} />
              {isLiveData ? 'Live Data' : 'Demo Mode'}
            </div>
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-slate-400">
            <span>{loadingLiveData ? 'Syncing sensor readings...' : isLiveData ? 'Reading from Supabase sensor_readings' : 'Using local demo values'}</span>
            <span>Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '—'}</span>
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
              { label: 'Solar Harvest', value: '0.32 kWh', icon: '☀️' },
              { label: 'Storage Reserve', value: '78%', icon: '🔋' },
              { label: 'Output Utilization', value: '87%', icon: '📈' }
            ].map((item) => (
              <div key={item.label} className="surface-panel rounded-3xl border border-white/10 p-4 shadow-[0_0_22px_rgba(255,255,255,0.03)]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <p className="mt-3 text-2xl font-bold text-white shadow-[0_0_10px_rgba(255,255,255,0.06)]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

