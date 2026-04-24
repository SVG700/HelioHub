"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSend, FiZap } from 'react-icons/fi';
import { SectionShell } from './section-shell';
import { generateHeliosReply, type ChatMessage } from '@/lib/chat';

export function HeliosChat({
  context,
  demoMode,
  scenario,
  scenarioSignal
}: {
  context: {
    location: string;
    sunlightHours: number;
    feasibility: string;
    energy: string;
    panels: string;
    savings: string;
  };
  demoMode: boolean;
  scenario: 'high' | 'medium' | 'low';
  scenarioSignal: number;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Helios AI online. Ask me about solar feasibility, cost, storage, or energy output.',
      confidence: 'High'
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const postAssistantMessage = async (content: string, confidence: 'High' | 'Medium' | 'Low' = 'High') => {
    setTyping(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1200 + Math.random() * 600));

    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      confidence
    };

    setMessages((current) => [...current, assistantMessage]);
    setTyping(false);
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed
    };

    setMessages((current) => [...current, userMessage]);
    setInput('');

    const reply = generateHeliosReply(trimmed, context);
    await postAssistantMessage(reply.content, reply.confidence);
  };

  useEffect(() => {
    if (!demoMode) return;

    const autoInsights = [
      'Analyzing solar data…',
      `Energy output is stable at ${context.energy}.`,
      'Battery operating within safe limits.',
      `Current deployment confidence remains ${context.feasibility.toUpperCase()}.`
    ];

    const id = window.setInterval(() => {
      const message = autoInsights[Math.floor(Math.random() * autoInsights.length)];
      const confidence = context.feasibility === 'high' ? 'High' : context.feasibility === 'medium' ? 'Medium' : 'Low';
      void postAssistantMessage(`Helios AI Stream: ${message}`, confidence);
    }, 12000);

    return () => window.clearInterval(id);
  }, [context.energy, context.feasibility, demoMode]);

  useEffect(() => {
    if (!demoMode || scenarioSignal === 0) return;

    const scenarioText =
      scenario === 'high'
        ? 'Scenario update received: high sunlight profile activated. Output expectations increased.'
        : scenario === 'medium'
          ? 'Scenario update received: medium sunlight profile activated. Balanced generation profile detected.'
          : 'Scenario update received: low sunlight profile activated. Prioritizing battery-backed resilience.';

    const confidence = scenario === 'high' ? 'High' : scenario === 'medium' ? 'Medium' : 'Low';
    void postAssistantMessage(`Helios AI Analysis: ${scenarioText}`, confidence);
  }, [demoMode, scenario, scenarioSignal]);

  return (
    <SectionShell
      id="ai"
      eyebrow="Helios AI"
      title="Simulated intelligence for solar conversations"
      description="A local, intent-aware assistant that uses your solar inputs to generate dynamic answers without any external API dependency."
    >
      <div className="glass-card lift-card rounded-[2rem] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(247,183,51,0.24),rgba(54,242,164,0.1))] text-amber-100 shadow-[0_0_24px_rgba(247,183,51,0.28)]">
              <FiZap />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-white">Helios AI Assistant</p>
              <p className="text-sm text-slate-400">Analyzing solar data in real time</p>
            </div>
          </div>
          <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">Confidence-aware</div>
        </div>

        <div className="scrollbar-hide max-h-[440px] space-y-4 overflow-y-auto rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-7 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-amber-300 to-orange-300 text-slate-950 shadow-[0_18px_45px_rgba(247,183,51,0.22)]'
                      : 'border border-amber-300/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(247,183,51,0.05))] text-slate-50 shadow-[0_0_40px_rgba(247,183,51,0.08)]'
                  }`}
                >
                  <p>{message.content}</p>
                  {message.confidence && !message.typing ? <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">Confidence Level: {message.confidence === 'High' ? 'High ☀️' : message.confidence === 'Medium' ? 'Medium ⛅' : 'Low 🌧️'}</p> : null}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing ? (
            <div className="flex justify-start">
              <div className="rounded-[1.5rem] border border-amber-300/15 bg-white/5 px-4 py-3 text-sm text-slate-200 shadow-[0_0_30px_rgba(247,183,51,0.08)]">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-amber-300" />
                  Helios AI is analyzing…
                </span>
              </div>
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') sendMessage();
            }}
            placeholder="Ask about solar feasibility, battery storage, cost, or output"
            className="flex-1 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
          />
          <button type="button" onClick={sendMessage} className="glow-button inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950">
            <FiSend />
            Send
          </button>
        </div>
      </div>
    </SectionShell>
  );
}