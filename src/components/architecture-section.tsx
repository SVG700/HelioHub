import { SectionShell } from './section-shell';
import { architectureFlow } from '@/lib/data';

export function ArchitectureSection() {
  return (
    <SectionShell
      id="architecture"
      eyebrow="System Architecture"
      title="From sunlight to smart output"
      description="A clean visual flow that communicates how energy moves through the HelioHub stack."
    >
      <div className="glass-card lift-card rounded-[2rem] p-6">
        <div className="grid gap-4 md:grid-cols-5">
          {architectureFlow.map((stage, index) => (
            <div key={stage} className="relative rounded-3xl border border-white/10 bg-white/5 p-5 text-center transition hover:-translate-y-1 hover:border-amber-300/30">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300/25 to-emerald-300/20 text-xl font-semibold text-amber-100">{index + 1}</div>
              <p className="mt-4 font-semibold text-white">{stage}</p>
              {index < architectureFlow.length - 1 ? <div className="absolute right-[-12px] top-1/2 hidden h-px w-6 bg-cyan-300/50 md:block" /> : null}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-amber-300/10 bg-slate-950/60 p-6">
          <svg viewBox="0 0 1000 220" className="h-auto w-full">
            <defs>
              <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f7b733" />
                <stop offset="100%" stopColor="#36f2a4" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#flow)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M80 110h145" />
              <path d="M285 110h145" />
              <path d="M490 110h145" />
              <path d="M695 110h145" />
            </g>
            <g fill="#08111f" stroke="#7dd3fc" strokeWidth="2">
              <rect x="20" y="55" width="120" height="110" rx="22" />
              <rect x="225" y="55" width="120" height="110" rx="22" />
              <rect x="430" y="55" width="120" height="110" rx="22" />
              <rect x="635" y="55" width="120" height="110" rx="22" />
              <rect x="840" y="55" width="120" height="110" rx="22" />
            </g>
            <g fill="#e2f7ff" fontFamily="Arial" fontSize="20" fontWeight="700" textAnchor="middle">
              <text x="80" y="100">Solar</text>
              <text x="80" y="127">Panel</text>
              <text x="285" y="100">Charge</text>
              <text x="285" y="127">Controller</text>
              <text x="490" y="100">Battery</text>
              <text x="490" y="127">Bank</text>
              <text x="695" y="100">DC-DC</text>
              <text x="695" y="127">Converter</text>
              <text x="890" y="110">Output</text>
            </g>
          </svg>
        </div>
      </div>
    </SectionShell>
  );
}