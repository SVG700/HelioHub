(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/section-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionShell",
    ()=>SectionShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function SectionShell({ eyebrow, title, description, children, id }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: id,
        className: "relative px-4 py-16 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-10 max-w-3xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-amber-200",
                            children: eyebrow
                        }, void 0, false, {
                            fileName: "[project]/src/components/section-shell.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-title font-display text-3xl font-semibold text-white sm:text-4xl",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/section-shell.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-base leading-7 text-slate-300",
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/src/components/section-shell.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/section-shell.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/section-shell.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/section-shell.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = SectionShell;
var _c;
__turbopack_context__.k.register(_c, "SectionShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/feasibilityContext.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFeasibilityData",
    ()=>getFeasibilityData,
    "loadFeasibilityData",
    ()=>loadFeasibilityData,
    "resetFeasibilityData",
    ()=>resetFeasibilityData,
    "setFeasibilityData",
    ()=>setFeasibilityData,
    "subscribeFeasibilityData",
    ()=>subscribeFeasibilityData
]);
const FEASIBILITY_STORAGE_KEY = 'heliohub-feasibility-data';
const defaultFeasibilityData = {
    location: '',
    sunlightHours: 0,
    panelsRequired: '',
    estimatedOutput: '',
    feasibilityLevel: 'Medium',
    monthlySavings: '',
    electricityRate: 0,
    minMonthlySavings: 0,
    maxMonthlySavings: 0,
    minAnnualSavings: 0,
    maxAnnualSavings: 0,
    paybackYears: '',
    monthlyCO2Saved: 0,
    isDataAvailable: false
};
let feasibilityData = {
    ...defaultFeasibilityData
};
let hydratedFromStorage = false;
const listeners = new Set();
function isBrowser() {
    return ("TURBOPACK compile-time value", "object") !== 'undefined';
}
function readFromStorage() {
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(FEASIBILITY_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return {
            ...defaultFeasibilityData,
            ...parsed,
            panelsRequired: String(parsed.panelsRequired ?? ''),
            sunlightHours: Number(parsed.sunlightHours ?? 0),
            electricityRate: Number(parsed.electricityRate ?? 0),
            minMonthlySavings: Number(parsed.minMonthlySavings ?? 0),
            maxMonthlySavings: Number(parsed.maxMonthlySavings ?? 0),
            minAnnualSavings: Number(parsed.minAnnualSavings ?? 0),
            maxAnnualSavings: Number(parsed.maxAnnualSavings ?? 0),
            paybackYears: String(parsed.paybackYears ?? ''),
            monthlyCO2Saved: Number(parsed.monthlyCO2Saved ?? 0),
            isDataAvailable: Boolean(parsed.isDataAvailable)
        };
    } catch (error) {
        console.error('Failed to parse feasibility data from localStorage:', error);
        return null;
    }
}
function writeToStorage(value) {
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.setItem(FEASIBILITY_STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
        console.error('Failed to save feasibility data to localStorage:', error);
    }
}
function loadFeasibilityData() {
    if (!hydratedFromStorage) {
        const storedData = readFromStorage();
        if (storedData) {
            feasibilityData = storedData;
        }
        hydratedFromStorage = true;
    }
    return {
        ...feasibilityData
    };
}
function setFeasibilityData(value) {
    feasibilityData = {
        ...defaultFeasibilityData,
        ...value
    };
    writeToStorage(feasibilityData);
    listeners.forEach((listener)=>listener(feasibilityData));
}
function getFeasibilityData() {
    return loadFeasibilityData();
}
function subscribeFeasibilityData(listener) {
    listeners.add(listener);
    return ()=>{
        listeners.delete(listener);
    };
}
function resetFeasibilityData() {
    if (isBrowser()) {
        window.localStorage.removeItem(FEASIBILITY_STORAGE_KEY);
    }
    feasibilityData = {
        ...defaultFeasibilityData
    };
    listeners.forEach((listener)=>listener(feasibilityData));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/feasibility-tool.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeasibilityTool",
    ()=>FeasibilityTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$section$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/section-shell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$solar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/solar.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feasibilityContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/feasibilityContext.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const scenarioDefaults = {
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
function FeasibilityTool({ onResult, scenario, demoMode }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [location, setLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sunlightHours, setSunlightHours] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(6.0);
    const [calculatedResult, setCalculatedResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCalculating, setIsCalculating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [locationStatus, setLocationStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [locationError, setLocationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [shareMessage, setShareMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasSharedData, setHasSharedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stayOnPage, setStayOnPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const stayOnPageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const sunlightProgress = calculatedResult?.sunlightReadiness ?? Math.min(100, Math.round(sunlightHours / 7 * 100));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeasibilityTool.useEffect": ()=>{
            if (!demoMode) return;
            const defaults = scenarioDefaults[scenario];
            setLocation(defaults.location);
            setSunlightHours(defaults.sunlightHours);
            setCalculatedResult(null);
            setHasSharedData(false);
            setShareMessage(null);
            setLocationStatus('idle');
            setLocationError(null);
        }
    }["FeasibilityTool.useEffect"], [
        scenario,
        demoMode
    ]);
    const resultCards = calculatedResult ? [
        {
            label: 'Panels',
            value: `${calculatedResult.minPanels}–${calculatedResult.maxPanels} panels suggested`,
            subtitle: 'Based on 50W panels',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiZap"]
        },
        {
            label: 'Energy',
            value: `${calculatedResult.minDailyKWh}–${calculatedResult.maxDailyKWh} kWh/day`,
            subtitle: 'Estimated daily generation',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiActivity"]
        },
        {
            label: 'Monthly Savings',
            value: `₹${calculatedResult.minMonthlySavings.toLocaleString('en-IN')}–₹${calculatedResult.maxMonthlySavings.toLocaleString('en-IN')}/month`,
            subtitle: `At ₹${calculatedResult.electricityRate}/kWh in ${location.trim() || 'your area'}`,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiDollarSign"]
        },
        {
            label: 'Annual Savings',
            value: `₹${calculatedResult.minAnnualSavings.toLocaleString('en-IN')}–₹${calculatedResult.maxAnnualSavings.toLocaleString('en-IN')}/year`,
            subtitle: 'Projected yearly savings',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiTarget"]
        },
        {
            label: 'Payback Period',
            value: `${calculatedResult.paybackYears} years`,
            subtitle: 'Estimated investment recovery',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiTarget"]
        },
        {
            label: 'CO2 Impact',
            value: `${calculatedResult.monthlyCO2Saved} kg CO2/month`,
            subtitle: 'Carbon footprint reduced',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiActivity"]
        }
    ] : [];
    const clearCalculatedState = ()=>{
        setCalculatedResult(null);
        setHasSharedData(false);
        setShareMessage(null);
    };
    const detectLocation = ()=>{
        setLocationStatus('detecting');
        setLocationError(null);
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            setLocationStatus('error');
            setLocationError('Location requires HTTPS. Please enter city manually.');
            return;
        }
        if (!navigator.geolocation) {
            setLocationStatus('unsupported');
            setLocationError('Geolocation is not supported by your browser. Please enter location manually.');
            return;
        }
        navigator.geolocation.getCurrentPosition(async (position)=>{
            try {
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
                    headers: {
                        'Accept-Language': 'en'
                    }
                });
                if (!response.ok) {
                    throw new Error(`Reverse geocoding failed with status ${response.status}`);
                }
                const data = await response.json();
                const city = data?.address?.city || data?.address?.town || data?.address?.village || data?.address?.county || data?.address?.state || 'Your Location';
                setLocation(city);
                const lat = Math.abs(latitude);
                let sunlight = 5.5;
                if (lat < 15) sunlight = 6.5;
                else if (lat < 25) sunlight = 6.0;
                else if (lat < 35) sunlight = 5.0;
                else sunlight = 4.0;
                setSunlightHours(sunlight);
                clearCalculatedState();
                setLocationStatus('success');
            } catch (error) {
                console.error('Location lookup failed:', error);
                setLocationStatus('error');
                setLocationError('Could not fetch location name. Please enter manually.');
            }
        }, (error)=>{
            console.error('Geolocation permission error:', error);
            setLocationStatus('error');
            switch(error.code){
                case error.PERMISSION_DENIED:
                    setLocationError('Location permission denied. Please enter your city manually below.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    setLocationError('Location unavailable. Please enter your city manually.');
                    break;
                case error.TIMEOUT:
                    setLocationError('Location request timed out. Please enter manually.');
                    break;
                default:
                    setLocationError('Could not detect location. Please enter manually.');
            }
        }, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
        });
    };
    const handleCalculate = async ()=>{
        const trimmedLocation = location.trim();
        if (!trimmedLocation) {
            setLocationStatus('error');
            setLocationError('Please enter a location to continue.');
            return;
        }
        setLocationError(null);
        if (locationStatus !== 'success') {
            setLocationStatus('idle');
        }
        clearCalculatedState();
        setIsCalculating(true);
        await new Promise((resolve)=>window.setTimeout(resolve, 2000));
        const computed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$solar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateSolarFeasibility"])(trimmedLocation, sunlightHours);
        const feasibilityLevel = computed.feasibilityLevel;
        const recommendation = feasibilityLevel === 'HIGH' ? 'Helios AI Recommendation: Excellent sunlight profile. Prioritize smart load balancing and battery storage to maximize yearly savings.' : feasibilityLevel === 'MEDIUM' ? 'Helios AI Recommendation: Good solar potential. A balanced panel and storage setup offers reliable daily charging and strong payback.' : 'Helios AI Recommendation: Limited sunlight profile. Focus on high-efficiency panels and a compact design to improve recovery and reliability.';
        setCalculatedResult({
            ...computed,
            recommendation
        });
        onResult({
            location: trimmedLocation,
            sunlightHours,
            feasibility: feasibilityLevel.toLowerCase(),
            energy: `${computed.minDailyKWh}–${computed.maxDailyKWh} kWh/day estimated daily generation`,
            panels: `${computed.minPanels}–${computed.maxPanels} panels suggested`,
            savings: `₹${computed.minMonthlySavings.toLocaleString('en-IN')}–₹${computed.maxMonthlySavings.toLocaleString('en-IN')} monthly`
        });
        setIsCalculating(false);
    };
    const handleShareWithAI = ()=>{
        if (!calculatedResult) return;
        const feasibilityLevel = calculatedResult.feasibilityLevel === 'HIGH' ? 'High' : calculatedResult.feasibilityLevel === 'MEDIUM' ? 'Medium' : 'Low';
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feasibilityContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setFeasibilityData"])({
            location: location.trim(),
            sunlightHours,
            panelsRequired: `${calculatedResult.minPanels}–${calculatedResult.maxPanels} panels`,
            estimatedOutput: `${calculatedResult.minDailyKWh}–${calculatedResult.maxDailyKWh} kWh/day`,
            feasibilityLevel,
            monthlySavings: `₹${calculatedResult.minMonthlySavings.toLocaleString('en-IN')}–₹${calculatedResult.maxMonthlySavings.toLocaleString('en-IN')}`,
            electricityRate: calculatedResult.electricityRate,
            minMonthlySavings: calculatedResult.minMonthlySavings,
            maxMonthlySavings: calculatedResult.maxMonthlySavings,
            minAnnualSavings: calculatedResult.minAnnualSavings,
            maxAnnualSavings: calculatedResult.maxAnnualSavings,
            paybackYears: calculatedResult.paybackYears,
            monthlyCO2Saved: calculatedResult.monthlyCO2Saved,
            isDataAvailable: true
        });
        setHasSharedData(true);
        setShareMessage('✅ Data sent to Helios AI! Ask me anything about your solar setup.');
        stayOnPageRef.current = false;
        setStayOnPage(false);
        window.setTimeout(()=>{
            if (!stayOnPageRef.current) {
                router.push('/ai-assistant');
            }
        }, 1500);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$section$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionShell"], {
        id: "feasibility",
        eyebrow: "Solar Feasibility",
        title: "Evaluate deployment potential in seconds",
        description: "A simulation-based planner that estimates performance, panel sizing, and savings while generating an intelligent Helios AI recommendation.",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-6 lg:grid-cols-[1.05fr_0.95fr]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-card lift-card rounded-[2rem] p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-sm text-slate-300",
                            children: "Location"
                        }, void 0, false, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 298,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: location,
                            onChange: (event)=>{
                                setLocation(event.target.value);
                                setLocationStatus('idle');
                                setLocationError(null);
                                clearCalculatedState();
                            },
                            className: "mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/50",
                            placeholder: "Enter city, region, or site name"
                        }, void 0, false, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: detectLocation,
                            disabled: locationStatus === 'detecting',
                            className: "mt-3 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition duration-200 hover:border-cyan-300/60 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-70",
                            children: locationStatus === 'detecting' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        className: "inline-block h-3 w-3 rounded-full border border-cyan-200 border-t-transparent",
                                        animate: {
                                            rotate: 360
                                        },
                                        transition: {
                                            repeat: Number.POSITIVE_INFINITY,
                                            duration: 0.9,
                                            ease: 'linear'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/feasibility-tool.tsx",
                                        lineNumber: 319,
                                        columnNumber: 17
                                    }, this),
                                    "📍 Detecting your location..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/feasibility-tool.tsx",
                                lineNumber: 318,
                                columnNumber: 15
                            }, this) : '📍 Use My Current Location'
                        }, void 0, false, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 311,
                            columnNumber: 11
                        }, this),
                        locationStatus === 'success' && location.trim().length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200",
                            children: [
                                "✅ Location detected: ",
                                location
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this) : null,
                        (locationStatus === 'error' || locationStatus === 'unsupported') && locationError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 rounded-2xl border border-amber-300/35 bg-amber-300/10 px-4 py-2 text-sm text-amber-100",
                            children: locationError
                        }, void 0, false, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 338,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between text-sm text-slate-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Sunlight hours"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feasibility-tool.tsx",
                                            lineNumber: 345,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                sunlightHours.toFixed(1),
                                                " hrs/day"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/feasibility-tool.tsx",
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "2",
                                    max: "10",
                                    step: "0.1",
                                    value: sunlightHours,
                                    onChange: (event)=>{
                                        setSunlightHours(Number(event.target.value));
                                        clearCalculatedState();
                                    },
                                    className: "mt-3 w-full accent-amber-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 348,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 343,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>void handleCalculate(),
                            disabled: isCalculating,
                            className: "glow-button mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 px-4 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-80",
                            children: "⚡ Calculate Solar Feasibility"
                        }, void 0, false, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 362,
                            columnNumber: 11
                        }, this),
                        isCalculating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-2",
                                children: [
                                    "🌞 Helios AI is analyzing solar potential for your location...",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        initial: {
                                            opacity: 0.2
                                        },
                                        animate: {
                                            opacity: [
                                                0.2,
                                                1,
                                                0.2
                                            ]
                                        },
                                        transition: {
                                            repeat: Number.POSITIVE_INFINITY,
                                            duration: 1.2
                                        },
                                        children: "•••"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/feasibility-tool.tsx",
                                        lineNumber: 375,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/feasibility-tool.tsx",
                                lineNumber: 373,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 372,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 rounded-3xl border border-white/10 bg-black/20 p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Sunlight Readiness"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feasibility-tool.tsx",
                                            lineNumber: 388,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                sunlightProgress,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/feasibility-tool.tsx",
                                            lineNumber: 389,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 387,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 h-2 overflow-hidden rounded-full bg-white/10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        animate: {
                                            width: `${sunlightProgress}%`
                                        },
                                        transition: {
                                            duration: 0.6
                                        },
                                        className: "h-full rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/feasibility-tool.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 391,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 386,
                            columnNumber: 11
                        }, this),
                        calculatedResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 grid gap-4 sm:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `surface-panel lift-card rounded-3xl border p-4 sm:col-span-2 ${calculatedResult.feasibilityColor === 'green' ? 'border-emerald-300/35 bg-emerald-300/10' : calculatedResult.feasibilityColor === 'yellow' ? 'border-amber-300/35 bg-amber-300/10' : 'border-red-300/35 bg-red-300/10'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs uppercase tracking-[0.28em] text-slate-300",
                                                    children: "Feasibility"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiTarget"], {
                                                    className: "text-base text-white/90"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/feasibility-tool.tsx",
                                            lineNumber: 407,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-lg font-semibold text-white",
                                            children: calculatedResult.feasibilityLevel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feasibility-tool.tsx",
                                            lineNumber: 411,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 398,
                                    columnNumber: 15
                                }, this),
                                resultCards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        layout: true,
                                        className: "surface-panel lift-card rounded-3xl p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs uppercase tracking-[0.28em] text-slate-400",
                                                        children: card.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/feasibility-tool.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(card.icon, {
                                                        className: "text-base text-amber-200"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/feasibility-tool.tsx",
                                                        lineNumber: 418,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/feasibility-tool.tsx",
                                                lineNumber: 416,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 text-lg font-semibold text-white",
                                                children: card.value
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/feasibility-tool.tsx",
                                                lineNumber: 420,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-400",
                                                children: card.subtitle
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/feasibility-tool.tsx",
                                                lineNumber: 421,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, card.label, true, {
                                        fileName: "[project]/src/components/feasibility-tool.tsx",
                                        lineNumber: 415,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 397,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/feasibility-tool.tsx",
                    lineNumber: 297,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.35
                    },
                    className: "glass-card lift-card rounded-[2rem] p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-3xl border border-amber-300/10 bg-[linear-gradient(145deg,rgba(247,183,51,0.08),rgba(54,242,164,0.04))] p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm uppercase tracking-[0.3em] text-amber-200",
                                    children: "Helios AI Recommendation"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 430,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-lg leading-8 text-slate-100",
                                    children: calculatedResult ? calculatedResult.recommendation : 'Run the feasibility calculation to get a personalized Helios AI recommendation for your location.'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 431,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 429,
                            columnNumber: 11
                        }, this),
                        calculatedResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleShareWithAI,
                            className: "glow-button mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950",
                            children: hasSharedData ? '✅ Data Shared with Helios AI' : 'Use this data in Helios AI'
                        }, void 0, false, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 439,
                            columnNumber: 13
                        }, this) : null,
                        shareMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: shareMessage
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 450,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        stayOnPageRef.current = true;
                                        setStayOnPage(true);
                                    },
                                    className: "mt-2 text-xs font-semibold text-emerald-200 underline underline-offset-2",
                                    children: "Stay on this page"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 451,
                                    columnNumber: 15
                                }, this),
                                stayOnPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-xs text-emerald-200",
                                    children: "Auto-navigation cancelled."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feasibility-tool.tsx",
                                    lineNumber: 461,
                                    columnNumber: 29
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 449,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 rounded-3xl border border-emerald-300/15 bg-emerald-300/5 p-5 text-sm leading-7 text-slate-300",
                            children: "A higher sunlight score increases feasibility, panel efficiency, and projected savings while improving confidence in charging reliability. The current site profile is framed as a product-grade deployment rather than a prototype."
                        }, void 0, false, {
                            fileName: "[project]/src/components/feasibility-tool.tsx",
                            lineNumber: 465,
                            columnNumber: 11
                        }, this)
                    ]
                }, calculatedResult?.recommendation ?? 'pending', true, {
                    fileName: "[project]/src/components/feasibility-tool.tsx",
                    lineNumber: 428,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/feasibility-tool.tsx",
            lineNumber: 296,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/feasibility-tool.tsx",
        lineNumber: 290,
        columnNumber: 5
    }, this);
}
_s(FeasibilityTool, "xZvb+YQT8AUcuixh+1vNQrYjgN8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = FeasibilityTool;
var _c;
__turbopack_context__.k.register(_c, "FeasibilityTool");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/feasibility-tool/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeasibilityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feasibility$2d$tool$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feasibility-tool.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$helio$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/helio-state.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function FeasibilityPage() {
    _s();
    const { demoMode, scenario, syncScenarioContext, setSolarContext } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$helio$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHelioState"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "px-4 py-8 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-6xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.35
                    },
                    className: "glass-card rounded-[2rem] p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm uppercase tracking-[0.3em] text-amber-200",
                            children: "Feasibility Tool"
                        }, void 0, false, {
                            fileName: "[project]/src/app/feasibility-tool/page.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "font-display mt-3 text-3xl font-semibold text-white sm:text-4xl",
                            children: "Solar viability analysis"
                        }, void 0, false, {
                            fileName: "[project]/src/app/feasibility-tool/page.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 max-w-2xl text-sm leading-7 text-slate-300",
                            children: "A focused analysis page for sunlight, panel sizing, projected output, and Helios AI recommendations."
                        }, void 0, false, {
                            fileName: "[project]/src/app/feasibility-tool/page.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex flex-wrap gap-3",
                            children: [
                                [
                                    'high',
                                    'medium',
                                    'low'
                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>syncScenarioContext(item),
                                        className: `rounded-full px-4 py-2 text-sm transition ${scenario === item ? 'bg-amber-300 text-slate-950' : 'surface-panel text-slate-200'}`,
                                        children: item === 'high' ? 'High Sunlight ☀️' : item === 'medium' ? 'Medium ⛅' : 'Low 🌧️'
                                    }, item, false, {
                                        fileName: "[project]/src/app/feasibility-tool/page.tsx",
                                        lineNumber: 22,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `ml-auto rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${demoMode ? 'bg-emerald-300/15 text-emerald-100' : 'surface-panel text-slate-300'}`,
                                    children: "Demo Mode"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/feasibility-tool/page.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/feasibility-tool/page.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/feasibility-tool/page.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feasibility$2d$tool$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeasibilityTool"], {
                        onResult: setSolarContext,
                        scenario: scenario,
                        demoMode: demoMode
                    }, void 0, false, {
                        fileName: "[project]/src/app/feasibility-tool/page.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/feasibility-tool/page.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/feasibility-tool/page.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/feasibility-tool/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_s(FeasibilityPage, "gUxqyTqOPCA4YQtQe4blpf0sbGI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$helio$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHelioState"]
    ];
});
_c = FeasibilityPage;
var _c;
__turbopack_context__.k.register(_c, "FeasibilityPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0n.stlh._.js.map