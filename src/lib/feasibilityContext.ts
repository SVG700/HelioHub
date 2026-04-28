export type LocationCoordinates = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export type FeasibilityData = {
  location: string;
  sunlightHours: number;
  coordinates?: LocationCoordinates;
  panelsRequired: string;
  estimatedOutput: string;
  feasibilityLevel: string;
  monthlySavings: string;
  annualSavings: string;
  electricityRate: number;
  paybackYears: string;
  co2Saved: string;
  isDataAvailable: boolean;
  timestamp: number;
  expiresAt: number;
};

export const FEASIBILITY_STORAGE_KEY = 'helios_feasibility_data';
const LEGACY_FEASIBILITY_STORAGE_KEY = 'heliohub-feasibility-data';

const defaultFeasibilityData: FeasibilityData = {
  location: '',
  sunlightHours: 0,
  coordinates: undefined,
  panelsRequired: '',
  estimatedOutput: '',
  feasibilityLevel: 'Medium',
  monthlySavings: '',
  annualSavings: '',
  electricityRate: 0,
  paybackYears: '',
  co2Saved: '',
  isDataAvailable: false,
  timestamp: 0,
  expiresAt: 0
};

let feasibilityData: FeasibilityData = { ...defaultFeasibilityData };
let hydratedFromStorage = false;

const listeners = new Set<(value: FeasibilityData) => void>();

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readFromStorage(): FeasibilityData | null {
  if (!isBrowser()) return null;

  try {
    const raw =
      window.localStorage.getItem(FEASIBILITY_STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_FEASIBILITY_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<FeasibilityData>;
    const parsedExpiresAt = Number(parsed.expiresAt ?? 0);

    if (parsedExpiresAt > 0 && Date.now() > parsedExpiresAt) {
      window.localStorage.removeItem(FEASIBILITY_STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_FEASIBILITY_STORAGE_KEY);
      return null;
    }

    return {
      ...defaultFeasibilityData,
      ...parsed,
      coordinates:
        parsed.coordinates && typeof parsed.coordinates === 'object'
          ? {
              latitude: Number((parsed.coordinates as LocationCoordinates).latitude ?? 0),
              longitude: Number((parsed.coordinates as LocationCoordinates).longitude ?? 0),
              accuracy: Number((parsed.coordinates as LocationCoordinates).accuracy ?? 0)
            }
          : undefined,
      panelsRequired: String(parsed.panelsRequired ?? ''),
      sunlightHours: Number(parsed.sunlightHours ?? 0),
      annualSavings: String(parsed.annualSavings ?? ''),
      electricityRate: Number(parsed.electricityRate ?? 0),
      paybackYears: String(parsed.paybackYears ?? ''),
      co2Saved: String(parsed.co2Saved ?? ''),
      isDataAvailable: Boolean(parsed.isDataAvailable),
      timestamp: Number(parsed.timestamp ?? 0),
      expiresAt: parsedExpiresAt
    };
  } catch (error) {
    console.error('Failed to parse feasibility data from localStorage:', error);
    return null;
  }
}

function writeToStorage(value: FeasibilityData): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(FEASIBILITY_STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save feasibility data to localStorage:', error);
  }
}

export function loadFeasibilityData(): FeasibilityData {
  if (!hydratedFromStorage) {
    const storedData = readFromStorage();
    if (storedData) {
      feasibilityData = storedData;
    }
    hydratedFromStorage = true;
  }

  return { ...feasibilityData };
}

export function setFeasibilityData(value: FeasibilityData): void {
  const merged = { ...defaultFeasibilityData, ...value };
  const timestamp = merged.timestamp > 0 ? merged.timestamp : Date.now();
  const expiresAt = merged.expiresAt > 0 ? merged.expiresAt : timestamp + (60 * 60 * 1000);

  feasibilityData = {
    ...merged,
    timestamp,
    expiresAt
  };

  writeToStorage(feasibilityData);
  listeners.forEach((listener) => listener(feasibilityData));
}

export function getFeasibilityData(): FeasibilityData {
  return loadFeasibilityData();
}

export function subscribeFeasibilityData(listener: (value: FeasibilityData) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function resetFeasibilityData(): void {
  if (isBrowser()) {
    window.localStorage.removeItem(FEASIBILITY_STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_FEASIBILITY_STORAGE_KEY);
  }
  feasibilityData = { ...defaultFeasibilityData };
  listeners.forEach((listener) => listener(feasibilityData));
}

