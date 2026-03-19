import type { Rule } from "@/lib/data";

type Props = {
  rule: Rule;
  onClose: () => void;
  onEdit: () => void;
  onDisable: () => void;
};

export default function RuleDetailPanel({ rule, onClose, onEdit, onDisable }: Props) {
  return (
    <div className="fixed top-0 right-0 bottom-0 w-[360px] bg-white border-l border-[#cdcbc2] flex flex-col shadow-xl z-20">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-[#cdcbc2]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="size-2 rounded-full bg-green-500" />
            <span className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[16px] leading-[24px] text-[#141411]">
              {rule.name}
            </span>
          </div>
          <span className="text-[#737169] text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif]">
            {rule.ruleId}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[#737169] hover:text-[#141411] p-1 rounded cursor-pointer"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-0">
        {/* Description */}
        <div className="border border-[#cdcbc2] rounded-lg m-4">
          <div className="p-4">
            <h3 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[14px] leading-[22px] text-[#141411] mb-3">
              Description
            </h3>
            <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif]">
              {rule.description}
            </p>
          </div>
        </div>

        {/* Conditions */}
        <div className="border border-[#cdcbc2] rounded-lg mx-4 mb-4">
          <div className="p-4">
            <h3 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[14px] leading-[22px] text-[#141411] mb-3">
              Conditions
            </h3>
            <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif]">
              {rule.conditions}
            </p>
          </div>
        </div>

        {/* Gateway Routing */}
        <div className="border border-[#cdcbc2] rounded-lg mx-4 mb-4">
          <div className="p-4">
            <h3 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[14px] leading-[22px] text-[#141411] mb-3">
              Gateway Routing
            </h3>
            <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif]">
              {rule.gatewayRouting}
            </p>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="p-4 border-t border-[#cdcbc2] flex gap-3">
        <button
          onClick={onEdit}
          className="bg-[#ffd706] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[13px] leading-[20px] text-[#141411] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#f5ce00]"
        >
          Edit Rule
        </button>
        <button
          onClick={onDisable}
          className="border border-[#b9b6ac] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[13px] leading-[20px] text-[#141411] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#f5f5f1]"
        >
          Disable Rule
        </button>
      </div>
    </div>
  );
}
