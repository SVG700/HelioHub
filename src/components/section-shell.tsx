import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

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
    <motion.section
      id={id}
      className="relative px-4 py-16 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 inline-flex rounded-full border border-amber-300/20 bg-[linear-gradient(145deg,rgba(247,183,51,0.12),rgba(54,242,164,0.06))] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-amber-200 shadow-[0_0_18px_rgba(247,183,51,0.08)]">
            {eyebrow}
          </div>
          <h2 className="section-title font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

