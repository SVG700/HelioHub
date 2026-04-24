import type { ReactNode } from 'react';

export function SectionShell({
  eyebrow,
  title,
  description,
  children,
  id
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-amber-200">
            {eyebrow}
          </div>
          <h2 className="section-title font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}