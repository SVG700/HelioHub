"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiSend, FiUser, FiZap, FiThumbsUp, FiThumbsDown, FiX } from 'react-icons/fi';
import { SectionShell } from './section-shell';
import type { ChatMessage } from '@/lib/chat';
import { getAIResponse, saveFeedback } from '@/lib/heliosAI';
import { FEASIBILITY_STORAGE_KEY, resetFeasibilityData, setFeasibilityData, type FeasibilityData } from '@/lib/feasibilityContext';

type HeliosChatMessage = ChatMessage & {
  action?: 'go-feasibility-tool';
};

const defaultFeasibilityData: FeasibilityData = {
  location: '',
  sunlightHours: 0,
  panelsRequired: '',
  estimatedOutput: '',
  feasibilityLevel: 'Medium',
  monthlySavings: '',
  annualSavings: '',
  electricityRate: 0,
  paybackYears: '',
  co2Saved: '',
  isDataAvailable: false,
  timestamp: 0,
  expiresAt: 0
};

const initialWelcomeMessage: HeliosChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Helios AI online. Ask me about solar feasibility, cost, storage, or energy output.'
};

export function HeliosChat({
  context,
  demoMode: _demoMode,
  scenario: _scenario,
  scenarioSignal: _scenarioSignal
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
  const suggestions = [
    'What is HelioHub?',
    'How does solar charging work?',
    'How many panels do I need?',
    'What is emergency charging mode?',
    'Check solar feasibility'
  ];

  const router = useRouter();

  const [messages, setMessages] = useState<HeliosChatMessage[]>([initialWelcomeMessage]);
  const [feasibilityData, setFeasibilityStoreData] = useState<FeasibilityData>(defaultFeasibilityData);
  const [pendingFeasibilityData, setPendingFeasibilityData] = useState<FeasibilityData | null>(null);
  const [isFeasibilityDataConfirmed, setIsFeasibilityDataConfirmed] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFeasibilityBannerVisible, setIsFeasibilityBannerVisible] = useState(false);
  const [feasibilityBannerLocation, setFeasibilityBannerLocation] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const postAssistantMessage = (
    content: string,
    confidence?: 'High' | 'Medium' | 'Low',
    action?: 'go-feasibility-tool'
  ) => {
    setError(null);

    const assistantMessage: HeliosChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      confidence,
      action,
      feedback: null
    };

    setMessages((current) => [...current, assistantMessage]);
  };

  const isFeasibilityRelatedPrompt = (text: string) => /(feasib|feasible|solar|sunlight|site potential|irradiance|panel|output|location|site|cost|saving|savings|energy|watt|kilowatt|kwh)/i.test(text);
  const isFeasibilityQuestion = (question: string): boolean => {
    const feasibilityKeywords = [
      'feasib', 'panel', 'solar install', 'sunlight', 'location',
      'savings', 'cost', 'output', 'generat', 'kwh', 'watt',
      'how many panel', 'my area', 'my location', 'my city'
    ];
    const q = question.toLowerCase();
    return feasibilityKeywords.some((keyword) => q.includes(keyword));
  };
  const isStrictFeasibilityPrompt = (text: string) => /(feasib|feasible|solar feasibility|site potential|irradiance)/i.test(text);
  const isPanelPrompt = (text: string) => /(panel|panels|how many panels|required panels|panel count)/i.test(text);
  const isOutputPrompt = (text: string) => /(output|energy|generation|generate)/i.test(text);
  const isLocationPrompt = (text: string) => /(location|site location|where should|which city|which area|site)/i.test(text);
  const isCostSavingsPrompt = (text: string) => /(cost|pricing|savings|save|monthly|roi|payback)/i.test(text);

  const getPreviousUserPrompt = (assistantIndex: number) => {
    for (let index = assistantIndex - 1; index >= 0; index -= 1) {
      if (messages[index]?.role === 'user') {
        return messages[index].content;
      }
    }
    return '';
  };

  useEffect(() => {
    const rawStoredData = window.localStorage.getItem(FEASIBILITY_STORAGE_KEY);
    if (rawStoredData) {
      try {
        const parsedData = JSON.parse(rawStoredData) as Partial<FeasibilityData>;
        const expiresAt = Number(parsedData.expiresAt ?? 0);

        if (expiresAt > 0 && Date.now() > expiresAt) {
          window.localStorage.removeItem(FEASIBILITY_STORAGE_KEY);
          resetFeasibilityData();
        } else {
          const candidateData: FeasibilityData = {
            ...defaultFeasibilityData,
            ...parsedData,
            location: String(parsedData.location ?? ''),
            sunlightHours: Number(parsedData.sunlightHours ?? 0),
            panelsRequired: String(parsedData.panelsRequired ?? ''),
            estimatedOutput: String(parsedData.estimatedOutput ?? ''),
            feasibilityLevel: String(parsedData.feasibilityLevel ?? 'Medium'),
            monthlySavings: String(parsedData.monthlySavings ?? ''),
            annualSavings: String(parsedData.annualSavings ?? ''),
            electricityRate: Number(parsedData.electricityRate ?? 0),
            paybackYears: String(parsedData.paybackYears ?? ''),
            co2Saved: String(parsedData.co2Saved ?? ''),
            isDataAvailable: Boolean(parsedData.isDataAvailable),
            timestamp: Number(parsedData.timestamp ?? 0),
            expiresAt
          };

          if (candidateData.isDataAvailable && candidateData.location.trim().length > 0) {
            setPendingFeasibilityData(candidateData);
          }
        }
      } catch (parseError) {
        console.error('Failed to parse stored feasibility data in chat:', parseError);
        window.localStorage.removeItem(FEASIBILITY_STORAGE_KEY);
        resetFeasibilityData();
      }
    }

    const prefilledQuestion = new URLSearchParams(window.location.search).get('q');
    if (prefilledQuestion) {
      setInput(prefilledQuestion);
    }
  }, []);

  const handleFeedback = async (messageId: string, feedbackValue: 'good' | 'bad') => {
    const message = messages.find((m) => m.id === messageId);
    if (!message || message.role !== 'assistant') return;

    await saveFeedback(
      messages.find((m) => m.role === 'user' && messages.indexOf(m) < messages.indexOf(message))?.content || 'Unknown',
      message.content,
      feedbackValue
    );

    setMessages((current) =>
      current.map((m) => (m.id === messageId ? { ...m, feedback: feedbackValue } : m))
    );
  };

  const sendPrompt = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    setError(null);

    const userMessage: HeliosChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed
    };

    setMessages((current) => [...current, userMessage]);
    setInput('');

    try {
      if (isFeasibilityRelatedPrompt(trimmed) && !feasibilityData.isDataAvailable) {
        postAssistantMessage(
          'Please use the Solar Feasibility Tool first so I can give you personalized results! 🌞 [Go to Feasibility Tool ->]',
          undefined,
          'go-feasibility-tool'
        );
        return;
      }

      setIsThinking(true);
      await new Promise((resolve) => window.setTimeout(resolve, 1500));
      const reply = await getAIResponse(trimmed);
      setIsThinking(false);

      if (isStrictFeasibilityPrompt(trimmed)) {
        const confidence: 'High' | 'Medium' | 'Low' = feasibilityData.isDataAvailable
          ? feasibilityData.feasibilityLevel.toLowerCase() === 'high'
            ? 'High'
            : feasibilityData.feasibilityLevel.toLowerCase() === 'medium'
              ? 'Medium'
              : 'Low'
          : context.feasibility === 'high' ? 'High' : context.feasibility === 'medium' ? 'Medium' : 'Low';
        postAssistantMessage(reply, confidence);
        return;
      }

      postAssistantMessage(reply);
    } catch (err) {
      console.error('Error generating reply:', err);
      setError('Server error, try again later');
      setIsThinking(false);
      postAssistantMessage('Server error. Please try again later.');
    }
  };

  const sendMessage = async () => {
    await sendPrompt(input);
  };

  const handleUsePreviousFeasibilityData = () => {
    if (!pendingFeasibilityData) return;

    setFeasibilityData(pendingFeasibilityData);
    setFeasibilityStoreData(pendingFeasibilityData);
    setIsFeasibilityDataConfirmed(true);
    setFeasibilityBannerLocation(pendingFeasibilityData.location);
    setIsFeasibilityBannerVisible(true);
    setPendingFeasibilityData(null);
  };

  const handleStartFreshFromPrompt = () => {
    window.localStorage.removeItem(FEASIBILITY_STORAGE_KEY);
    resetFeasibilityData();
    setFeasibilityStoreData(defaultFeasibilityData);
    setIsFeasibilityDataConfirmed(false);
    setIsFeasibilityBannerVisible(false);
    setFeasibilityBannerLocation('');
    setPendingFeasibilityData(null);
    setMessages([initialWelcomeMessage]);
  };

  const handleClearAndStartFresh = () => {
    window.localStorage.removeItem(FEASIBILITY_STORAGE_KEY);
    resetFeasibilityData();
    setFeasibilityStoreData(defaultFeasibilityData);
    setIsFeasibilityDataConfirmed(false);
    setIsFeasibilityBannerVisible(false);
    setFeasibilityBannerLocation('');
    setPendingFeasibilityData(null);
    setMessages([
      initialWelcomeMessage,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Starting fresh! Ask me anything about solar energy.'
      }
    ]);
  };

  const getStructuredCards = (message: HeliosChatMessage, userPrompt: string) => {
    if (message.role !== 'assistant') return [] as Array<{ label: string; value: string }>;
    if (!feasibilityData.isDataAvailable) return [] as Array<{ label: string; value: string }>;
    if (!isFeasibilityDataConfirmed) return [] as Array<{ label: string; value: string }>;
    if (!isFeasibilityQuestion(userPrompt)) return [] as Array<{ label: string; value: string }>;

    const asksFeasibility = isFeasibilityRelatedPrompt(userPrompt);
    const asksPanels = isPanelPrompt(userPrompt);
    const asksOutput = isOutputPrompt(userPrompt);
    const asksLocation = isLocationPrompt(userPrompt);
    const asksCostOrSavings = isCostSavingsPrompt(userPrompt);

    const cards: Array<{ label: string; value: string }> = [];

    if (!asksFeasibility && !asksPanels && !asksOutput && !asksLocation && !asksCostOrSavings) {
      return [] as Array<{ label: string; value: string }>;
    }

    if (asksFeasibility) {
      cards.push({ label: 'Site Feasibility', value: feasibilityData.feasibilityLevel });
      cards.push({ label: 'Sunlight Window', value: `${feasibilityData.sunlightHours} hrs/day` });
    }

    if (asksPanels) {
      cards.push({ label: 'Required Panels', value: String(feasibilityData.panelsRequired) });
    }

    if (asksOutput) {
      cards.push({ label: 'Estimated Output', value: feasibilityData.estimatedOutput });
    }

    if (asksLocation && feasibilityData.location.trim().length > 0) {
      cards.push({ label: 'Site Location', value: feasibilityData.location });
    }

    if (asksCostOrSavings) {
      cards.push({ label: 'Monthly Savings', value: feasibilityData.monthlySavings });
    }

    const uniqueCards = cards.filter(
      (card, index, list) => list.findIndex((item) => item.label === card.label) === index
    );

    return uniqueCards;
  };

  return (
    <SectionShell
      id="ai"
      eyebrow="Helios AI"
      title="Production-grade AI for solar conversations"
      description="Powered by Gemini AI with solar domain expertise"
    >
      <div className="glass-card lift-card relative overflow-hidden rounded-[2rem] p-6">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(247,183,51,0.35),transparent_65%)] blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),transparent_65%)] blur-2xl" />

        <div className="relative mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/35 bg-[linear-gradient(145deg,rgba(247,183,51,0.33),rgba(247,183,51,0.1))] text-amber-100 shadow-[0_0_24px_rgba(247,183,51,0.28)]">
              <FiZap className="text-lg" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-white">Helios AI Assistant</p>
              <p className="text-sm text-slate-400">AI-powered intelligence interface</p>
            </div>
          </div>

          <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
            Helios Core Online
          </div>
        </div>

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-300"
          >
            {error}
          </motion.div>
        ) : null}

        {pendingFeasibilityData ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-xl border border-amber-300/35 bg-amber-300/10 px-4 py-3 text-sm text-amber-100"
          >
            <p>
              🌞 I found previous feasibility data for {pendingFeasibilityData.location}. Would you like me to use this data?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleUsePreviousFeasibilityData}
                className="rounded-full border border-emerald-300/40 bg-emerald-300/15 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition duration-150 hover:border-emerald-300/65 hover:bg-emerald-300/25"
              >
                ✅ Yes, use this data
              </button>
              <button
                type="button"
                onClick={handleStartFreshFromPrompt}
                className="rounded-full border border-amber-300/40 bg-amber-300/15 px-3 py-1.5 text-xs font-semibold text-amber-100 transition duration-150 hover:border-amber-300/65 hover:bg-amber-300/25"
              >
                🔄 No, start fresh
              </button>
            </div>
          </motion.div>
        ) : null}

        {isFeasibilityBannerVisible && feasibilityBannerLocation ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-emerald-300/35 bg-emerald-300/12 px-4 py-3 text-sm text-emerald-100"
          >
            <p>🌞 Feasibility data loaded for {feasibilityBannerLocation}. Ask me anything about your solar setup!</p>
            <button
              type="button"
              onClick={() => setIsFeasibilityBannerVisible(false)}
              className="rounded-full border border-emerald-300/35 bg-emerald-300/10 p-1 text-emerald-100 transition duration-150 hover:border-emerald-300/60 hover:bg-emerald-300/20"
              aria-label="Dismiss feasibility banner"
            >
              <FiX className="text-xs" />
            </button>
            <button
              type="button"
              onClick={handleClearAndStartFresh}
              className="rounded-full border border-amber-300/35 bg-amber-300/10 px-2.5 py-1 text-xs font-semibold text-amber-100 transition duration-150 hover:border-amber-300/60 hover:bg-amber-300/20"
            >
              🔄 Clear &amp; Start Fresh
            </button>
          </motion.div>
        ) : null}

        <div className="scrollbar-hide relative max-h-[60vh] space-y-4 overflow-y-auto rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(3,9,20,0.92),rgba(9,18,35,0.82))] p-4">
          <AnimatePresence initial={false}>
            {messages.map((message, messageIndex) => {
              const previousUserPrompt = getPreviousUserPrompt(messageIndex);
              const showConfidence = message.role === 'assistant' && isStrictFeasibilityPrompt(previousUserPrompt);
              const structuredCards = getStructuredCards(message, previousUserPrompt);

              return (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.34, ease: 'easeOut' }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex w-full max-w-[92%] items-end gap-2 sm:max-w-[82%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                      message.role === 'assistant'
                        ? 'border-amber-300/40 bg-[linear-gradient(145deg,rgba(247,183,51,0.3),rgba(247,183,51,0.08))] text-amber-100'
                        : 'border-slate-400/30 bg-slate-900/60 text-slate-200'
                    }`}
                  >
                    {message.role === 'assistant' ? <FiZap className="text-sm" /> : <FiUser className="text-sm" />}
                  </div>

                  <div
                    className={`group rounded-[1.35rem] border px-4 py-3 text-sm leading-7 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.28)] ${
                      message.role === 'user'
                        ? 'border-amber-300/45 bg-[linear-gradient(145deg,rgba(247,183,51,0.9),rgba(249,145,35,0.82))] text-slate-950 shadow-[0_12px_30px_rgba(247,183,51,0.25)]'
                        : 'border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(247,183,51,0.08))] text-slate-50 shadow-[0_14px_36px_rgba(7,11,22,0.45)]'
                    }`}
                  >
                    <p>{message.content}</p>

                    {message.confidence && !message.typing && showConfidence ? (
                      <p className={`mt-2 text-[10px] uppercase tracking-[0.24em] ${message.role === 'user' ? 'text-slate-900/70' : 'text-slate-300'}`}>
                        Confidence: {message.confidence}
                      </p>
                    ) : null}

                    {structuredCards.length > 0 ? (
                      <div className="mt-3 grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-2.5 sm:grid-cols-3">
                        {structuredCards.map((card) => (
                          <div key={`${message.id}-${card.label}`} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 transition duration-200 group-hover:border-amber-300/30">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
                            <p className="mt-1 text-xs font-semibold text-slate-100">{card.value}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {message.role === 'assistant' ? (
                      <div className="mt-3 flex items-center gap-1">
                        {message.action === 'go-feasibility-tool' ? (
                          <button
                            type="button"
                            onClick={() => router.push('/feasibility-tool')}
                            className="mr-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1.5 text-xs font-semibold text-amber-100 transition duration-150 hover:border-amber-300/70 hover:bg-amber-300/20"
                          >
                            Go to Feasibility Tool
                          </button>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => void handleFeedback(message.id, 'good')}
                          className={`flex h-7 w-7 items-center justify-center rounded-full border text-emerald-300 transition duration-150 hover:border-emerald-300/70 hover:bg-emerald-400/20 hover:shadow-[0_0_14px_rgba(16,185,129,0.45)] ${message.feedback === 'good' ? 'border-emerald-300/70 bg-emerald-400/20' : 'border-emerald-400/30 bg-emerald-400/10'}`}
                          title="Good answer"
                        >
                          <FiThumbsUp className="text-xs" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleFeedback(message.id, 'bad')}
                          className={`flex h-7 w-7 items-center justify-center rounded-full border text-red-300 transition duration-150 hover:border-red-300/70 hover:bg-red-400/20 hover:shadow-[0_0_14px_rgba(248,113,113,0.45)] ${message.feedback === 'bad' ? 'border-red-300/70 bg-red-400/20' : 'border-red-400/30 bg-red-400/10'}`}
                          title="Bad answer"
                        >
                          <FiThumbsDown className="text-xs" />
                        </button>
                        {message.feedback ? <p className="ml-2 text-xs text-slate-400">Thanks for your feedback!</p> : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            )})}
          </AnimatePresence>

          {isThinking ? (
            <div className="flex justify-start">
              <div className="flex items-end gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/40 bg-[linear-gradient(145deg,rgba(247,183,51,0.3),rgba(247,183,51,0.08))] text-amber-100">
                  <FiZap className="text-sm" />
                </div>
                <div className="rounded-[1.35rem] border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(247,183,51,0.08))] px-4 py-3 text-sm text-slate-100 backdrop-blur-xl shadow-[0_14px_36px_rgba(7,11,22,0.45)]">
                  <span className="inline-flex items-center gap-2">🌞 Helios AI is analyzing your query...</span>
                </div>
              </div>
            </div>
          ) : null}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') void sendMessage();
            }}
            placeholder="Ask about solar feasibility, battery storage, cost, or output"
            className="flex-1 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none backdrop-blur-md placeholder:text-slate-500 transition duration-200 focus:border-amber-300/55 focus:bg-black/45"
          />
          <button
            type="button"
            onClick={() => void sendMessage()}
            className="glow-button inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:scale-[1.02]"
          >
            <FiSend />
            Send
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void sendPrompt(suggestion)}
              className="rounded-full border border-amber-300/25 bg-white/[0.04] px-3 py-1.5 text-xs font-medium tracking-[0.04em] text-amber-100 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/55 hover:bg-amber-300/15"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

