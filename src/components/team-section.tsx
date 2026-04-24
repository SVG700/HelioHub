import Image from 'next/image';
import { SectionShell } from './section-shell';

const teamMembers = [
  { name: 'Samhith', role: 'Development', photo: '/team/samhith-v2.jpeg' },
  { name: 'Madhan', role: 'Hardware & Systems', photo: '/team/madhan-v2.jpeg' },
  { name: 'Ruchika', role: 'AI & UI Experience', photo: '/team/ruchika-v2.jpeg' }
];

export function TeamSection() {
  return (
    <SectionShell
      id="team"
      eyebrow="Team"
      title="Structured team leadership"
      description="The project guide is highlighted first, followed by the core HelioHub team in a balanced grid layout."
    >
      <article className="glass-card rounded-[2rem] border border-amber-300/35 bg-[linear-gradient(145deg,rgba(9,19,39,0.9),rgba(247,183,51,0.09),rgba(54,242,164,0.06))] p-5 shadow-[0_0_45px_rgba(247,183,51,0.16)] sm:p-6">
        <div className="grid gap-5 md:grid-cols-[260px_1fr] md:items-center">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#07111e] p-2">
            <Image src="/team/Dr. Divyarani M S.jpg" alt="Dr. Divyarani M S portrait" width={560} height={700} className="h-72 w-full rounded-[1.25rem] object-cover md:h-80" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">Project Guide</p>
            <h3 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">Dr. Divyarani M S</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-cyan-200">Mentor • Project Guide</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
              Strategic mentor for system architecture, project review, and presentation direction across the HelioHub platform. The guide section is intentionally emphasized to reflect leadership and academic support.
            </p>
          </div>
        </div>
      </article>

      <div className="mt-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">Team Members</p>
          <h3 className="font-display mt-2 text-2xl font-semibold text-white">Core Implementation Team</h3>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {teamMembers.map((member) => (
          <article key={member.name} className="glass-card lift-card h-full overflow-hidden rounded-[2rem] p-5 transition hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(34,211,238,0.16)]">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111e] p-3">
              <Image src={member.photo} alt={`${member.name} portrait`} width={640} height={420} className="h-56 w-full rounded-[1.25rem] object-cover" />
            </div>
            <h3 className="font-display mt-5 text-2xl font-semibold text-white">{member.name}</h3>
            <p className="mt-1 text-sm uppercase tracking-[0.24em] text-amber-200">{member.role}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}