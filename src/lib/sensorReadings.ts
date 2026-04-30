export type SensorReading = {
  id?: number;
  voltage: number;
  current_amp: number;
  power: number;
  temperature: number;
  battery_percent: number;
  charge_controller: boolean;
  thermal_guard: boolean;
  load_balancing: boolean;
  emergency_mode: boolean;
  created_at?: string;
};

export const DEFAULT_SENSOR_READING: SensorReading = {
  voltage: 12.4,
  current_amp: 2.1,
  power: 26.0,
  temperature: 31.0,
  battery_percent: 73,
  charge_controller: true,
  thermal_guard: true,
  load_balancing: true,
  emergency_mode: false
};

export const SENSOR_PRESETS: Array<{
  label: string;
  emoji: string;
  reading: SensorReading;
}> = [
  {
    label: 'High Sunlight',
    emoji: '☀️',
    reading: { voltage: 13.8, current_amp: 3.2, power: 44, temperature: 32, battery_percent: 85, charge_controller: true, thermal_guard: true, load_balancing: true, emergency_mode: false }
  },
  {
    label: 'Medium Sunlight',
    emoji: '⛅',
    reading: { voltage: 12.8, current_amp: 2.1, power: 27, temperature: 30, battery_percent: 65, charge_controller: true, thermal_guard: true, load_balancing: true, emergency_mode: false }
  },
  {
    label: 'Low Sunlight',
    emoji: '🌧️',
    reading: { voltage: 12.1, current_amp: 0.8, power: 10, temperature: 28, battery_percent: 40, charge_controller: true, thermal_guard: true, load_balancing: true, emergency_mode: false }
  },
  {
    label: 'Battery Critical',
    emoji: '🔋',
    reading: { voltage: 11.5, current_amp: 0.3, power: 3, temperature: 35, battery_percent: 15, charge_controller: true, thermal_guard: true, load_balancing: true, emergency_mode: true }
  },
  {
    label: 'High Temperature',
    emoji: '🌡️',
    reading: { voltage: 12.4, current_amp: 2.1, power: 26, temperature: 55, battery_percent: 70, charge_controller: true, thermal_guard: true, load_balancing: false, emergency_mode: false }
  }
];

export const SENSOR_STATUS_KEYS = [
  'charge_controller',
  'thermal_guard',
  'load_balancing',
  'emergency_mode'
] as const;

export function normalizeSensorReading(value: Partial<SensorReading> & Record<string, unknown>): SensorReading {
  return {
    id: typeof value.id === 'number' ? value.id : undefined,
    voltage: Number(value.voltage ?? DEFAULT_SENSOR_READING.voltage),
    current_amp: Number(value.current_amp ?? DEFAULT_SENSOR_READING.current_amp),
    power: Number(value.power ?? DEFAULT_SENSOR_READING.power),
    temperature: Number(value.temperature ?? DEFAULT_SENSOR_READING.temperature),
    battery_percent: Number(value.battery_percent ?? DEFAULT_SENSOR_READING.battery_percent),
    charge_controller: Boolean(value.charge_controller ?? DEFAULT_SENSOR_READING.charge_controller),
    thermal_guard: Boolean(value.thermal_guard ?? DEFAULT_SENSOR_READING.thermal_guard),
    load_balancing: Boolean(value.load_balancing ?? DEFAULT_SENSOR_READING.load_balancing),
    emergency_mode: Boolean(value.emergency_mode ?? DEFAULT_SENSOR_READING.emergency_mode),
    created_at: typeof value.created_at === 'string' ? value.created_at : undefined
  };
}
