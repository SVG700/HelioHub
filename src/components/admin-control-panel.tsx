"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiAlertTriangle, FiCheckCircle, FiDatabase, FiLogOut, FiRefreshCw, FiSend, FiSun, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { supabase } from '@/lib/supabaseClient';
import { clearAdminSession } from '@/lib/adminAuth';
import { DEFAULT_SENSOR_READING, SENSOR_PRESETS, SENSOR_STATUS_KEYS, normalizeSensorReading, type SensorReading } from '@/lib/sensorReadings';

type MessageState = {
  type: 'success' | 'error' | 'info';
  text: string;
} | null;

const fieldConfig = [
  { key: 'voltage', label: 'Voltage (V)', min: 11.0, max: 14.8, step: 0.1 },
  { key: 'current_amp', label: 'Current (A)', min: 0, max: 5, step: 0.1 },
  { key: 'power', label: 'Power (W)', min: 0, max: 75, step: 0.5 },
  { key: 'temperature', label: 'Temperature (°C)', min: 20, max: 60, step: 0.5 },
  { key: 'battery_percent', label: 'Battery %', min: 0, max: 100, step: 1 }
] as const;

const statusLabels = {
  charge_controller: ['Charge Controller', 'Active', 'Inactive'],
  thermal_guard: ['Thermal Guard', 'On', 'Off'],
  load_balancing: ['Load Balancing', 'Enabled', 'Disabled'],
  emergency_mode: ['Emergency Mode', 'Ready', 'Active']
} as const;

