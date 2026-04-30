"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SectionShell } from './section-shell';
import { calculateSolarFeasibility } from '@/lib/solar';
import { FEASIBILITY_STORAGE_KEY, type FeasibilityData, type LocationCoordinates, setFeasibilityData } from '@/lib/feasibilityContext';
import { FiActivity, FiDollarSign, FiTarget, FiZap } from 'react-icons/fi';

type DemoScenario = 'high' | 'medium' | 'low';
type LocationStatus = 'idle' | 'detecting' | 'success' | 'error' | 'unsupported';

type NominatimAddress = {
  suburb?: string;
  neighbourhood?: string;
  quarter?: string;
  city_district?: string;
  village?: string;
  town?: string;
  city?: string;
  county?: string;
  state?: string;
};

type LocationSuggestion = {
  display_name: string;
  lat: string;
  lon: string;
  address?: NominatimAddress;
};

type CalculatedResult = {
  feasibilityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  feasibilityColor: 'green' | 'yellow' | 'red';
  minPanels: number;
  maxPanels: number;
  minDailyKWh: string;
  maxDailyKWh: string;
  minMonthlySavings: number;
  maxMonthlySavings: number;
  minAnnualSavings: number;
  maxAnnualSavings: number;
  paybackYears: string;
  monthlyCO2Saved: number;
  electricityRate: number;
  sunlightReadiness: number;
  panelsNeeded: number;
  recommendation?: string;
};

const scenarioDefaults: Record<DemoScenario, { location: string; sunlightHours: number }> = {
  high: { location: 'Rajasthan', sunlightHours: 8.6 },
  medium: { location: 'Chennai', sunlightHours: 6.5 },
  low: { location: 'Bengaluru Rain Belt', sunlightHours: 3.8 }
};

const getPreciseLocationName = (address?: NominatimAddress): string =>
  address?.suburb ||
  address?.neighbourhood ||
  address?.quarter ||
  address?.city_district ||
  address?.village ||
  address?.town ||
  address?.city ||
  address?.county ||
  address?.state ||
  'Your Location';

const getCityForRates = (address?: NominatimAddress, fallback = 'Your Location'): string =>
  address?.city || address?.town || address?.village || address?.county || address?.state || fallback;

const getSunlightHoursFromLatitude = (latitude: number): number => {
  const lat = Math.abs(latitude);

  if (lat < 10) return 6.8;
  if (lat < 15) return 6.5;
  if (lat < 20) return 6.2;
  if (lat < 25) return 6.0;
  if (lat < 30) return 5.5;
  if (lat < 35) return 5.0;
  return 4.5;
};

