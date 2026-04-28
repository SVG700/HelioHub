import { feasibilityProfiles } from './data';

export type FeasibilityResult = {
  feasibility: keyof typeof feasibilityProfiles;
  energy: string;
  panels: string;
  savings: string;
  recommendation: string;
};

export type DetailedSolarFeasibility = {
  minPanels: number;
  maxPanels: number;
  minDailyKWh: string;
  maxDailyKWh: string;
  minMonthlySavings: number;
  maxMonthlySavings: number;
  minAnnualSavings: number;
  maxAnnualSavings: number;
  paybackYears: string;
  feasibilityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  feasibilityColor: 'green' | 'yellow' | 'red';
  sunlightReadiness: number;
  electricityRate: number;
  monthlyCO2Saved: number;
  panelsNeeded: number;
};

export const getElectricityRate = (location: string): number => {
  const loc = location.toLowerCase();

  if (loc.includes('mumbai') || loc.includes('maharashtra')) return 12;
  if (loc.includes('delhi') || loc.includes('new delhi')) return 8;
  if (loc.includes('bangalore') || loc.includes('bengaluru') || loc.includes('karnataka')) return 7;
  if (loc.includes('chennai') || loc.includes('tamil nadu')) return 6.5;
  if (loc.includes('hyderabad') || loc.includes('telangana')) return 9;
  if (loc.includes('kolkata') || loc.includes('west bengal')) return 7.5;
  if (loc.includes('pune')) return 11;
  if (loc.includes('ahmedabad') || loc.includes('gujarat')) return 5.5;
  if (loc.includes('jaipur') || loc.includes('rajasthan')) return 6.5;
  if (loc.includes('lucknow') || loc.includes('uttar pradesh')) return 6;
  if (loc.includes('bhopal') || loc.includes('madhya pradesh')) return 7;
  if (loc.includes('patna') || loc.includes('bihar')) return 6.5;
  if (loc.includes('chandigarh') || loc.includes('punjab')) return 7;
  if (loc.includes('kerala') || loc.includes('kochi') || loc.includes('thiruvananthapuram')) return 5.5;
  if (loc.includes('goa')) return 3.5;

  return 8;
};

export const calculateSolarFeasibility = (
  location: string,
  sunlightHours: number,
  electricityRateLocation?: string
): DetailedSolarFeasibility => {
  const PANEL_WATTAGE = 50;
  const EFFICIENCY = 0.8;
  const PANEL_COST = 3500;
  const TARGET_DAILY_WH = 200;

  const safeSunlightHours = Math.max(0.1, sunlightHours);
  const panelsNeeded = Math.ceil(TARGET_DAILY_WH / (PANEL_WATTAGE * safeSunlightHours * EFFICIENCY));

  const minPanels = Math.max(1, panelsNeeded - 1);
  const maxPanels = Math.min(6, panelsNeeded + 1);

  const minDailyKWh = (minPanels * PANEL_WATTAGE * safeSunlightHours * EFFICIENCY) / 1000;
  const maxDailyKWh = (maxPanels * PANEL_WATTAGE * safeSunlightHours * EFFICIENCY) / 1000;

  const minMonthlyKWh = minDailyKWh * 30;
  const maxMonthlyKWh = maxDailyKWh * 30;

  const electricityRate = getElectricityRate(electricityRateLocation ?? location);

  const minMonthlySavings = Math.round(minMonthlyKWh * electricityRate);
  const maxMonthlySavings = Math.round(maxMonthlyKWh * electricityRate);

  const minAnnualSavings = minMonthlySavings * 12;
  const maxAnnualSavings = maxMonthlySavings * 12;

  const totalCost = maxPanels * PANEL_COST;
  const avgMonthlySavings = Math.max(1, (minMonthlySavings + maxMonthlySavings) / 2);
  const paybackMonths = Math.round(totalCost / avgMonthlySavings);
  const paybackYears = (paybackMonths / 12).toFixed(1);

  let feasibilityLevel: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  let feasibilityColor: 'green' | 'yellow' | 'red' = 'red';
  if (safeSunlightHours >= 6) {
    feasibilityLevel = 'HIGH';
    feasibilityColor = 'green';
  } else if (safeSunlightHours >= 4.5) {
    feasibilityLevel = 'MEDIUM';
    feasibilityColor = 'yellow';
  }

  const sunlightReadiness = Math.min(100, Math.round((safeSunlightHours / 7) * 100));
  const monthlyCO2Saved = Math.round(((minMonthlyKWh + maxMonthlyKWh) / 2) * 0.82);

  return {
    minPanels,
    maxPanels,
    minDailyKWh: minDailyKWh.toFixed(2),
    maxDailyKWh: maxDailyKWh.toFixed(2),
    minMonthlySavings,
    maxMonthlySavings,
    minAnnualSavings,
    maxAnnualSavings,
    paybackYears,
    feasibilityLevel,
    feasibilityColor,
    sunlightReadiness,
    electricityRate,
    monthlyCO2Saved,
    panelsNeeded
  };
};

const formatCurrencyRange = (min: number, max: number, suffix: string): string =>
  `₹${min.toLocaleString('en-IN')}–₹${max.toLocaleString('en-IN')} ${suffix}`;

export function estimateSolarOutcome(location: string, sunlightHours: number): FeasibilityResult {
  const detailed = calculateSolarFeasibility(location, sunlightHours, location);
  const feasibility: keyof typeof feasibilityProfiles =
    detailed.feasibilityLevel === 'HIGH' ? 'high' : detailed.feasibilityLevel === 'MEDIUM' ? 'medium' : 'low';

  const estimatedDailyOutput = `${detailed.minDailyKWh}–${detailed.maxDailyKWh} kWh`;
  const panelEstimate = `${detailed.minPanels}–${detailed.maxPanels}`;
  const savings = formatCurrencyRange(detailed.minMonthlySavings, detailed.maxMonthlySavings, 'monthly');

  const recommendation =
    feasibility === 'high'
      ? 'Helios AI Recommendation: Your site is ideal for deployment. Prioritize battery storage and smart load balancing to maximize savings.'
      : feasibility === 'medium'
        ? 'Helios AI Recommendation: Your region is suitable with moderate yield. A hybrid setup with storage will improve reliability.'
        : 'Helios AI Recommendation: Solar is possible, but performance will be limited. Consider compact deployment with high-efficiency panels and backup storage.';

  return {
    feasibility,
    energy: `${estimatedDailyOutput} estimated daily generation`,
    panels: `${panelEstimate} panels suggested`,
    savings,
    recommendation
  };
}