function formatTimestamp(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function toFormReading(reading: SensorReading): SensorReading {
  return normalizeSensorReading(reading);
}

function readingToPayload(reading: SensorReading) {
  return {
    voltage: reading.voltage,
    current_amp: reading.current_amp,
    power: reading.power,
    temperature: reading.temperature,
    battery_percent: reading.battery_percent,
    charge_controller: reading.charge_controller,
    thermal_guard: reading.thermal_guard,
    load_balancing: reading.load_balancing,
    emergency_mode: reading.emergency_mode
  };
}

function StatusToggle({
  label,
  enabled,
  onToggle,
  activeLabel,
  inactiveLabel
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
  activeLabel: string;
  inactiveLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${enabled ? 'border-emerald-300/30 bg-emerald-300/10' : 'border-white/10 bg-white/5'}`}
    >
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className={`text-xs uppercase tracking-[0.2em] ${enabled ? 'text-emerald-200' : 'text-slate-400'}`}>
          {enabled ? activeLabel : inactiveLabel}
        </p>
      </div>
      <span className={`text-2xl ${enabled ? 'text-emerald-300' : 'text-slate-500'}`}>
        {enabled ? <FiToggleRight /> : <FiToggleLeft />}
      </span>
    </button>
  );
}

export function AdminControlPanel({ onLogout }: { onLogout: () => void }) {
  const [reading, setReading] = useState<SensorReading>(DEFAULT_SENSOR_READING);
  const [history, setHistory] = useState<SensorReading[]>([]);
  const [message, setMessage] = useState<MessageState>(null);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const statusSummary = useMemo(() => {
    const activeStatuses = SENSOR_STATUS_KEYS.filter((key) => reading[key]).length;
    return `${activeStatuses}/4 systems active`;
  }, [reading]);

  const loadHistory = async () => {
    setLoadingHistory(true);

    try {
      const { data, error } = await supabase
        .from('sensor_readings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }

      const normalized = (data ?? []).map((row) => normalizeSensorReading(row));
      setHistory(normalized);

      if (normalized[0]) {
        setReading(normalized[0]);
        setLastSavedAt(normalized[0].created_at ?? new Date().toISOString());
      }

      if (!normalized.length) {
        setMessage({ type: 'info', text: 'No readings found yet. The dashboard will show demo values until the first push.' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unable to load sensor history.'
      });
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    void loadHistory();
  }, []);

  const updateReading = <K extends keyof SensorReading>(key: K, value: SensorReading[K]) => {
    setReading((current) => ({ ...current, [key]: value }));
  };

  const handlePreset = (preset: (typeof SENSOR_PRESETS)[number]) => {
    setReading(toFormReading(preset.reading));
    setMessage({ type: 'info', text: `${preset.label} preset loaded. Review and push when ready.` });
  };

  const handlePush = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const { data, error } = await supabase
        .from('sensor_readings')
        .insert(readingToPayload(reading))
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      const inserted = normalizeSensorReading(data);
      setHistory((current) => [inserted, ...current].slice(0, 10));
      setLastSavedAt(inserted.created_at ?? new Date().toISOString());
      setMessage({ type: 'success', text: 'Reading pushed to Supabase and dashboard listeners updated instantly.' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unable to push reading to Supabase.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="glass-card rounded-[2rem] border border-amber-300/15 p-6 shadow-[0_0_35px_rgba(247,183,51,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-cyan-200">Admin Control Panel</p>
              <h1 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">Manual sensor input for live dashboard updates</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Use this panel to manually enter ESP32-style readings, push them into Supabase, and instantly mirror them across the HelioHub dashboard.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                🟢 {statusSummary}
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-amber-300/35 hover:text-white"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>

          {message ? (
            <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${message.type === 'success' ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100' : message.type === 'error' ? 'border-red-300/25 bg-red-300/10 text-red-100' : 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100'}`}>
              {message.text}
            </div>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-[0_0_28px_rgba(255,255,255,0.03)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Live Sensor Input</p>
                  <h2 className="font-display mt-2 text-2xl font-semibold text-white">Manual reading entry</h2>
                </div>
                <button
                  type="button"
                  onClick={() => void loadHistory()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-amber-300/35 hover:text-white"
                >
                  <FiRefreshCw />
                  Refresh
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {fieldConfig.map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-sm text-slate-300">{field.label}</span>
                    <input
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={reading[field.key] as number}
                      onChange={(event) => updateReading(field.key, Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                    />
                  </label>
                ))}
              </div>

              <button
                type="button"
                onClick={() => void handlePush()}
                disabled={isSaving}
                className="glow-button mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FiSend />
                {isSaving ? 'Pushing to Dashboard...' : '📡 Push to Dashboard'}
              </button>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {SENSOR_STATUS_KEYS.map((key) => {
                  const [label, activeLabel, inactiveLabel] = statusLabels[key];
                  return (
                    <StatusToggle
                      key={key}
                      label={label}
                      enabled={reading[key]}
                      onToggle={() => updateReading(key, !reading[key])}
                      activeLabel={activeLabel}
                      inactiveLabel={inactiveLabel}
                    />
                  );
                })}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-[0_0_28px_rgba(255,255,255,0.03)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Quick Presets</p>
                  <h2 className="font-display mt-2 text-2xl font-semibold text-white">Demo-ready scenarios</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">
                  <FiActivity />
                  Fast setup
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {SENSOR_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePreset(preset)}
                    className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 text-left transition hover:border-amber-300/35 hover:bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{preset.emoji} {preset.label}</p>
                      <FiSun className="text-amber-200" />
                    </div>
                    <p className="mt-2 text-xs leading-6 text-slate-400">
                      {preset.reading.voltage.toFixed(1)}V • {preset.reading.current_amp.toFixed(1)}A • {preset.reading.power.toFixed(1)}W • {preset.reading.battery_percent}%
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-[0_0_28px_rgba(255,255,255,0.03)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Reading History</p>
                  <h2 className="font-display mt-2 text-2xl font-semibold text-white">Last 10 entries</h2>
                </div>
                <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                  {lastSavedAt ? `Updated ${formatTimestamp(lastSavedAt)}` : 'No recent push'}
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                <div className="max-h-[520px] overflow-auto">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="sticky top-0 bg-[#09111f] text-xs uppercase tracking-[0.22em] text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">V</th>
                        <th className="px-4 py-3">A</th>
                        <th className="px-4 py-3">W</th>
                        <th className="px-4 py-3">Temp</th>
                        <th className="px-4 py-3">Battery</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingHistory ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-6 text-center text-slate-400">Loading readings...</td>
                        </tr>
                      ) : history.length ? (
                        history.map((entry, index) => (
                          <tr key={`${entry.created_at ?? index}-${index}`} className="border-t border-white/8 odd:bg-white/3">
                            <td className="px-4 py-3 text-slate-300">{formatTimestamp(entry.created_at)}</td>
                            <td className="px-4 py-3 text-white">{entry.voltage.toFixed(1)}</td>
                            <td className="px-4 py-3 text-white">{entry.current_amp.toFixed(1)}</td>
                            <td className="px-4 py-3 text-white">{entry.power.toFixed(1)}</td>
                            <td className="px-4 py-3 text-white">{entry.temperature.toFixed(1)}</td>
                            <td className="px-4 py-3 text-white">{entry.battery_percent}%</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-6 text-center text-slate-400">No readings yet. Push a reading to populate history.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-[0_0_28px_rgba(255,255,255,0.03)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-100">
                  <FiCheckCircle />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">System Snapshot</p>
                  <h3 className="font-display mt-1 text-xl font-semibold text-white">Current admin state</h3>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ['Charge Controller', reading.charge_controller ? 'Active' : 'Inactive'],
                  ['Thermal Guard', reading.thermal_guard ? 'On' : 'Off'],
                  ['Load Balancing', reading.load_balancing ? 'Enabled' : 'Disabled'],
                  ['Emergency Mode', reading.emergency_mode ? 'Active' : 'Ready']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
