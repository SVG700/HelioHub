export const feasibilityProfiles = {
  low: {
    label: 'Low',
    panelRange: '1–2 panels',
    outputRange: '180–350W daily',
    savings: '$12–$24 monthly',
    confidence: 'Low'
  },
  medium: {
    label: 'Medium',
    panelRange: '3–4 panels',
    outputRange: '600–950W daily',
    savings: '$30–$54 monthly',
    confidence: 'Medium'
  },
  high: {
    label: 'High',
    panelRange: '5–8 panels',
    outputRange: '1.2–2.4kW daily',
    savings: '$65–$120 monthly',
    confidence: 'High'
  }
} as const;

export const schemes = [
  {
    name: 'Solar Rooftop Subsidy',
    region: 'National',
    amount: 'Up to 40% subsidy',
    description: 'For grid-connected rooftop solar adoption across residential and small commercial deployments.'
  },
  {
    name: 'Clean Mobility Support',
    region: 'Urban',
    amount: 'Tax benefits + tariff relief',
    description: 'Supports charging infrastructure for clean energy mobility and public charging points.'
  },
  {
    name: 'Village Energy Mission',
    region: 'Rural',
    amount: 'Capital assistance',
    description: 'Aims to bring solar charging and storage systems to off-grid and semi-grid rural regions.'
  },
  {
    name: 'Industrial Green Transition',
    region: 'Industrial',
    amount: 'Accelerated depreciation',
    description: 'Incentivizes commercial solar battery systems for resilient, low-carbon operations.'
  }
];

export const architectureFlow = ['Solar Panel', 'Charge Controller', 'Battery Bank', 'DC-DC Converter', 'Output Port'];

export const regionOptions = ['All', 'National', 'Urban', 'Rural', 'Industrial'];