export function FeasibilityTool({
  onResult,
  scenario,
  demoMode
}: {
  onResult: (context: { location: string; sunlightHours: number; feasibility: string; energy: string; panels: string; savings: string }) => void;
  scenario: DemoScenario;
  demoMode: boolean;
}) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [sunlightHours, setSunlightHours] = useState(6.0);
  const [calculatedResult, setCalculatedResult] = useState<CalculatedResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [locationNeedsConfirmation, setLocationNeedsConfirmation] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearchingLocations, setIsSearchingLocations] = useState(false);
  const [cityForRates, setCityForRates] = useState('');
  const [detectedCoordinates, setDetectedCoordinates] = useState<LocationCoordinates | null>(null);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [hasSharedData, setHasSharedData] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);

  const sunlightProgress = calculatedResult?.sunlightReadiness ?? Math.min(100, Math.round((sunlightHours / 7) * 100));

  useEffect(() => {
    if (!demoMode) return;

    const defaults = scenarioDefaults[scenario];
    setLocation(defaults.location);
    setSunlightHours(defaults.sunlightHours);
    setCalculatedResult(null);
    setHasSharedData(false);
    setShareMessage(null);
    setLocationStatus('idle');
    setLocationError(null);
    setLocationAccuracy(null);
    setLocationNeedsConfirmation(false);
    setLocationSuggestions([]);
    setIsSearchingLocations(false);
    setCityForRates('');
    setDetectedCoordinates(null);
  }, [scenario, demoMode]);

  const resultCards = calculatedResult
    ? [
        {
          label: 'Panels',
          value: `${calculatedResult.minPanels}–${calculatedResult.maxPanels} panels suggested`,
          subtitle: 'Based on 50W panels',
          icon: FiZap
        },
        {
          label: 'Energy',
          value: `${calculatedResult.minDailyKWh}–${calculatedResult.maxDailyKWh} kWh/day`,
          subtitle: 'Estimated daily generation',
          icon: FiActivity
        },
        {
          label: 'Monthly Savings',
          value: `₹${calculatedResult.minMonthlySavings.toLocaleString('en-IN')}–₹${calculatedResult.maxMonthlySavings.toLocaleString('en-IN')}/month`,
          subtitle: `At ₹${calculatedResult.electricityRate}/kWh in ${location.trim() || 'your area'}`,
          icon: FiDollarSign
        },
        {
          label: 'Annual Savings',
          value: `₹${calculatedResult.minAnnualSavings.toLocaleString('en-IN')}–₹${calculatedResult.maxAnnualSavings.toLocaleString('en-IN')}/year`,
          subtitle: 'Projected yearly savings',
          icon: FiTarget
        },
        {
          label: 'Payback Period',
          value: `${calculatedResult.paybackYears} years`,
          subtitle: 'Estimated investment recovery',
          icon: FiTarget
        },
        {
          label: 'CO2 Impact',
          value: `${calculatedResult.monthlyCO2Saved} kg CO2/month`,
          subtitle: 'Carbon footprint reduced',
          icon: FiActivity
        }
      ]
    : [];

  const clearCalculatedState = () => {
    setCalculatedResult(null);
    setHasSharedData(false);
    setShareMessage(null);
  };

  const buildFeasibilityPayload = (result: CalculatedResult, resolvedLocation: string): FeasibilityData => ({
    location: resolvedLocation,
    sunlightHours,
    coordinates: detectedCoordinates ?? undefined,
    panelsRequired: `${result.minPanels}-${result.maxPanels} panels`,
    estimatedOutput: `${result.minDailyKWh}-${result.maxDailyKWh} kWh/day`,
    feasibilityLevel: result.feasibilityLevel,
    monthlySavings: `₹${result.minMonthlySavings.toLocaleString('en-IN')}-₹${result.maxMonthlySavings.toLocaleString('en-IN')}`,
    annualSavings: `₹${result.minAnnualSavings.toLocaleString('en-IN')}-₹${result.maxAnnualSavings.toLocaleString('en-IN')}`,
    electricityRate: result.electricityRate,
    paybackYears: result.paybackYears,
    co2Saved: String(result.monthlyCO2Saved),
    isDataAvailable: true,
    timestamp: Date.now(),
    expiresAt: Date.now() + (60 * 60 * 1000)
  });

  const persistFeasibilityData = (payload: FeasibilityData): boolean => {
    try {
      window.localStorage.setItem(
        FEASIBILITY_STORAGE_KEY,
        JSON.stringify({
          location: payload.location,
          sunlightHours: payload.sunlightHours,
          coordinates: payload.coordinates,
          panelsRequired: payload.panelsRequired,
          estimatedOutput: payload.estimatedOutput,
          feasibilityLevel: payload.feasibilityLevel,
          monthlySavings: payload.monthlySavings,
          annualSavings: payload.annualSavings,
          electricityRate: payload.electricityRate,
          paybackYears: payload.paybackYears,
          co2Saved: payload.co2Saved,
          isDataAvailable: true,
          timestamp: payload.timestamp,
          expiresAt: payload.expiresAt
        })
      );

      setFeasibilityData(payload);
      return true;
    } catch (error) {
      console.error('Failed to persist feasibility data:', error);
      setShareMessage('Could not save feasibility data locally. Please try again.');
      return false;
    }
  };

  const detectLocation = () => {
    setLocationStatus('detecting');
    setLocationError(null);
    setLocationSuggestions([]);

    if (
      window.location.protocol !== 'https:' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      setLocationStatus('error');
      setLocationError('Location requires HTTPS. Please enter city manually.');
      return;
    }

    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      setLocationError('Geolocation is not supported by your browser. Please enter location manually.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          const coordinates = { latitude, longitude, accuracy };

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=16&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (!response.ok) {
            throw new Error(`Reverse geocoding failed with status ${response.status}`);
          }

          const data = await response.json();
          const preciseName = getPreciseLocationName(data?.address);
          const cityName = getCityForRates(data?.address, preciseName);

          setLocation(preciseName);
          setCityForRates(cityName);
          setDetectedCoordinates(coordinates);
          setLocationAccuracy(accuracy);
          setSunlightHours(getSunlightHoursFromLatitude(latitude));
          setLocationNeedsConfirmation(true);
          clearCalculatedState();
          setLocationStatus('success');
        } catch (error) {
          console.error('Location lookup failed:', error);
          setLocationStatus('error');
          setLocationError('Could not fetch location name. Please enter manually.');
        }
      },
      (error) => {
        console.error('Geolocation permission error:', error);
        setLocationStatus('error');

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied. Please enter your city manually below.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location unavailable. Please enter your city manually.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please enter manually.');
            break;
          default:
            setLocationError('Could not detect location. Please enter manually.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    if (demoMode || locationStatus === 'detecting' || locationNeedsConfirmation) {
      setLocationSuggestions([]);
      setIsSearchingLocations(false);
      return;
    }

    const query = location.trim();
    if (query.length < 3) {
      setLocationSuggestions([]);
      setIsSearchingLocations(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsSearchingLocations(true);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=3&addressdetails=1`,
          {
            headers: { 'Accept-Language': 'en' },
            signal: controller.signal
          }
        );

        if (!response.ok) {
          throw new Error(`Location search failed with status ${response.status}`);
        }

        const data = (await response.json()) as LocationSuggestion[];
        if (!controller.signal.aborted) {
          setLocationSuggestions(data.slice(0, 3));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Location search failed:', error);
          setLocationSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearchingLocations(false);
        }
      }
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [demoMode, location, locationNeedsConfirmation, locationStatus]);

  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
    const latitude = Number(suggestion.lat);
    const longitude = Number(suggestion.lon);
    const preciseName = getPreciseLocationName(suggestion.address) || suggestion.display_name;
    const cityName = getCityForRates(suggestion.address, preciseName);

    setLocation(preciseName);
    setCityForRates(cityName);
    setDetectedCoordinates({ latitude, longitude, accuracy: 0 });
    setLocationAccuracy(null);
    setSunlightHours(getSunlightHoursFromLatitude(latitude));
    setLocationStatus('success');
    setLocationNeedsConfirmation(false);
    setLocationSuggestions([]);
    setLocationError(null);
    clearCalculatedState();
  };

  const handleConfirmLocation = () => {
    setLocationNeedsConfirmation(false);
  };

  const handleEditLocation = () => {
    setLocationNeedsConfirmation(false);
    setLocationStatus('idle');
    locationInputRef.current?.focus();
  };

  const handleCalculate = async () => {
    const trimmedLocation = location.trim();
    if (!trimmedLocation) {
      setLocationStatus('error');
      setLocationError('Please enter a location to continue.');
      return;
    }

    setLocationError(null);
    if (locationStatus !== 'success') {
      setLocationStatus('idle');
    }
    clearCalculatedState();
    setIsCalculating(true);
    await new Promise((resolve) => window.setTimeout(resolve, 2000));

    const computed = calculateSolarFeasibility(trimmedLocation, sunlightHours, cityForRates.trim() || trimmedLocation);
    const feasibilityLevel = computed.feasibilityLevel;
    const recommendation =
      feasibilityLevel === 'HIGH'
        ? 'Helios AI Recommendation: Excellent sunlight profile. Prioritize smart load balancing and battery storage to maximize yearly savings.'
        : feasibilityLevel === 'MEDIUM'
          ? 'Helios AI Recommendation: Good solar potential. A balanced panel and storage setup offers reliable daily charging and strong payback.'
          : 'Helios AI Recommendation: Limited sunlight profile. Focus on high-efficiency panels and a compact design to improve recovery and reliability.';

    setCalculatedResult({
      ...computed,
      recommendation
    });

    onResult({
      location: trimmedLocation,
      sunlightHours,
      feasibility: feasibilityLevel.toLowerCase(),
      energy: `${computed.minDailyKWh}–${computed.maxDailyKWh} kWh/day estimated daily generation`,
      panels: `${computed.minPanels}–${computed.maxPanels} panels suggested`,
      savings: `₹${computed.minMonthlySavings.toLocaleString('en-IN')}–₹${computed.maxMonthlySavings.toLocaleString('en-IN')} monthly`
    });

    const payload = buildFeasibilityPayload(computed, trimmedLocation);
    persistFeasibilityData(payload);

    setIsCalculating(false);
  };

  const handleShareWithAI = () => {
    if (!calculatedResult) return;

    const payload = buildFeasibilityPayload(calculatedResult, location.trim());
    const isPersisted = persistFeasibilityData(payload);
    if (!isPersisted) return;

    setHasSharedData(true);
    setShareMessage('✅ Data shared! Redirecting to Helios AI...');

    window.setTimeout(() => {
      router.push('/ai-assistant');
    }, 1500);
  };

  const handleAskAIAboutResults = () => {
    if (!calculatedResult) return;
    const question = `Based on my feasibility results for ${location.trim()}, what do you recommend?`;
    router.push(`/ai-assistant?q=${encodeURIComponent(question)}`);
  };

  return (
    <SectionShell
      id="feasibility"
      eyebrow="Solar Feasibility"
      title="Evaluate deployment potential in seconds"
      description="A simulation-based planner that estimates performance, panel sizing, and savings while generating an intelligent Helios AI recommendation."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-card lift-card rounded-[2rem] p-6">
          <label className="block text-sm text-slate-300">Location</label>
          <input
            ref={locationInputRef}
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              setLocationStatus('idle');
              setLocationError(null);
              setLocationNeedsConfirmation(false);
              setLocationAccuracy(null);
              setLocationSuggestions([]);
              setCityForRates('');
              setDetectedCoordinates(null);
              clearCalculatedState();
            }}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/50"
            placeholder="Enter city, region, or site name"
          />

          {isSearchingLocations ? <p className="mt-2 text-xs text-slate-400">Searching locations...</p> : null}

          {locationSuggestions.length > 0 ? (
            <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/30">
              {locationSuggestions.map((suggestion) => (
                <button
                  key={`${suggestion.lat}-${suggestion.lon}-${suggestion.display_name}`}
                  type="button"
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="block w-full border-b border-white/5 px-4 py-3 text-left text-sm text-slate-100 transition last:border-b-0 hover:bg-white/5"
                >
                  <span className="block font-medium">{getPreciseLocationName(suggestion.address) || suggestion.display_name}</span>
                  <span className="mt-1 block text-xs text-slate-400">{suggestion.display_name}</span>
                </button>
              ))}
            </div>
          ) : null}

          <button
            type="button"
            onClick={detectLocation}
            disabled={locationStatus === 'detecting'}
            className="mt-3 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition duration-200 hover:border-cyan-300/60 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {locationStatus === 'detecting' ? (
              <span className="inline-flex items-center gap-2">
                <motion.span
                  className="inline-block h-3 w-3 rounded-full border border-cyan-200 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.9, ease: 'linear' }}
                />
                📍 Detecting your location...
              </span>
            ) : (
              '📍 Use My Current Location'
            )}
          </button>

          {locationStatus === 'success' && location.trim().length > 0 ? (
            <div className="mt-3 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
              📍 Location detected: {location}
              {locationAccuracy !== null ? ` (±${Math.round(locationAccuracy)}m accuracy)` : ''}
            </div>
          ) : null}

          {locationStatus === 'success' && locationAccuracy !== null && locationAccuracy > 1000 ? (
            <div className="mt-3 rounded-2xl border border-amber-300/35 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              ⚠️ Low accuracy detected. You may want to enter your location manually for better results.
            </div>
          ) : null}

          {locationNeedsConfirmation ? (
            <div className="mt-3 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
              <p>📍 Detected: {location} - Is this correct?</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleConfirmLocation}
                  className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-300/20"
                >
                  ✅ Yes, this is correct
                </button>
                <button
                  type="button"
                  onClick={handleEditLocation}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  ✏️ Edit location
                </button>
              </div>
            </div>
          ) : null}

          {(locationStatus === 'error' || locationStatus === 'unsupported') && locationError ? (
            <div className="mt-3 rounded-2xl border border-amber-300/35 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              {locationError}
            </div>
          ) : null}

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Sunlight hours</span>
              <span>{sunlightHours.toFixed(1)} hrs/day</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="0.1"
              value={sunlightHours}
              onChange={(event) => {
                setSunlightHours(Number(event.target.value));
                clearCalculatedState();
              }}
              className="mt-3 w-full accent-amber-300"
            />
          </div>

          <button
            type="button"
            onClick={() => void handleCalculate()}
            disabled={isCalculating}
            className="glow-button mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 px-4 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-80"
          >
            ⚡ Calculate Solar Feasibility
          </button>

          {isCalculating ? (
            <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
              <span className="inline-flex items-center gap-2">
                🌞 Helios AI is analyzing solar potential for your location...
                <motion.span
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2 }}
                >
                  •••
                </motion.span>
              </span>
            </div>
          ) : null}

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>Sunlight Readiness</span>
              <span>{sunlightProgress}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div animate={{ width: `${sunlightProgress}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300" />
            </div>
          </div>

          {calculatedResult ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div
                className={`surface-panel lift-card rounded-3xl border p-4 sm:col-span-2 ${
                  calculatedResult.feasibilityColor === 'green'
                    ? 'border-emerald-300/35 bg-emerald-300/10'
                    : calculatedResult.feasibilityColor === 'yellow'
                      ? 'border-amber-300/35 bg-amber-300/10'
                      : 'border-red-300/35 bg-red-300/10'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-300">Feasibility</p>
                  <FiTarget className="text-base text-white/90" />
                </div>
                <p className="mt-2 text-lg font-semibold text-white">{calculatedResult.feasibilityLevel}</p>
              </div>

              {resultCards.map((card) => (
                <motion.div key={card.label} layout className="surface-panel lift-card rounded-3xl p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
                    <card.icon className="text-base text-amber-200" />
                  </div>
                  <p className="mt-3 text-lg font-semibold text-white">{card.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{card.subtitle}</p>
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>

        <motion.div key={calculatedResult?.recommendation ?? 'pending'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="glass-card lift-card rounded-[2rem] p-6">
          <div className="rounded-3xl border border-amber-300/10 bg-[linear-gradient(145deg,rgba(247,183,51,0.08),rgba(54,242,164,0.04))] p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Helios AI Recommendation</p>
            <p className="mt-4 text-lg leading-8 text-slate-100">
              {calculatedResult
                ? calculatedResult.recommendation
                : 'Run the feasibility calculation to get a personalized Helios AI recommendation for your location.'}
            </p>
          </div>

          {calculatedResult ? (
            <button
              type="button"
              onClick={handleShareWithAI}
              className="glow-button mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950"
            >
              {hasSharedData ? '✅ Data Shared with Helios AI' : 'Use this data in Helios AI'}
            </button>
          ) : null}

          {shareMessage ? (
            <div className="mt-4 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
              <p>{shareMessage}</p>
            </div>
          ) : null}

          {calculatedResult ? (
            <div className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Quick Actions</p>
              <button
                type="button"
                onClick={handleAskAIAboutResults}
                className="mt-2 w-full rounded-xl border border-amber-300/35 bg-amber-300/15 px-3 py-2 text-sm font-semibold text-amber-100 transition duration-150 hover:border-amber-300/60 hover:bg-amber-300/25"
              >
                Ask AI about my results →
              </button>
            </div>
          ) : null}

          <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-emerald-300/5 p-5 text-sm leading-7 text-slate-300">
            A higher sunlight score increases feasibility, panel efficiency, and projected savings while improving confidence in charging reliability.
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}

