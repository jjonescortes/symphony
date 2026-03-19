"use client";

import { useState } from "react";
import type { Rule } from "@/lib/data";

const imgIconSolidAngleRight = "https://www.figma.com/api/mcp/asset/8e40088f-9ad6-4c65-a0ed-61dbd19b8a75";
const imgExternalLinkAlt = "https://www.figma.com/api/mcp/asset/60a94ae2-260a-462b-a3f0-79b51ecba726";
const imgZendeskIcon = "https://www.figma.com/api/mcp/asset/a6d4289a-8d4a-45b6-ad83-6f860647620f";
const imgFrame = "https://www.figma.com/api/mcp/asset/dfdbf95a-5dc6-4714-ae5e-2354b9c26227";

type Props = {
  editRule?: Rule | null;
  totalRules: number;
  onCancel: () => void;
  onCreate: () => void;
};

export default function CreateRulePage({ editRule, totalRules, onCancel, onCreate }: Props) {
  const isEdit = !!editRule;
  const [ruleName, setRuleName] = useState(editRule?.name ?? "");
  const [ruleDescription, setRuleDescription] = useState(editRule?.description ?? "");
  const [paymentType, setPaymentType] = useState("Any type of payment");
  const [conditionType, setConditionType] = useState("Any type of payment");
  const [routingType, setRoutingType] = useState("Default routing");
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#f5f5f1] ml-[220px]">
      {/* Header */}
      <div className="fixed top-0 left-[220px] right-0 z-10">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#cdcbc2] flex items-center pl-6 py-2">
          <div className="flex items-center">
            <span
              onClick={onCancel}
              className="text-[#3077a3] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] whitespace-nowrap cursor-pointer hover:underline"
            >
              Payments Orchestration
            </span>
            <div className="h-5 w-4 flex items-center justify-center">
              <img alt="" className="h-[5px] w-[3px]" src={imgIconSolidAngleRight} />
            </div>
            <span className="text-[#737169] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] whitespace-nowrap">
              {isEdit ? `Edit: ${editRule.name}` : "New Gateway Routing Rule"}
            </span>
          </div>
          <div className="flex flex-1 items-center justify-end pr-6">
            <span className="text-[#3077a3] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] cursor-pointer hover:underline">Account Name</span>
            <span className="text-[#737169] text-[13px] leading-[20px] mx-1">•</span>
            <span className="text-[#3077a3] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] cursor-pointer hover:underline">Log Out</span>
          </div>
        </div>

        {/* Title bar */}
        <div className="bg-white border-b border-[#cdcbc2] flex gap-4 h-[82px] items-center px-6">
          <p className="flex-1 font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[33px] text-[#141411] text-[22px]">
            {isEdit ? `Edit: ${editRule.name}` : "New Gateway Routing Rule"}
          </p>
          <div className="flex items-center gap-2">
            <div className={`size-2 rounded-full ${enabled ? "bg-green-500" : "bg-[#cdcbc2]"}`} />
            <span className="font-['FT_Polar_Trim:Regular',sans-serif] text-[13px] leading-[20px] text-[#141411]">
              {enabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className="border border-[#b9b6ac] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[13px] leading-[20px] text-[#141411] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#f5f5f1]"
          >
            {enabled ? "Disable" : "Enable"}
          </button>
          <button className="border border-[#a7a59a] flex gap-2 h-10 items-center pl-3 pr-4 rounded-lg cursor-pointer hover:bg-gray-50">
            <img alt="" className="size-4" src={imgExternalLinkAlt} />
            <span className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[20px] text-[#737169] text-[13px] whitespace-nowrap">Help</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-[118px] flex">
        <div className="flex-1 p-6 pr-[316px] max-w-[900px]">
          <div className="flex flex-col gap-4">

            {/* Name Your Rule */}
            <div className="bg-white border border-[#b9b6ac] rounded-lg p-6">
              <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[16px] leading-[24px] text-[#141411] mb-1">Name Your Rule</h2>
              <p className="text-[#737169] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] mb-4">
                Pick a short, clear name so you can easily find this rule later. Choose a concise, descriptive rule name that&apos;s easy to remember and search for.
              </p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[#737169] text-[11px] leading-[16px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold tracking-wide uppercase mb-1">
                    RULE NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    className="w-full border border-[#b9b6ac] rounded-lg bg-white text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 focus:outline-none focus:border-[#3077a3]"
                  />
                </div>
                <div>
                  <label className="block text-[#737169] text-[11px] leading-[16px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold tracking-wide uppercase mb-1">
                    RULE DESCRIPTION
                  </label>
                  <textarea
                    value={ruleDescription}
                    onChange={(e) => setRuleDescription(e.target.value)}
                    rows={4}
                    className="w-full border border-[#b9b6ac] rounded-lg bg-white text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 focus:outline-none focus:border-[#3077a3] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Type */}
            <div className="bg-white border border-[#b9b6ac] rounded-lg p-6">
              <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[16px] leading-[24px] text-[#141411] mb-1">Payment Type</h2>
              <p className="text-[#737169] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] mb-4">
                Specify the Payment Type that will cause this routing rule to be evaluated. A rule is only considered if its trigger conditions are met.
              </p>
              <div>
                <label className="block text-[#737169] text-[11px] leading-[16px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold tracking-wide uppercase mb-1">
                  PAYMENT TYPE
                </label>
                <div className="relative">
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="w-full border border-[#b9b6ac] rounded-lg bg-[#f5f5f1] text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 appearance-none cursor-pointer focus:outline-none focus:border-[#3077a3]"
                  >
                    <option>Any type of payment</option>
                    <option>Credit Card</option>
                    <option>ACH</option>
                    <option>SEPA</option>
                    <option>Apple Pay</option>
                    <option>Google Pay</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="size-4 text-[#737169]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="bg-white border border-[#b9b6ac] rounded-lg p-6">
              <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[16px] leading-[24px] text-[#141411] mb-1">Conditions</h2>
              <p className="text-[#737169] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] mb-4">
                Specify the conditions that must be met for this rule to be applied. If all conditions are true, the payment will be routed according to this rule.&quot; Or, if using OR logic between groups, specify that clearly.
              </p>
              <div>
                <label className="block text-[#737169] text-[11px] leading-[16px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold tracking-wide uppercase mb-1">
                  CONDITION TYPE
                </label>
                <div className="relative">
                  <select
                    value={conditionType}
                    onChange={(e) => setConditionType(e.target.value)}
                    className="w-full border border-[#b9b6ac] rounded-lg bg-[#f5f5f1] text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 appearance-none cursor-pointer focus:outline-none focus:border-[#3077a3]"
                  >
                    <option>Any type of payment</option>
                    <option>Amount greater than</option>
                    <option>Country is</option>
                    <option>Currency is</option>
                    <option>Payment attempt number</option>
                    <option>Subscription status</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="size-4 text-[#737169]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Select Payment Gateway */}
            <div className="bg-white border border-[#b9b6ac] rounded-lg p-6">
              <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[16px] leading-[24px] text-[#141411] mb-1">Select Payment Gateway</h2>
              <p className="text-[#737169] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] mb-4">
                Choose the payment gateway to use if the routing conditions are met. You can also set the priority of this rule and whether to stop processing other rules.
              </p>
              <div>
                <label className="block text-[#737169] text-[11px] leading-[16px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold tracking-wide uppercase mb-1">
                  HOW SHOULD PAYMENTS BE ROUTED? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={routingType}
                    onChange={(e) => setRoutingType(e.target.value)}
                    className="w-full border border-[#b9b6ac] rounded-lg bg-[#f5f5f1] text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 appearance-none cursor-pointer focus:outline-none focus:border-[#3077a3]"
                  >
                    <option>Default routing</option>
                    <option>Route through specific gateway</option>
                    <option>Route with fallback</option>
                    <option>Round-robin</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="size-4 text-[#737169]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Rule Priority */}
            <div className="bg-white border border-[#b9b6ac] rounded-lg p-6">
              <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[16px] leading-[24px] text-[#141411] mb-4">Rule priority</h2>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={totalRules + 1}
                  className="w-16 border border-[#b9b6ac] rounded-lg bg-white text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 focus:outline-none focus:border-[#3077a3] text-center"
                />
                <span className="text-[#737169] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif]">
                  of {totalRules} rules
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pb-8">
              <button
                onClick={onCreate}
                className="bg-[#ffd706] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[13px] leading-[20px] text-[#141411] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#f5ce00]"
              >
                {isEdit ? "Save Changes" : "Create Rule"}
              </button>
              <button
                onClick={onCancel}
                className="font-['FT_Polar_Trim:Regular',sans-serif] text-[13px] leading-[20px] text-[#737169] px-2 py-2 cursor-pointer hover:text-[#141411]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Rule Summary sidebar */}
        <div className="fixed right-6 top-[147px] w-[280px]">
          <div className="bg-[#f5f5f1] border border-[#cdcbc2] flex flex-col overflow-clip rounded-lg shadow-[0px_1px_0px_0px_#e8e8e9]">
            <div className="flex items-start min-h-[48px] px-4 py-3 border-b border-[#cdcbc2]">
              <p className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[22px] text-[#141411] text-[14px] w-full">Rule Summary</p>
            </div>
            <div className="divide-y divide-[#cdcbc2]">
              {[
                { label: "RULE NAME", value: ruleName || undefined },
                { label: "DESCRIPTION", value: ruleDescription || undefined },
                { label: "WHEN PAYMENT IS", value: conditionType !== "Any type of payment" ? conditionType : undefined },
                { label: "ROUTE TO", value: routingType !== "Default routing" ? routingType : undefined },
                { label: "RULE STATUS", value: enabled ? "Enabled" : "Disabled" },
                { label: "RULE PRIORITY", value: `1 of ${totalRules} rules` },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3">
                  <p className="text-[#737169] text-[11px] leading-[16px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold tracking-wide uppercase mb-1">{label}</p>
                  {value && <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif]">{value}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zendesk */}
      <button className="fixed bottom-4 right-4 bg-[#ffd706] overflow-clip rounded-[12px] size-16 block cursor-pointer hover:bg-[#f5ce00] z-10">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-[calc(50%+0.5px)] top-[calc(50%+55.5px)] w-[21px]">
          <img alt="" className="absolute block max-w-none size-full" src={imgFrame} />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.2px)] size-[38.4px] top-[calc(50%+0.2px)]">
          <img alt="" className="absolute block max-w-none size-full" src={imgZendeskIcon} />
        </div>
      </button>
    </div>
  );
}
