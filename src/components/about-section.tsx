import { SectionShell } from './section-shell';
import { motion } from 'framer-motion';
import { FiBatteryCharging, FiCpu, FiDroplet, FiShield, FiThermometer, FiZap } from 'react-icons/fi';

const features = [
  { icon: FiBatteryCharging, title: 'Solar charging & battery storage', text: 'Integrated capture and storage pipeline for uninterrupted user access.' },
  { icon: FiCpu, title: 'MCU-controlled smart ports', text: 'Adaptive charging logic manages output allocation across active ports.' },
  { icon: FiDroplet, title: 'Real-time monitoring', text: 'Voltage, current, and temperature telemetry feed the control system.' },
  { icon: FiZap, title: 'Dynamic energy allocation', text: 'Prioritizes active demand while preserving reserve capacity.' },
  { icon: FiShield, title: 'Emergency charging mode', text: 'Maintains essential output during peak load or solar fluctuation.' },
  { icon: FiThermometer, title: 'Thermal safety system', text: 'Protective throttling reduces risk during elevated temperatures.' }
];

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Built for modern energy infrastructure"
      description="HelioHub combines smart solar hardware, safety-first control logic, and a clean product-grade interface designed for real investor demos."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -6 }}
            className="glass-card lift-card rounded-3xl p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300/20 via-amber-300/10 to-emerald-300/10 text-2xl text-amber-200">
              <feature.icon />
            </div>
            <h3 className="font-display mt-4 text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}