import { feasibilityProfiles } from './data';

export type FeasibilityResult = {
  feasibility: keyof typeof feasibilityProfiles;
  energy: string;
  panels: string;
  savings: string;
  recommendation: string;
};

export function estimateSolarOutcome(location: string, sunlightHours: number): FeasibilityResult {
  const lowerLocation = location.trim().toLowerCase();
  const locationBoost = ['desert', 'coastal', 'arizona', 'dubai', 'rajasthan', 'texas'].some((term) => lowerLocation.includes(term));

  let score = sunlightHours;
  if (locationBoost) score += 1;
  if (sunlightHours >= 7.5) score += 1;
  if (sunlightHours <= 4) score -= 1;

  const feasibility: keyof typeof feasibilityProfiles = score >= 7.5 ? 'high' : score >= 5.3 ? 'medium' : 'low';
  const profile = feasibilityProfiles[feasibility];
  const estimatedDailyOutput = feasibility === 'high' ? '1.4–2.6 kWh' : feasibility === 'medium' ? '0.7–1.3 kWh' : '0.25–0.55 kWh';
  const panelEstimate = feasibility === 'high' ? '5–8' : feasibility === 'medium' ? '3–4' : '1–2';

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
    savings: profile.savings,
    recommendation
  };
}