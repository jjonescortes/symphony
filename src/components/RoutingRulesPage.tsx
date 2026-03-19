"use client";

import { useState, useRef, useEffect } from "react";
import type { Rule } from "@/lib/data";
import { initialRules } from "@/lib/data";
import RuleDetailPanel from "./RuleDetailPanel";
import SetDefaultGatewayPanel from "./SetDefaultGatewayPanel";

const CheckCircleIcon = () => (
  <svg className="size-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);

const imgIconSolidAngleRight = "https://www.figma.com/api/mcp/asset/8e40088f-9ad6-4c65-a0ed-61dbd19b8a75";
const imgQuestionCircle = "https://www.figma.com/api/mcp/asset/0c4043f7-7a4f-46be-aeb3-423e6bce6b94";
const imgSortUp = "https://www.figma.com/api/mcp/asset/f65ae129-7670-4785-bcad-c92cdf2e561d";
const imgSort = "https://www.figma.com/api/mcp/asset/ea99a5f5-0786-4414-b97c-ff06740254ce";
const imgExternalLinkAlt = "https://www.figma.com/api/mcp/asset/60a94ae2-260a-462b-a3f0-79b51ecba726";
const imgZendeskIcon = "https://www.figma.com/api/mcp/asset/a6d4289a-8d4a-45b6-ad83-6f860647620f";
const imgFrame = "https://www.figma.com/api/mcp/asset/dfdbf95a-5dc6-4714-ae5e-2354b9c26227";

type Mode = "default" | "editPriority";
type Panel = "none" | "ruleDetail" | "defaultGateway";

export default function RoutingRulesPage({
  rules,
  setRules,
  successMessage,
  onDismissSuccess,
  onCreateRule,
  onEditRule,
}: {
  rules: Rule[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  successMessage: string | null;
  onDismissSuccess: () => void;
  onCreateRule: () => void;
  onEditRule: (rule: Rule) => void;
}) {
  const [mode, setMode] = useState<Mode>("default");
  const [panel, setPanel] = useState<Panel>("none");
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);

  // Scroll to top whenever a success message appears so the banner is visible
  useEffect(() => {
    if (successMessage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [successMessage]);
  const [openOverflowId, setOpenOverflowId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeRules = rules.filter((r) => r.active);
  const inactiveRules = rules.filter((r) => !r.active);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowActionsDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleRowClick(rule: Rule) {
    if (mode === "editPriority") return;
    setSelectedRule(rule);
    setPanel("ruleDetail");
    setOpenOverflowId(null);
  }

  function handleDisableRule(rule: Rule) {
    setRules((prev) =>
      prev.map((r) => (r.id === rule.id ? { ...r, active: false } : r))
    );
    setPanel("none");
    setSelectedRule(null);
  }

  function handleMoveUp(index: number, isActive: boolean) {
    const list = isActive ? [...activeRules] : [...inactiveRules];
    if (index === 0) return;
    [list[index - 1], list[index]] = [list[index], list[index - 1]];
    const other = isActive ? inactiveRules : activeRules;
    setRules(isActive ? [...list, ...other] : [...other, ...list]);
  }

  function handleMoveDown(index: number, isActive: boolean) {
    const list = isActive ? [...activeRules] : [...inactiveRules];
    if (index === list.length - 1) return;
    [list[index], list[index + 1]] = [list[index + 1], list[index]];
    const other = isActive ? inactiveRules : activeRules;
    setRules(isActive ? [...list, ...other] : [...other, ...list]);
  }

  function handleMoveToTop(index: number, isActive: boolean) {
    const list = isActive ? [...activeRules] : [...inactiveRules];
    const [item] = list.splice(index, 1);
    list.unshift(item);
    const other = isActive ? inactiveRules : activeRules;
    setRules(isActive ? [...list, ...other] : [...other, ...list]);
  }

  function handleMoveToBottom(index: number, isActive: boolean) {
    const list = isActive ? [...activeRules] : [...inactiveRules];
    const [item] = list.splice(index, 1);
    list.push(item);
    const other = isActive ? inactiveRules : activeRules;
    setRules(isActive ? [...list, ...other] : [...other, ...list]);
  }

  const hasRightPanel = panel !== "none";

  return (
    <div className="min-h-screen bg-[#f5f5f1] ml-[220px]">
      {/* Page Header */}
      <div className="fixed top-0 left-[220px] right-0 z-10">
        {/* Breadcrumb bar */}
        <div className="bg-white border-b border-[#cdcbc2] flex items-center pl-6 py-2">
          <div className="flex items-center">
            <span className="text-[#3077a3] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] whitespace-nowrap cursor-pointer hover:underline">Home</span>
            <div className="h-5 w-4 flex items-center justify-center">
              <img alt="" className="h-[5px] w-[3px]" src={imgIconSolidAngleRight} />
            </div>
            <span className="text-[#3077a3] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] whitespace-nowrap cursor-pointer hover:underline">Payments Symphony</span>
            <div className="h-5 w-4 flex items-center justify-center">
              <img alt="" className="h-[5px] w-[3px]" src={imgIconSolidAngleRight} />
            </div>
            <span className="text-[#737169] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] whitespace-nowrap">Routing Rules</span>
          </div>
          <div className="flex flex-1 items-center justify-end pr-6">
            <span className="text-[#3077a3] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] cursor-pointer hover:underline">Account Name</span>
            <span className="text-[#737169] text-[13px] leading-[20px] mx-1">•</span>
            <span className="text-[#3077a3] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] cursor-pointer hover:underline">Log Out</span>
          </div>
        </div>

        {/* Title bar */}
        <div className="bg-white border-b border-[#cdcbc2] flex gap-4 h-[82px] items-center px-6 py-[10px]">
          <p className="flex-1 font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[33px] text-[#141411] text-[22px]">
            {mode === "editPriority" ? "Edit Priority Order" : "Routing Rules"}
          </p>

          {mode === "default" && (
            <>
              {/* Search */}
              <button className="bg-white border border-[#b9b6ac] flex gap-[10px] h-10 items-center px-3 rounded-lg shrink-0 w-[207px] cursor-pointer">
                <span className="flex-1 text-[#737169] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] text-left">Search</span>
                <svg className="size-5 text-[#737169]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Rules Actions dropdown */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setShowActionsDropdown((v) => !v)}
                  className="border border-[#141411] flex gap-2 h-10 items-center px-4 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <span className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[20px] text-[#141411] text-[13px] whitespace-nowrap">
                    Rules Actions
                  </span>
                  <svg className="size-4 text-[#141411]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {showActionsDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-[#b9b6ac] rounded-lg shadow-lg z-30 min-w-[220px]">
                    <button
                      onClick={() => { setMode("editPriority"); setShowActionsDropdown(false); setPanel("none"); }}
                      className="w-full text-left px-4 py-2.5 text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] hover:bg-[#f5f5f1] first:rounded-t-lg"
                    >
                      Edit Priority Order
                    </button>
                    <button
                      onClick={() => { setPanel("defaultGateway"); setShowActionsDropdown(false); setSelectedRule(null); }}
                      className="w-full text-left px-4 py-2.5 text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] hover:bg-[#f5f5f1] last:rounded-b-lg"
                    >
                      Set Default Gateway by Payment Method
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={onCreateRule}
                className="bg-[#ffd706] flex h-10 items-center px-4 rounded-lg shrink-0 cursor-pointer hover:bg-[#f5ce00]"
              >
                <span className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[20px] text-[#141411] text-[13px] whitespace-nowrap">
                  Create a new rule
                </span>
              </button>

              {/* Help */}
              <button className="border border-[#a7a59a] flex gap-2 h-10 items-center min-w-[64px] pl-3 pr-4 rounded-lg cursor-pointer hover:bg-gray-50">
                <img alt="" className="size-4" src={imgExternalLinkAlt} />
                <span className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[20px] text-[#737169] text-[13px] whitespace-nowrap">Help</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="pt-[118px] flex">
        <div className={`flex-1 p-6 transition-all ${hasRightPanel || mode === "editPriority" ? "pr-[380px]" : "pr-[356px]"}`}>
          <div className="flex flex-col gap-[22px]">

          {/* Success banner */}
          {successMessage && (
            <div className="bg-[#eaf6ed] border border-[#7bc89b] rounded-lg flex items-center gap-3 px-4 py-3">
              <CheckCircleIcon />
              <span className="flex-1 text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411]">
                {successMessage}
              </span>
              <button onClick={onDismissSuccess} className="text-[#737169] hover:text-[#141411] cursor-pointer shrink-0">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

            {/* Active Rules */}
            <section className="flex flex-col gap-[10px]">
              <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[27px] text-[#141411] text-[18px]">
                Active Rules
              </h2>
              <div className="flex flex-col gap-[10px]">
                <div className="bg-white border border-[#b9b6ac] flex flex-col overflow-clip rounded-lg w-full">
                  {/* Header */}
                  <div className="bg-[#f5f5f1] flex h-10 items-start w-full">
                    {mode === "editPriority" && <div className="w-10" />}
                    <div className="flex items-center min-h-9 pl-3 pr-2 py-1 shrink-0 w-[125px]">
                      <div className="flex items-center gap-1">
                        <span className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[19px] text-[#3077a3] text-[12px] whitespace-nowrap">Priority</span>
                        <img alt="" className="size-[14px]" src={imgQuestionCircle} />
                        {mode === "default" && <img alt="" className="size-4" src={imgSortUp} />}
                      </div>
                    </div>
                    <div className="flex flex-1 items-center min-h-9 pl-3 pr-2 py-1">
                      <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[19px] text-[#54534d] text-[12px]">Rule ID</span>
                    </div>
                    <div className="flex flex-1 items-center min-h-9 pl-3 pr-2 py-1">
                      <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[19px] text-[#54534d] text-[12px]">Rule Name</span>
                    </div>
                    <div className="flex flex-1 items-center min-h-9 pl-3 pr-2 py-1">
                      <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[19px] text-[#54534d] text-[12px]">Created date</span>
                    </div>
                    <div className="flex flex-1 h-9 items-center min-h-9 pl-3 pr-2 py-1" />
                  </div>

                  {/* Rows */}
                  {activeRules.map((rule, index) => (
                    <div
                      key={rule.id}
                      onClick={() => handleRowClick(rule)}
                      className={`bg-white border-t border-[#cdcbc2] flex h-10 items-center w-full ${mode === "default" ? "cursor-pointer hover:bg-[#f9f9f7]" : ""} ${selectedRule?.id === rule.id ? "bg-[#f5f5f1]" : ""}`}
                    >
                      {mode === "editPriority" && (
                        <div className="w-10 flex items-center justify-center text-[#737169] flex-shrink-0">
                          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </div>
                      )}
                      <div className="flex items-center min-h-10 pl-3 pr-2 py-2 shrink-0 w-[125px]">
                        <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[20px] text-[#141411] text-[13px]">{index + 1}</span>
                      </div>
                      <div className="flex flex-1 items-center min-h-10 pl-3 pr-2 py-2">
                        <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[20px] text-[#141411] text-[13px]">{rule.ruleId}</span>
                      </div>
                      <div className="flex flex-1 items-center min-h-10 pl-3 pr-2 py-2">
                        <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[20px] text-[#141411] text-[13px]">{rule.name}</span>
                      </div>
                      <div className="flex flex-1 items-center min-h-10 pl-3 pr-2 py-2">
                        <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[20px] text-[#141411] text-[13px]">{rule.createdDate}</span>
                      </div>
                      <div className="flex flex-1 items-center justify-end min-h-10 pl-3 pr-2 py-2 gap-1">
                        {mode === "editPriority" ? (
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => handleMoveToTop(index, true)} className="p-1 text-[#737169] hover:text-[#141411] cursor-pointer" title="Move to top">
                              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.75 3.75a.75.75 0 01-1.06 1.06L10 4.81 6.78 8.03a.75.75 0 01-1.06-1.06l3.75-3.75A.75.75 0 0110 3zm-3.97 9.03a.75.75 0 011.06 0L10 15.19l2.94-3.22a.75.75 0 111.06 1.06l-3.5 3.75a.75.75 0 01-1.1 0l-3.5-3.75a.75.75 0 010-1.06z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button onClick={() => handleMoveUp(index, true)} disabled={index === 0} className="p-1 text-[#737169] hover:text-[#141411] disabled:opacity-30 cursor-pointer disabled:cursor-default" title="Move up">
                              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button onClick={() => handleMoveDown(index, true)} disabled={index === activeRules.length - 1} className="p-1 text-[#737169] hover:text-[#141411] disabled:opacity-30 cursor-pointer disabled:cursor-default" title="Move down">
                              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button onClick={() => handleMoveToBottom(index, true)} disabled={index === activeRules.length - 1} className="p-1 text-[#737169] hover:text-[#141411] disabled:opacity-30 cursor-pointer disabled:cursor-default" title="Move to bottom">
                              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.5 3.75a.75.75 0 01-1.1 1.02L10 4.81 7.07 7.99A.75.75 0 015.97 6.97l3.5-3.75A.75.75 0 0110 3zM5.23 11.17a.75.75 0 011.06.02L10 15.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setOpenOverflowId(openOverflowId === rule.id ? null : rule.id)}
                              className="text-[#737169] text-[14px] tracking-[2px] font-['Source_Sans_Pro:Regular',sans-serif] cursor-pointer select-none px-2 hover:text-[#141411]"
                            >
                              •••
                            </button>
                            {openOverflowId === rule.id && (
                              <div className="absolute right-0 top-full mt-1 bg-white border border-[#b9b6ac] rounded-lg shadow-lg z-30 min-w-[160px]">
                                <button onClick={() => { onEditRule(rule); setOpenOverflowId(null); }} className="w-full text-left px-4 py-2.5 text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] hover:bg-[#f5f5f1] rounded-t-lg">Edit Rule</button>
                                <button onClick={() => { handleDisableRule(rule); setOpenOverflowId(null); }} className="w-full text-left px-4 py-2.5 text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] hover:bg-[#f5f5f1]">Disable Rule</button>
                                <button onClick={() => setOpenOverflowId(null)} className="w-full text-left px-4 py-2.5 text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-red-600 hover:bg-[#f5f5f1] rounded-b-lg">Delete Rule</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save/Cancel for edit mode */}
                {mode === "editPriority" && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setMode("default")}
                      className="bg-[#ffd706] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[13px] leading-[20px] text-[#141411] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#f5ce00]"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => { setRules(initialRules); setMode("default"); }}
                      className="font-['FT_Polar_Trim:Regular',sans-serif] text-[13px] leading-[20px] text-[#737169] px-2 py-2 cursor-pointer hover:text-[#141411]"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {mode === "default" && (
                  <div className="flex h-5 items-center">
                    <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[19px] text-[#737169] text-[12px] whitespace-nowrap">
                      Displaying all {activeRules.length} items
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Inactive Rules */}
            <section className="flex flex-col gap-[10px]">
              <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[27px] text-[#141411] text-[18px]">
                Inactive Rules
              </h2>
              <div className="flex flex-col gap-[10px]">
                <div className="bg-white border border-[#b9b6ac] flex flex-col overflow-clip rounded-lg w-full">
                  {/* Header */}
                  <div className="bg-[#f5f5f1] flex h-10 items-start w-full">
                    {mode === "editPriority" && <div className="w-10" />}
                    <div className="flex flex-1 items-center min-h-9 pl-3 pr-2 py-1">
                      <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[19px] text-[#54534d] text-[12px]">Rule ID</span>
                    </div>
                    <div className="flex flex-1 items-center min-h-9 pl-3 pr-2 py-1">
                      <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[19px] text-[#54534d] text-[12px]">Rule Name</span>
                    </div>
                    <div className="flex flex-1 items-center min-h-9 pl-3 pr-2 py-1 gap-1">
                      <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[19px] text-[#54534d] text-[12px] whitespace-nowrap">Created date</span>
                      <img alt="" className="size-4" src={imgSort} />
                    </div>
                    <div className="flex flex-1 h-9 items-center min-h-9 pl-3 pr-2 py-1" />
                  </div>

                  {/* Rows */}
                  {inactiveRules.map((rule, index) => (
                    <div
                      key={rule.id}
                      onClick={() => handleRowClick(rule)}
                      className={`bg-white border-t border-[#cdcbc2] flex h-10 items-center w-full ${mode === "default" ? "cursor-pointer hover:bg-[#f9f9f7]" : ""} ${selectedRule?.id === rule.id ? "bg-[#f5f5f1]" : ""}`}
                    >
                      {mode === "editPriority" && (
                        <div className="w-10 flex items-center justify-center text-[#737169] flex-shrink-0">
                          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </div>
                      )}
                      <div className="flex flex-1 items-center min-h-10 pl-3 pr-2 py-2">
                        <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[20px] text-[#141411] text-[13px]">{rule.ruleId}</span>
                      </div>
                      <div className="flex flex-1 items-center min-h-10 pl-3 pr-2 py-2">
                        <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[20px] text-[#141411] text-[13px]">{rule.name}</span>
                      </div>
                      <div className="flex flex-1 items-center min-h-10 pl-3 pr-2 py-2">
                        <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[20px] text-[#141411] text-[13px]">{rule.createdDate}</span>
                      </div>
                      <div className="flex flex-1 items-center justify-end min-h-10 pl-3 pr-2 py-2 gap-1">
                        {mode === "editPriority" ? (
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => handleMoveUp(index, false)} disabled={index === 0} className="p-1 text-[#737169] hover:text-[#141411] disabled:opacity-30 cursor-pointer disabled:cursor-default">
                              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button onClick={() => handleMoveDown(index, false)} disabled={index === inactiveRules.length - 1} className="p-1 text-[#737169] hover:text-[#141411] disabled:opacity-30 cursor-pointer disabled:cursor-default">
                              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setOpenOverflowId(openOverflowId === rule.id ? null : rule.id)}
                              className="text-[#737169] text-[14px] tracking-[2px] font-['Source_Sans_Pro:Regular',sans-serif] cursor-pointer select-none px-2 hover:text-[#141411]"
                            >
                              •••
                            </button>
                            {openOverflowId === rule.id && (
                              <div className="absolute right-0 top-full mt-1 bg-white border border-[#b9b6ac] rounded-lg shadow-lg z-30 min-w-[160px]">
                                <button onClick={() => { onEditRule(rule); setOpenOverflowId(null); }} className="w-full text-left px-4 py-2.5 text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] hover:bg-[#f5f5f1] rounded-t-lg">Edit Rule</button>
                                <button
                                  onClick={() => { setRules(prev => prev.map(r => r.id === rule.id ? { ...r, active: true } : r)); setOpenOverflowId(null); }}
                                  className="w-full text-left px-4 py-2.5 text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] hover:bg-[#f5f5f1]"
                                >
                                  Activate Rule
                                </button>
                                <button onClick={() => setOpenOverflowId(null)} className="w-full text-left px-4 py-2.5 text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-red-600 hover:bg-[#f5f5f1] rounded-b-lg">Delete Rule</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {mode === "default" && (
                  <div className="flex h-5 items-center">
                    <span className="font-['FT_Polar_Trim:Regular',sans-serif] leading-[19px] text-[#737169] text-[12px] whitespace-nowrap">
                      Displaying all {inactiveRules.length} items
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Right sidebar: info cards (default mode, no panel) */}
        {mode === "default" && panel === "none" && (
          <div className="fixed right-6 top-[147px] w-[280px] flex flex-col gap-6">
            <div className="bg-[#f5f5f1] border border-[#cdcbc2] flex flex-col overflow-clip rounded-lg shadow-[0px_1px_0px_0px_#e8e8e9]">
              <div className="flex items-start min-h-[48px] px-4 py-3">
                <p className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[22px] text-[#141411] text-[14px] w-full">Set Up Priority Rules</p>
              </div>
              <div className="border-l border-t border-[#cdcbc2] p-4">
                <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] mb-3">
                  Payment conditions are evaluated sequentially in the order they appear in the list, with the first matching condition determining the action taken. To change priority, use the overflow menu (⋮) next to any Rule to move it up or down.
                </p>
                <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif]">
                  Proper ordering is critical—conditions at the top take precedence over those below them, directly affecting how your payments are processed.
                </p>
              </div>
            </div>
            <div className="bg-[#f5f5f1] border border-[#cdcbc2] flex flex-col overflow-clip rounded-lg shadow-[0px_1px_0px_0px_#e8e8e9]">
              <div className="flex items-start min-h-[48px] px-4 py-3">
                <p className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[22px] text-[#141411] text-[14px] w-full">Activate Rules</p>
              </div>
              <div className="border-l border-t border-[#cdcbc2] p-4">
                <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif]">
                  Click Activate rules to apply your routing configuration. Rules appear in either the Active or Inactive list. Only Active rules affect payment routing—moving rules between lists is seamless. When no rules are Active, payments follow{" "}
                  <span className="underline decoration-solid">Default routing rules.</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Right sidebar: edit priority info */}
        {mode === "editPriority" && (
          <div className="fixed right-6 top-[147px] w-[280px] flex flex-col gap-6">
            <div className="bg-[#f5f5f1] border border-[#cdcbc2] flex flex-col overflow-clip rounded-lg shadow-[0px_1px_0px_0px_#e8e8e9]">
              <div className="flex items-start min-h-[48px] px-4 py-3">
                <p className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold leading-[22px] text-[#141411] text-[14px] w-full">Priority</p>
              </div>
              <div className="border-l border-t border-[#cdcbc2] p-4">
                <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif]">
                  Payment conditions are evaluated sequentially in the order they appear in the list, with the first matching condition determining the action taken. To change priority, use the overflow menu (⋮) next to any Rule to move it up or down.
                </p>
                <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] mt-3">
                  Proper ordering is critical—conditions at the top take precedence over those below them, directly affecting how your payments are processed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rule Detail Panel */}
      {panel === "ruleDetail" && selectedRule && (
        <RuleDetailPanel
          rule={selectedRule}
          onClose={() => { setPanel("none"); setSelectedRule(null); }}
          onEdit={() => { onEditRule(selectedRule); setPanel("none"); setSelectedRule(null); }}
          onDisable={() => handleDisableRule(selectedRule)}
        />
      )}

      {/* Set Default Gateway Panel */}
      {panel === "defaultGateway" && (
        <SetDefaultGatewayPanel
          onClose={() => setPanel("none")}
          onSave={() => setPanel("none")}
        />
      )}

      {/* Zendesk chat button */}
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
