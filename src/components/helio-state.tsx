"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { estimateSolarOutcome } from '@/lib/solar';

export type DemoScenario = 'high' | 'medium' | 'low';

export type SolarContextState = {
  location: string;
  sunlightHours: number;
  feasibility: string;
  energy: string;
  panels: string;
  savings: string;
};

type HelioStateValue = {
  demoMode: boolean;
  setDemoMode: Dispatch<SetStateAction<boolean>>;
  scenario: DemoScenario;
  setScenario: (value: DemoScenario) => void;
  scenarioSignal: number;
  solarContext: SolarContextState;
  setSolarContext: (value: SolarContextState) => void;
  syncScenarioContext: (scenario: DemoScenario) => void;
};

const scenarioConfig: Record<DemoScenario, { location: string; sunlightHours: number }> = {
  high: { location: 'Rajasthan', sunlightHours: 8.6 },
  medium: { location: 'Chennai', sunlightHours: 6.5 },
  low: { location: 'Bengaluru Rain Belt', sunlightHours: 3.8 }
};

const HelioStateContext = createContext<HelioStateValue | null>(null);

export function HelioStateProvider({ children }: { children: ReactNode }) {
  const [demoMode, setDemoMode] = useState(true);
  const [scenario, setScenario] = useState<DemoScenario>('medium');
  const [scenarioSignal, setScenarioSignal] = useState(0);
  const [solarContext, setSolarContext] = useState<SolarContextState>({
    location: 'Chennai',
    sunlightHours: 6.5,
    feasibility: 'medium',
    energy: '0.7–1.3 kWh estimated daily generation',
    panels: '3–4 panels suggested',
    savings: '₹2,500–₹4,500 monthly'
  });

  useEffect(() => {
    const storedDemo = window.localStorage.getItem('heliohub-demo-mode');
    const storedScenario = window.localStorage.getItem('heliohub-scenario') as DemoScenario | null;

    if (storedDemo) setDemoMode(storedDemo === 'on');
    if (storedScenario && ['high', 'medium', 'low'].includes(storedScenario)) setScenario(storedScenario);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('heliohub-demo-mode', demoMode ? 'on' : 'off');
  }, [demoMode]);

  useEffect(() => {
    window.localStorage.setItem('heliohub-scenario', scenario);
  }, [scenario]);

  const syncScenarioContext = (nextScenario: DemoScenario) => {
    setScenario(nextScenario);
    const config = scenarioConfig[nextScenario];
    const result = estimateSolarOutcome(config.location, config.sunlightHours);

    setSolarContext({
      location: config.location,
      sunlightHours: config.sunlightHours,
      feasibility: result.feasibility,
      energy: result.energy,
      panels: result.panels,
      savings: result.savings
    });
    setScenarioSignal((value) => value + 1);
  };

  const value = useMemo(
    () => ({
      demoMode,
      setDemoMode,
      scenario,
      setScenario,
      scenarioSignal,
      solarContext,
      setSolarContext,
      syncScenarioContext
    }),
    [demoMode, scenario, scenarioSignal, solarContext]
  );

  return <HelioStateContext.Provider value={value}>{children}</HelioStateContext.Provider>;
}

export function useHelioState() {
  const context = useContext(HelioStateContext);
  if (!context) {
    throw new Error('useHelioState must be used within HelioStateProvider');
  }
  return context;
}

