"use client";

import { useState } from "react";
import SelectIcon from "./SelectIcon";

type ConditionType =
  | ""
  | "amount"
  | "bin"
  | "country"
  | "currency"
  | "customer_id"
  | "gateway_status"
  | "fraud"
  | "item"
  | "time"
  | "transaction_status"
  | "payment_source"
  | "volume";

type Condition = {
  id: number;
  type: ConditionType;
  criteria: string;
  attribute: string;
  value: string;
  currency: string;
  amount: string;
  startValue: string;
  endValue: string;
  quantity: string;
};

const CONDITION_TYPES: { value: ConditionType; label: string }[] = [
  { value: "amount", label: "Amount of payment" },
  { value: "bin", label: "BIN" },
  { value: "country", label: "Card issuing country" },
  { value: "currency", label: "Currency" },
  { value: "customer_id", label: "Customer ID" },
  { value: "gateway_status", label: "Gateway status" },
  { value: "fraud", label: "Fraud score" },
  { value: "item", label: "Item" },
  { value: "payment_source", label: "Payment source" },
  { value: "time", label: "Time" },
  { value: "transaction_status", label: "Transaction status" },
  { value: "volume", label: "Volume" },
];

const AMOUNT_CRITERIA = ["Greater than", "Less than", "Equal to", "Between", "Any"];
const MATCH_CRITERIA = ["Matches", "Does not match"];
const TIME_CRITERIA = ["After", "Before", "Between", "On"];
const TIME_ATTRIBUTES = ["Date", "Day of week", "Time of day"];
const TRANSACTION_STATUS_ATTRIBUTES = ["Approved", "Declined", "Pending", "Voided", "Chargeback"];
const PAYMENT_SOURCE_ATTRIBUTES = ["Recurly.js", "API", "Hosted Payment Pages", "Mobile SDK"];
const GATEWAY_STATUS_VALUES = ["Default", "Active", "Inactive", "Pending"];
const VOLUME_CRITERIA = ["Amount", "Count"];
const VOLUME_ATTRIBUTES = ["Is", "Greater than", "Less than", "Between"];
const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "MXN"];

function newCondition(id: number): Condition {
  return {
    id,
    type: "",
    criteria: "",
    attribute: "",
    value: "",
    currency: "USD",
    amount: "",
    startValue: "",
    endValue: "",
    quantity: "",
  };
}

// Reusable styled select
function StyledSelect({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <label className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif]">
        {label} {required && <span className="text-[#cd3d1b]">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[#b9b6ac] rounded-lg bg-[#edebe4] text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 h-10 appearance-none cursor-pointer focus:outline-none focus:border-[#3077a3]"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <SelectIcon />
        </div>
      </div>
    </div>
  );
}

// Search combobox field
function SearchField({ label, required, placeholder }: { label: string; required?: boolean; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <label className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif]">
        {label} {required && <span className="text-[#cd3d1b]">*</span>}
      </label>
      <div className="flex items-center border border-[#b9b6ac] rounded-lg bg-white h-10 px-3 py-2 gap-2">
        <svg className="size-4 text-[#737169] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] placeholder-[#737169] focus:outline-none"
        />
        <SelectIcon className="size-5 shrink-0" />
      </div>
    </div>
  );
}

