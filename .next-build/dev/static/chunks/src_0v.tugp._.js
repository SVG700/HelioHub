(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/solar.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateSolarFeasibility",
    ()=>calculateSolarFeasibility,
    "estimateSolarOutcome",
    ()=>estimateSolarOutcome,
    "getElectricityRate",
    ()=>getElectricityRate
]);
const getElectricityRate = (location)=>{
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
const calculateSolarFeasibility = (location, sunlightHours)=>{
    const PANEL_WATTAGE = 50;
    const EFFICIENCY = 0.8;
    const PANEL_COST = 3500;
    const TARGET_DAILY_WH = 200;
    const safeSunlightHours = Math.max(0.1, sunlightHours);
    const panelsNeeded = Math.ceil(TARGET_DAILY_WH / (PANEL_WATTAGE * safeSunlightHours * EFFICIENCY));
    const minPanels = Math.max(1, panelsNeeded - 1);
    const maxPanels = Math.min(6, panelsNeeded + 1);
    const minDailyKWh = minPanels * PANEL_WATTAGE * safeSunlightHours * EFFICIENCY / 1000;
    const maxDailyKWh = maxPanels * PANEL_WATTAGE * safeSunlightHours * EFFICIENCY / 1000;
    const minMonthlyKWh = minDailyKWh * 30;
    const maxMonthlyKWh = maxDailyKWh * 30;
    const electricityRate = getElectricityRate(location);
    const minMonthlySavings = Math.round(minMonthlyKWh * electricityRate);
    const maxMonthlySavings = Math.round(maxMonthlyKWh * electricityRate);
    const minAnnualSavings = minMonthlySavings * 12;
    const maxAnnualSavings = maxMonthlySavings * 12;
    const totalCost = maxPanels * PANEL_COST;
    const avgMonthlySavings = Math.max(1, (minMonthlySavings + maxMonthlySavings) / 2);
    const paybackMonths = Math.round(totalCost / avgMonthlySavings);
    const paybackYears = (paybackMonths / 12).toFixed(1);
    let feasibilityLevel = 'LOW';
    let feasibilityColor = 'red';
    if (safeSunlightHours >= 6) {
        feasibilityLevel = 'HIGH';
        feasibilityColor = 'green';
    } else if (safeSunlightHours >= 4.5) {
        feasibilityLevel = 'MEDIUM';
        feasibilityColor = 'yellow';
    }
    const sunlightReadiness = Math.min(100, Math.round(safeSunlightHours / 7 * 100));
    const monthlyCO2Saved = Math.round((minMonthlyKWh + maxMonthlyKWh) / 2 * 0.82);
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
const formatCurrencyRange = (min, max, suffix)=>`₹${min.toLocaleString('en-IN')}–₹${max.toLocaleString('en-IN')} ${suffix}`;
function estimateSolarOutcome(location, sunlightHours) {
    const detailed = calculateSolarFeasibility(location, sunlightHours);
    const feasibility = detailed.feasibilityLevel === 'HIGH' ? 'high' : detailed.feasibilityLevel === 'MEDIUM' ? 'medium' : 'low';
    const estimatedDailyOutput = `${detailed.minDailyKWh}–${detailed.maxDailyKWh} kWh`;
    const panelEstimate = `${detailed.minPanels}–${detailed.maxPanels}`;
    const savings = formatCurrencyRange(detailed.minMonthlySavings, detailed.maxMonthlySavings, 'monthly');
    const recommendation = feasibility === 'high' ? 'Helios AI Recommendation: Your site is ideal for deployment. Prioritize battery storage and smart load balancing to maximize savings.' : feasibility === 'medium' ? 'Helios AI Recommendation: Your region is suitable with moderate yield. A hybrid setup with storage will improve reliability.' : 'Helios AI Recommendation: Solar is possible, but performance will be limited. Consider compact deployment with high-efficiency panels and backup storage.';
    return {
        feasibility,
        energy: `${estimatedDailyOutput} estimated daily generation`,
        panels: `${panelEstimate} panels suggested`,
        savings,
        recommendation
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/helio-state.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HelioStateProvider",
    ()=>HelioStateProvider,
    "useHelioState",
    ()=>useHelioState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$solar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/solar.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const scenarioConfig = {
    high: {
        location: 'Rajasthan',
        sunlightHours: 8.6
    },
    medium: {
        location: 'Chennai',
        sunlightHours: 6.5
    },
    low: {
        location: 'Bengaluru Rain Belt',
        sunlightHours: 3.8
    }
};
const HelioStateContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function HelioStateProvider({ children }) {
    _s();
    const [demoMode, setDemoMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [scenario, setScenario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('medium');
    const [scenarioSignal, setScenarioSignal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [solarContext, setSolarContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        location: 'Chennai',
        sunlightHours: 6.5,
        feasibility: 'medium',
        energy: '0.7–1.3 kWh estimated daily generation',
        panels: '3–4 panels suggested',
        savings: '₹2,500–₹4,500 monthly'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HelioStateProvider.useEffect": ()=>{
            const storedDemo = window.localStorage.getItem('heliohub-demo-mode');
            const storedScenario = window.localStorage.getItem('heliohub-scenario');
            if (storedDemo) setDemoMode(storedDemo === 'on');
            if (storedScenario && [
                'high',
                'medium',
                'low'
            ].includes(storedScenario)) setScenario(storedScenario);
        }
    }["HelioStateProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HelioStateProvider.useEffect": ()=>{
            window.localStorage.setItem('heliohub-demo-mode', demoMode ? 'on' : 'off');
        }
    }["HelioStateProvider.useEffect"], [
        demoMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HelioStateProvider.useEffect": ()=>{
            window.localStorage.setItem('heliohub-scenario', scenario);
        }
    }["HelioStateProvider.useEffect"], [
        scenario
    ]);
    const syncScenarioContext = (nextScenario)=>{
        setScenario(nextScenario);
        const config = scenarioConfig[nextScenario];
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$solar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateSolarOutcome"])(config.location, config.sunlightHours);
        setSolarContext({
            location: config.location,
            sunlightHours: config.sunlightHours,
            feasibility: result.feasibility,
            energy: result.energy,
            panels: result.panels,
            savings: result.savings
        });
        setScenarioSignal((value)=>value + 1);
    };
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HelioStateProvider.useMemo[value]": ()=>({
                demoMode,
                setDemoMode,
                scenario,
                setScenario,
                scenarioSignal,
                solarContext,
                setSolarContext,
                syncScenarioContext
            })
    }["HelioStateProvider.useMemo[value]"], [
        demoMode,
        scenario,
        scenarioSignal,
        solarContext
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HelioStateContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/helio-state.tsx",
        lineNumber: 95,
        columnNumber: 10
    }, this);
}
_s(HelioStateProvider, "FoUKjMR1phDqVK/nFYTb9wvhmfk=");
_c = HelioStateProvider;
function useHelioState() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(HelioStateContext);
    if (!context) {
        throw new Error('useHelioState must be used within HelioStateProvider');
    }
    return context;
}
_s1(useHelioState, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "HelioStateProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const quickLinks = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/dashboard',
        label: 'Dashboard'
    },
    {
        href: '/ai-assistant',
        label: 'AI Assistant'
    },
    {
        href: '/feasibility-tool',
        label: 'Feasibility Tool'
    },
    {
        href: '/team',
        label: 'Team'
    }
];
function Footer() {
    _s();
    const [showTop, setShowTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Footer.useEffect": ()=>{
            const onScroll = {
                "Footer.useEffect.onScroll": ()=>setShowTop(window.scrollY > 280)
            }["Footer.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll);
            return ({
                "Footer.useEffect": ()=>window.removeEventListener('scroll', onScroll)
            })["Footer.useEffect"];
        }
    }["Footer.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "relative mt-10 border-t border-cyan-300/10 bg-[#030712]/95 px-4 pb-8 pt-12 text-sm text-slate-300 shadow-[0_-10px_50px_rgba(0,0,0,0.3)] sm:px-6 lg:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid max-w-7xl gap-8 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-display text-xl font-semibold text-white",
                                children: "HelioHub"
                            }, void 0, false, {
                                fileName: "[project]/src/components/footer.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 max-w-sm leading-7 text-slate-400",
                                children: "AI-Powered Solar Solutions for a Brighter Tomorrow"
                            }, void 0, false, {
                                fileName: "[project]/src/components/footer.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/footer.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200",
                                children: "Quick Links"
                            }, void 0, false, {
                                fileName: "[project]/src/components/footer.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-1",
                                children: quickLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        className: "w-fit text-slate-300 transition hover:translate-x-1 hover:text-amber-200",
                                        children: link.label
                                    }, link.href, false, {
                                        fileName: "[project]/src/components/footer.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/footer.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/footer.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200",
                                children: "Credits"
                            }, void 0, false, {
                                fileName: "[project]/src/components/footer.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 leading-7 text-slate-300",
                                children: "Developed by Samhith, Madhan, and Ruchika."
                            }, void 0, false, {
                                fileName: "[project]/src/components/footer.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 leading-7 text-slate-300",
                                children: "Guided by Dr. Divyarani M S."
                            }, void 0, false, {
                                fileName: "[project]/src/components/footer.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/footer.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/footer.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs uppercase tracking-[0.25em] text-slate-500",
                children: "HelioHub Platform"
            }, void 0, false, {
                fileName: "[project]/src/components/footer.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            showTop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    }),
                className: "glow-button fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-[#081426]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100 shadow-[0_0_24px_rgba(247,183,51,0.2)]",
                "aria-label": "Scroll to top",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiArrowUp"], {}, void 0, false, {
                        fileName: "[project]/src/components/footer.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    "Top"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/footer.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/footer.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(Footer, "4fP+p2ymIOQsAxbtEpYXJu40FKk=");
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/theme-toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
"use client";
;
;
function ThemeToggle() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "surface-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiMoon"], {
                className: "text-amber-200"
            }, void 0, false, {
                fileName: "[project]/src/components/theme-toggle.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            "Dark Mode",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-1 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(54,242,164,0.8)]",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/theme-toggle.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/theme-toggle.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/site-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteShell",
    ()=>SiteShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$helio$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/helio-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/theme-toggle.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const navigationItems = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/dashboard',
        label: 'Dashboard'
    },
    {
        href: '/ai-assistant',
        label: 'AI Assistant'
    },
    {
        href: '/feasibility-tool',
        label: 'Feasibility Tool'
    },
    {
        href: '/team',
        label: 'Team'
    }
];
function Navigation() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { demoMode, setDemoMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$helio$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHelioState"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            setMobileMenuOpen(false);
        }
    }["Navigation.useEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            // Hidden admin shortcut: Ctrl/Cmd + Shift + D toggles demo mode for testing.
            const onKeyDown = {
                "Navigation.useEffect.onKeyDown": (event)=>{
                    const isModifier = event.ctrlKey || event.metaKey;
                    if (isModifier && event.shiftKey && event.key.toLowerCase() === 'd') {
                        event.preventDefault();
                        setDemoMode({
                            "Navigation.useEffect.onKeyDown": (value)=>!value
                        }["Navigation.useEffect.onKeyDown"]);
                    }
                }
            }["Navigation.useEffect.onKeyDown"];
            window.addEventListener('keydown', onKeyDown);
            return ({
                "Navigation.useEffect": ()=>window.removeEventListener('keydown', onKeyDown)
            })["Navigation.useEffect"];
        }
    }["Navigation.useEffect"], [
        setDemoMode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b border-white/10 bg-[#040816]/80 backdrop-blur-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "group flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(247,183,51,0.28),rgba(54,242,164,0.1))] text-sm font-semibold text-white shadow-[0_0_22px_rgba(247,183,51,0.18)]",
                                children: "H"
                            }, void 0, false, {
                                fileName: "[project]/src/components/site-shell.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-display text-xs uppercase tracking-[0.38em] text-amber-200/90",
                                        children: "HelioHub"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/site-shell.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-300",
                                        children: "Smart Solar Charging Station"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/site-shell.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/site-shell.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/site-shell.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex",
                        children: navigationItems.map((item)=>{
                            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: `rounded-full px-4 py-2 text-sm transition ${active ? 'bg-gradient-to-r from-amber-300 to-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(247,183,51,0.18)]' : 'text-slate-300 hover:text-white'}`,
                                "aria-current": active ? 'page' : undefined,
                                children: item.label
                            }, item.href, false, {
                                fileName: "[project]/src/components/site-shell.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/site-shell.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `surface-panel hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] sm:flex ${demoMode ? 'text-emerald-100 shadow-[0_0_22px_rgba(54,242,164,0.16)]' : 'text-slate-300 opacity-80'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `h-2.5 w-2.5 rounded-full ${demoMode ? 'bg-emerald-300 shadow-[0_0_14px_rgba(54,242,164,0.8)]' : 'bg-slate-500'}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/site-shell.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    "Demo Mode"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/site-shell.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                                fileName: "[project]/src/components/site-shell.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setMobileMenuOpen((value)=>!value),
                                "aria-label": "Toggle navigation menu",
                                "aria-expanded": mobileMenuOpen,
                                className: "surface-panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:border-amber-300/35 hover:text-white md:hidden",
                                children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiX"], {}, void 0, false, {
                                    fileName: "[project]/src/components/site-shell.tsx",
                                    lineNumber: 86,
                                    columnNumber: 31
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiMenu"], {}, void 0, false, {
                                    fileName: "[project]/src/components/site-shell.tsx",
                                    lineNumber: 86,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/site-shell.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/site-shell.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/site-shell.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -10
                    },
                    transition: {
                        duration: 0.24
                    },
                    className: "mx-4 mb-4 rounded-2xl border border-white/10 bg-[#091427]/90 p-3 shadow-[0_18px_38px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:mx-6 md:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 border-b border-white/10 px-2 pb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400",
                            children: "Navigate"
                        }, void 0, false, {
                            fileName: "[project]/src/components/site-shell.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: navigationItems.map((item)=>{
                                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${active ? 'bg-gradient-to-r from-amber-300/95 to-emerald-300/90 font-semibold text-slate-950' : 'text-slate-200 hover:bg-white/5'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/site-shell.tsx",
                                            lineNumber: 113,
                                            columnNumber: 21
                                        }, this),
                                        active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-2 w-2 rounded-full bg-slate-950/70"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/site-shell.tsx",
                                            lineNumber: 114,
                                            columnNumber: 31
                                        }, this) : null
                                    ]
                                }, item.href, true, {
                                    fileName: "[project]/src/components/site-shell.tsx",
                                    lineNumber: 108,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/site-shell.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] ${demoMode ? 'text-emerald-100' : 'text-slate-300'}`,
                            children: "Demo Mode"
                        }, void 0, false, {
                            fileName: "[project]/src/components/site-shell.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/site-shell.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/src/components/site-shell.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/site-shell.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(Navigation, "xei+0qXj/Hpif1Ya9+7X/YFoueI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$helio$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHelioState"]
    ];
});
_c = Navigation;
function TransitionShell({ children }) {
    _s1();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: -8
        },
        transition: {
            duration: 0.28,
            ease: 'easeOut'
        },
        children: children
    }, pathname, false, {
        fileName: "[project]/src/components/site-shell.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_s1(TransitionShell, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c1 = TransitionShell;
function SiteShell({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$helio$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelioStateProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#040816] text-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 -z-20 bg-solar-radial"
                }, void 0, false, {
                    fileName: "[project]/src/components/site-shell.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 -z-10 opacity-40 blur-3xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-400/20"
                        }, void 0, false, {
                            fileName: "[project]/src/components/site-shell.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-10 top-48 h-80 w-80 rounded-full bg-emerald-400/18"
                        }, void 0, false, {
                            fileName: "[project]/src/components/site-shell.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/site-shell.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Navigation, {}, void 0, false, {
                    fileName: "[project]/src/components/site-shell.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransitionShell, {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/site-shell.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/site-shell.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                    fileName: "[project]/src/components/site-shell.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/site-shell.tsx",
            lineNumber: 142,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/site-shell.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_c2 = SiteShell;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Navigation");
__turbopack_context__.k.register(_c1, "TransitionShell");
__turbopack_context__.k.register(_c2, "SiteShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0v.tugp._.js.map

