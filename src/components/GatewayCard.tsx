"use client";

import { useState, useRef, useEffect } from "react";
import SelectIcon from "./SelectIcon";

type RoutingType =
  | ""
  | "override"
  | "retry"
  | "failover"
  | "waterfall"
  | "waterfall_fallback"
  | "block"
  | "retry_orchestration";

const ROUTING_OPTIONS: { value: RoutingType; label: string }[] = [
  { value: "override", label: "Select processor (override default)" },
  { value: "retry", label: "Retry with same processor" },
  { value: "failover", label: "Failover to another processor" },
  { value: "waterfall", label: "Waterfall failover" },
  { value: "waterfall_fallback", label: "Waterfall failover (with fallback)" },
  { value: "block", label: "Block transaction" },
  { value: "retry_orchestration", label: "Retry orchestration" },
];

const GATEWAYS = [
  { id: "stripe", name: "Stripe", label: "intended for MID", avgCost: "$1.20", approvalRate: "90%" },
  { id: "paypal", name: "PayPal", label: "intended for MID", avgCost: "$1.03", approvalRate: "94%" },
  { id: "checkcommerce", name: "CheckCommerce", label: "intended for MID", avgCost: "$1.30", approvalRate: "70%" },
  { id: "bambora", name: "Bambora", label: "intended for MID", avgCost: "$1.43", approvalRate: "80%" },
];

const ORCHESTRATION_TYPES = ["Cascading", "Step-Up", "Clear PAN", "Network Token", "Dynamic Currency"];

type Gateway = typeof GATEWAYS[number];