function ConditionRow({
  condition,
  index,
  total,
  onChange,
  onRemove,
}: {
  condition: Condition;
  index: number;
  total: number;
  onChange: (id: number, field: keyof Condition, value: string) => void;
  onRemove: (id: number) => void;
}) {
  const set = (field: keyof Condition) => (v: string) => onChange(condition.id, field, v);

  return (
    <div className="flex flex-col gap-3">
      {index > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-[#cdcbc2]" />
          <span className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif] px-2">AND</span>
          <div className="flex-1 h-px bg-[#cdcbc2]" />
        </div>
      )}
      <div className="flex items-end gap-3 flex-wrap">
        {/* Condition Type */}
        <div className="flex flex-col gap-1 w-[180px] shrink-0">
          <label className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif]">
            CONDITION TYPE {index === 0 ? "" : <span className="text-[#cd3d1b]">*</span>}
          </label>
          <div className="relative">
            <select
              value={condition.type}
              onChange={(e) => set("type")(e.target.value)}
              className="w-full border border-[#b9b6ac] rounded-lg bg-[#edebe4] text-[#141411] text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 h-10 appearance-none cursor-pointer focus:outline-none focus:border-[#3077a3]"
            >
              <option value="">Select condition type</option>
              {CONDITION_TYPES.map((ct) => (
                <option key={ct.value} value={ct.value}>{ct.label}</option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <SelectIcon />
            </div>
          </div>
        </div>

        {/* Dynamic fields by type */}
        {condition.type === "amount" && (
          <>
            <div className="w-[160px] shrink-0">
              <StyledSelect label="CRITERIA" required value={condition.criteria || "Greater than"} onChange={set("criteria")} options={AMOUNT_CRITERIA} />
            </div>
            <div className="w-[100px] shrink-0">
              <StyledSelect label="CURRENCY" required value={condition.currency} onChange={set("currency")} options={CURRENCIES} />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
              <label className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif]">
                AMOUNT <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-[#b9b6ac] rounded-lg bg-white px-3 py-2 gap-2">
                <span className="text-[#737169] text-[13px]">$</span>
                <input
                  type="number"
                  defaultValue="0.00"
                  step="0.01"
                  className="flex-1 bg-transparent text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] focus:outline-none"
                />
                <span className="text-[#737169] text-[13px] shrink-0">🇺🇸 {condition.currency}</span>
              </div>
            </div>
          </>
        )}

        {(condition.type === "bin" || condition.type === "country" || condition.type === "currency" || condition.type === "customer_id" || condition.type === "item") && (
          <>
            <div className="w-[140px] shrink-0">
              <StyledSelect label="CRITERIA" required value={condition.criteria || "Matches"} onChange={set("criteria")} options={MATCH_CRITERIA} />
            </div>
            <SearchField
              label={condition.type === "bin" ? "SEARCH BIN" : condition.type === "country" ? "SEARCH COUNTRY" : condition.type === "currency" ? "SEARCH CURRENCY" : condition.type === "customer_id" ? "SEARCH CUSTOMER ID" : "SEARCH ITEMS"}
              required
              placeholder={condition.type === "bin" ? "Search BIN" : condition.type === "country" ? "Search" : condition.type === "currency" ? "Search Currency" : condition.type === "customer_id" ? "Search Customer ID" : "Search Items"}
            />
          </>
        )}

        {condition.type === "gateway_status" && (
          <div className="flex-1">
            <StyledSelect label="GATEWAY STATUS IS" required value={condition.attribute || "Default"} onChange={set("attribute")} options={GATEWAY_STATUS_VALUES} />
          </div>
        )}

        {condition.type === "fraud" && (
          <>
            <div className="w-[160px] shrink-0">
              <StyledSelect label="CRITERIA" required value={condition.criteria || "Between"} onChange={set("criteria")} options={["Between", "Greater than", "Less than", "Equal to"]} />
            </div>
            <div className="flex flex-col gap-1 w-[120px] shrink-0">
              <label className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif]">STARTING VALUE</label>
              <input type="number" defaultValue="0" className="border border-[#b9b6ac] rounded-lg bg-white text-[#141411] text-[13px] px-3 py-2 focus:outline-none focus:border-[#3077a3]" />
            </div>
            <div className="flex flex-col gap-1 w-[120px] shrink-0">
              <label className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif]">FINAL VALUE</label>
              <input type="number" defaultValue="100" className="border border-[#b9b6ac] rounded-lg bg-white text-[#141411] text-[13px] px-3 py-2 focus:outline-none focus:border-[#3077a3]" />
            </div>
          </>
        )}

        {condition.type === "time" && (
          <>
            <div className="w-[140px] shrink-0">
              <StyledSelect label="CRITERIA" required value={condition.criteria || "After"} onChange={set("criteria")} options={TIME_CRITERIA} />
            </div>
            <div className="w-[140px] shrink-0">
              <StyledSelect label="ATTRIBUTE" required value={condition.attribute || "Date"} onChange={set("attribute")} options={TIME_ATTRIBUTES} />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
              <label className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif]">
                VALUE <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-[#b9b6ac] rounded-lg bg-white px-3 py-2 gap-2">
                <svg className="size-4 text-[#737169] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input type="date" className="flex-1 bg-transparent text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] focus:outline-none" defaultValue="2024-01-01" />
              </div>
            </div>
          </>
        )}

        {condition.type === "transaction_status" && (
          <>
            <div className="w-[140px] shrink-0">
              <StyledSelect label="CRITERIA" required value={condition.criteria || "Matches"} onChange={set("criteria")} options={MATCH_CRITERIA} />
            </div>
            <div className="flex-1">
              <StyledSelect label="ATTRIBUTE" required value={condition.attribute || "Approved"} onChange={set("attribute")} options={TRANSACTION_STATUS_ATTRIBUTES} />
            </div>
          </>
        )}

        {condition.type === "payment_source" && (
          <>
            <div className="w-[140px] shrink-0">
              <StyledSelect label="CRITERIA" required value={condition.criteria || "Matches"} onChange={set("criteria")} options={MATCH_CRITERIA} />
            </div>
            <div className="flex-1">
              <StyledSelect label="ATTRIBUTE" required value={condition.attribute || "Recurly.js"} onChange={set("attribute")} options={PAYMENT_SOURCE_ATTRIBUTES} />
            </div>
          </>
        )}

        {condition.type === "volume" && (
          <>
            <div className="w-[140px] shrink-0">
              <StyledSelect label="CRITERIA" required value={condition.criteria || "Amount"} onChange={set("criteria")} options={VOLUME_CRITERIA} />
            </div>
            <div className="w-[140px] shrink-0">
              <StyledSelect label="ATTRIBUTE" required value={condition.attribute || "Is"} onChange={set("attribute")} options={VOLUME_ATTRIBUTES} />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[100px]">
              <label className="text-[#737169] text-[11px] font-bold tracking-wide uppercase font-['FT_Polar_Trim:Semibold',sans-serif]">
                QUANTITY <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-[#b9b6ac] rounded-lg bg-white px-3 py-2 gap-2">
                <input type="number" defaultValue="0" className="flex-1 bg-transparent text-[13px] font-['FT_Polar_Trim:Regular',sans-serif] text-[#141411] focus:outline-none" />
                <span className="text-[#737169] text-[13px] shrink-0">Units</span>
              </div>
            </div>
          </>
        )}

        {/* Remove button (only when more than 1 condition) */}
        {total > 1 && condition.type !== "" && (
          <button
            onClick={() => onRemove(condition.id)}
            className="mb-[2px] self-end p-1.5 rounded text-[#737169] hover:text-red-500 hover:bg-red-50 cursor-pointer"
            title="Remove condition"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default function ConditionsCard() {
  const [conditions, setConditions] = useState<Condition[]>([newCondition(1)]);
  const [nextId, setNextId] = useState(2);

  function handleChange(id: number, field: keyof Condition, value: string) {
    setConditions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  function handleAdd() {
    setConditions((prev) => [...prev, newCondition(nextId)]);
    setNextId((n) => n + 1);
  }

  function handleRemove(id: number) {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  }

  const lastHasType = conditions[conditions.length - 1].type !== "";

  return (
    <div className="bg-white border border-[#b9b6ac] rounded-lg overflow-hidden shadow-[0px_1px_0px_0px_#e8e8e9]">
      <div className="px-4 py-3">
        <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[14px] leading-[22px] text-[#141411]">
          Conditions
        </h2>
        <p className="text-[#737169] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif]">
          Specify the conditions that must be met for this rule to be applied. If all conditions are true, the payment will be routed according to this rule. Or, if using OR logic between groups, specify that clearly.
        </p>
      </div>

      <div className="border-t border-[#cdcbc2] px-4 py-4 flex flex-col gap-4">
        {conditions.map((condition, index) => (
          <ConditionRow
            key={condition.id}
            condition={condition}
            index={index}
            total={conditions.length}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        ))}

        {lastHasType && (
          <button
            onClick={handleAdd}
            className="self-start border border-[#141411] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[13px] leading-[20px] text-[#141411] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#f5f5f1]"
          >
            Add Another Condition
          </button>
        )}
      </div>
    </div>
  );
}
