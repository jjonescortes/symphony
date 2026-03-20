"use client";

import { useState } from "react";
import SelectIcon from "./SelectIcon";

const MAXIMUM_ATTEMPTS_OPTIONS = ["1 Attempt", "2 Attempts", "3 Attempts", "4 Attempts", "5 Attempts"];
const BUFFERING_TIME_OPTIONS = ["100 ms", "150 ms", "200 ms", "300 ms", "500 ms", "750 ms", "1000 ms"];

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-[14px] flex items-center">
        <span className="text-[#737169] text-[11px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold tracking-wide uppercase">
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex gap-1 items-start cursor-pointer">
            <div className="relative size-6 flex-shrink-0">
              <input
                type="radio"
                className="absolute opacity-0 size-6 cursor-pointer"
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
              />
              <div className={`size-5 rounded-full border-2 flex items-center justify-center m-0.5 transition-colors ${
                value === opt.value ? "border-[#3077a3] bg-white" : "border-[#b9b6ac] bg-white"
              }`}>
                {value === opt.value && (
                  <div className="size-2.5 rounded-full bg-[#3077a3]" />
                )}
              </div>
            </div>
            <div className="flex flex-1 items-center py-0.5">
              <span className="flex-1 text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411]">
                {opt.label}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="h-[14px] flex items-center gap-1">
        <span className="text-[#737169] text-[11px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold tracking-wide uppercase">
          {label}
        </span>
        {required && <span className="text-[#cd3d1b] text-[11px] font-bold">*</span>}
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 bg-[#edebe4] border border-[#b9b6ac] rounded-lg text-[13px] text-[#141411] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 appearance-none cursor-pointer focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <SelectIcon />
        </div>
      </div>
    </div>
  );
}