function ChevronDown() {
  return (
    <svg className="size-4 text-[#737169] shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

function GatewaySearch({
  placeholder,
  selected,
  onSelect,
}: {
  placeholder: string;
  selected: Gateway | null;
  onSelect: (g: Gateway | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = GATEWAYS.filter(
    (g) =>
      g.name.toLowerCase().includes(query.toLowerCase()) ||
      g.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={ref}>
      <div
        onClick={() => setOpen((v) => !v)}
        className="bg-white border border-[#b9b6ac] rounded-lg flex items-center gap-2 h-10 px-3 py-2 cursor-pointer w-full"
      >
        <svg className="size-5 text-[#737169] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className={`flex-1 text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] truncate ${selected ? "text-[#141411]" : "text-[#737169]"}`}>
          {selected ? `${selected.name} (${selected.label})` : placeholder}
        </span>
        <ChevronDown />
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#b9b6ac] rounded-lg shadow-lg z-30 overflow-hidden">
          <div className="p-2 border-b border-[#cdcbc2]">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] px-2 py-1 focus:outline-none"
            />
          </div>
          {filtered.map((g) => (
            <button
              key={g.id}
              onClick={() => { onSelect(g); setOpen(false); setQuery(""); }}
              className="w-full text-left px-3 py-2.5 hover:bg-[#f5f5f1] cursor-pointer"
            >
              <div className="text-[13px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[#141411]">
                {g.name} <span className="font-normal text-[#737169]">({g.label})</span>
              </div>
              <div className="text-[12px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#737169]">
                Avg cost: {g.avgCost} | Approval Rate: {g.approvalRate}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-3 py-4 text-[13px] text-[#737169] font-['FT_Polar_Trim:Regular',sans-serif]">No gateways found</div>
          )}
        </div>
      )}
    </div>
  );
}

function OrchestrationSearch({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <div
        onClick={() => setOpen((v) => !v)}
        className="bg-white border border-[#b9b6ac] rounded-lg flex items-center gap-2 h-10 px-3 py-2 cursor-pointer w-full"
      >
        <svg className="size-5 text-[#737169] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className={`flex-1 text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] truncate ${selected ? "text-[#141411]" : "text-[#737169]"}`}>
          {selected || "Cascading, Step-Up, Clear PAN, Network..."}
        </span>
        <ChevronDown />
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#b9b6ac] rounded-lg shadow-lg z-30 overflow-hidden">
          {ORCHESTRATION_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => { onSelect(t); setOpen(false); }}
              className="w-full text-left px-3 py-2.5 hover:bg-[#f5f5f1] cursor-pointer text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411]"
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoBanner({ gateway }: { gateway: Gateway | null }) {
  if (!gateway) return null;
  return (
    <div className="bg-[#e0edf9] border border-[#a6d0f0] rounded-lg flex gap-2 items-start p-3 w-full">
      <svg className="size-5 text-[#3077a3] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
      <p className="text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411]">
        Avg cost per transaction: {gateway.avgCost} | Approval Rate: {gateway.approvalRate}
      </p>
    </div>
  );
}

const needsGateway: RoutingType[] = ["override", "retry", "failover", "waterfall", "waterfall_fallback", "retry_orchestration"];

export default function GatewayCard() {
  const [routingType, setRoutingType] = useState<RoutingType>("");
  const [primaryGateway, setPrimaryGateway] = useState<Gateway | null>(null);
  const [fallbackGateway, setFallbackGateway] = useState<Gateway | null>(null);
  const [orchestrationType, setOrchestrationType] = useState("");

  const showGateway = needsGateway.includes(routingType);
  const showFallback = routingType === "waterfall_fallback";
  const showOrchestration = routingType === "retry_orchestration";
  const showInfo = showGateway && primaryGateway !== null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main card */}
      <div className="bg-white border border-[#b9b6ac] rounded-lg shadow-[0px_1px_0px_0px_#e8e8e9]">
        {/* Card Header */}
        <div className="px-4 py-3">
          <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[14px] leading-[22px] text-[#141411]">
            Select Payment Gateway
          </h2>
          <p className="text-[#737169] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif]">
            Choose the payment gateway to use if the routing conditions are met. You can also set the priority of this rule and whether to stop processing other rules.
          </p>
        </div>

        {/* Row — no border-r between columns, per Figma */}
        <div className="border-t border-[#cdcbc2] flex items-stretch">

          {/* Col 1: Routing type selector */}
          <div className="flex-1 p-4 flex flex-col gap-2">
            <label className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif]">
              HOW SHOULD PAYMENTS BE ROUTED? <span className="text-[#cd3d1b]">*</span>
            </label>
            <div className="relative">
              <select
                value={routingType}
                onChange={(e) => {
                  setRoutingType(e.target.value as RoutingType);
                  setPrimaryGateway(null);
                  setFallbackGateway(null);
                  setOrchestrationType("");
                }}
                className="w-full border border-[#b9b6ac] rounded-lg bg-[#edebe4] text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 appearance-none cursor-pointer focus:outline-none focus:border-[#3077a3] h-10"
              >
                <option value="">Select type of routing...</option>
                {ROUTING_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <SelectIcon />
              </div>
            </div>
          </div>

          {/* Col 2: Orchestration search (retry_orchestration) OR gateway search (others) OR empty (block/default) */}
          <div className="flex-1 p-4 flex flex-col justify-end">
            {showOrchestration ? (
              <OrchestrationSearch
                selected={orchestrationType}
                onSelect={setOrchestrationType}
              />
            ) : showGateway ? (
              <GatewaySearch
                placeholder="Search payment gateway"
                selected={primaryGateway}
                onSelect={setPrimaryGateway}
              />
            ) : null}
          </div>

          {/* Col 3: Gateway search — only for retry_orchestration */}
          {showOrchestration && (
            <div className="flex-1 p-4 flex flex-col justify-end">
              <GatewaySearch
                placeholder="Select gateway..."
                selected={primaryGateway}
                onSelect={setPrimaryGateway}
              />
            </div>
          )}
        </div>

        {/* Info banner */}
        {showInfo && (
          <div className="px-4 pb-4">
            <InfoBanner gateway={primaryGateway} />
          </div>
        )}
      </div>

      {/* "If fails try with" — separate card below, only for waterfall_fallback */}
      {showFallback && (
        <div className="bg-white border border-[#b9b6ac] rounded-lg shadow-[0px_1px_0px_0px_#e8e8e9]">
          <div className="px-4 py-3">
            <h3 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[14px] leading-[22px] text-[#141411]">
              If fails try with
            </h3>
          </div>
          <div className="border-t border-[#cdcbc2] flex items-stretch">
            <div className="flex-1 p-4">
              <GatewaySearch
                placeholder="Search payment gateway"
                selected={fallbackGateway}
                onSelect={setFallbackGateway}
              />
            </div>
            <div className="flex-1 p-4" />
          </div>
        </div>
      )}
    </div>
  );
}