export default function RetrySettingsPage() {
  const [sameGatewayRetry, setSameGatewayRetry] = useState("enabled");
  const [maxAttempts, setMaxAttempts] = useState("3 Attempts");
  const [bufferingTime, setBufferingTime] = useState("200 ms");
  const [tokenFallbackRetry, setTokenFallbackRetry] = useState("enabled");
  const [stripToken, setStripToken] = useState("both");
  const [gatewayFailover, setGatewayFailover] = useState("disabled");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="ml-[220px] min-h-screen bg-[#f5f5f1]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#cdcbc2]">
        <div className="px-6 py-2 flex items-center min-h-[36px]">
          <div className="flex items-center text-[12px] font-['FT_Polar_Trim:Regular',sans-serif]">
            <span className="text-[#3077a3] cursor-pointer">Home</span>
            <svg className="size-4 mx-0.5 text-[#737169]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <span className="text-[#3077a3] cursor-pointer">Payments Symphony</span>
            <svg className="size-4 mx-0.5 text-[#737169]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <span className="text-[#737169]">Retry Settings</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1 text-[12px] font-['FT_Polar_Trim:Regular',sans-serif]">
            <span className="text-[#3077a3]">Account Name</span>
            <span className="text-[#737169] text-[13px] mx-1">•</span>
            <span className="text-[#3077a3]">Log Out</span>
          </div>
        </div>
        <div className="px-6 py-[10px] flex items-center gap-4 h-[82px]">
          <h1 className="flex-1 text-[22px] leading-[33px] font-['FT_Polar_Trim:Semibold',sans-serif] text-[#141411]">
            Retry Settings
          </h1>
          <button className="border border-[#a7a59a] rounded-lg flex items-center gap-2 h-10 px-3">
            <svg className="size-4 text-[#737169]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="text-[13px] text-[#737169] font-['FT_Polar_Trim:Semibold',sans-serif]">Help</span>
          </button>
        </div>
      </div>

      {/* Save success banner */}
      {saved && (
        <div className="mx-6 mt-4 bg-[#e6f4ea] border border-[#81c784] rounded-lg flex items-center gap-3 px-4 py-3">
          <svg className="size-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          <span className="text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411]">Retry settings saved successfully.</span>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col gap-6 max-w-[880px]">

        {/* Same-Gateway Retry Card */}
        <div className="bg-white border border-[#cdcbc2] rounded-lg shadow-[0px_1px_0px_0px_#e8e8e9] overflow-hidden">
          <div className="px-4 py-3">
            <h2 className="text-[14px] leading-[22px] font-['FT_Polar_Trim:Semibold',sans-serif] text-[#141411]">
              Same-Gateway Retry
            </h2>
            <p className="text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#737169]">
              Automatically re-attempts failed transactions on the same gateway to recover from transient timeouts and connection errors.
            </p>
          </div>
          <div className="border-t border-[#cdcbc2] flex items-stretch">
            <div className="flex-1 p-4">
              <RadioGroup
                label="Same Gateway Retry"
                options={[
                  { value: "enabled", label: "Enabled" },
                  { value: "disabled", label: "Disabled (Default)" },
                ]}
                value={sameGatewayRetry}
                onChange={setSameGatewayRetry}
              />
            </div>
          </div>
          <div className="border-t border-[#cdcbc2] flex items-stretch">
            <div className="flex-1 p-4">
              <SelectField
                label="Maximum Attempts"
                required
                options={MAXIMUM_ATTEMPTS_OPTIONS}
                value={maxAttempts}
                onChange={setMaxAttempts}
              />
            </div>
            <div className="flex-1 p-4">
              <SelectField
                label="Buffering Time"
                required
                options={BUFFERING_TIME_OPTIONS}
                value={bufferingTime}
                onChange={setBufferingTime}
              />
            </div>
          </div>
        </div>

        {/* Token Fallback Retry Card */}
        <div className="bg-white border border-[#cdcbc2] rounded-lg shadow-[0px_1px_0px_0px_#e8e8e9] overflow-hidden">
          <div className="px-4 py-3">
            <h2 className="text-[14px] leading-[22px] font-['FT_Polar_Trim:Semibold',sans-serif] text-[#141411]">
              Token Fallback Retry
            </h2>
            <p className="text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#737169]">
              Re-attempts using raw card data when a payment token is expired, invalid, or rejected due to a protocol error.
            </p>
          </div>
          <div className="border-t border-[#cdcbc2] flex items-stretch">
            <div className="flex-1 p-4">
              <RadioGroup
                label="Token Fallback Retry"
                options={[
                  { value: "enabled", label: "Enabled" },
                  { value: "disabled", label: "Disabled (Default)" },
                ]}
                value={tokenFallbackRetry}
                onChange={setTokenFallbackRetry}
              />
            </div>
          </div>
          <div className="border-t border-[#cdcbc2] flex items-stretch">
            <div className="flex-1 p-4">
              <RadioGroup
                label="Strip Token"
                options={[
                  { value: "gateway", label: "Gateway" },
                  { value: "network", label: "Network" },
                  { value: "both", label: "Both" },
                ]}
                value={stripToken}
                onChange={setStripToken}
              />
            </div>
          </div>
        </div>

        {/* Gateway Failover Card */}
        <div className="bg-white border border-[#cdcbc2] rounded-lg shadow-[0px_1px_0px_0px_#e8e8e9] overflow-hidden">
          <div className="px-4 py-3">
            <h2 className="text-[14px] leading-[22px] font-['FT_Polar_Trim:Semibold',sans-serif] text-[#141411]">
              Gateway Failover
            </h2>
            <p className="text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#737169]">
              Routes the transaction to an alternate gateway when the primary gateway hard-declines or becomes unreachable.
            </p>
          </div>
          <div className="border-t border-[#cdcbc2] flex items-stretch">
            <div className="flex-1 p-4">
              <RadioGroup
                label="Gateway Failover"
                options={[
                  { value: "enabled", label: "Enabled" },
                  { value: "disabled", label: "Disabled (Default)" },
                ]}
                value={gatewayFailover}
                onChange={setGatewayFailover}
              />
            </div>
          </div>
        </div>

        {/* Save Changes */}
        <div>
          <button
            onClick={handleSave}
            className="bg-[#ffd706] text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Semibold',sans-serif] px-4 h-10 rounded-lg min-w-[80px] cursor-pointer hover:brightness-95 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
