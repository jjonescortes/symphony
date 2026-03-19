type Props = {
  onClose: () => void;
  onSave: () => void;
};

const paymentMethods = [
  { key: "sepa", label: "SEPA DIRECT DEBIT", defaultGateway: "Braintree" },
  { key: "ach", label: "AUTOMATED CLEARING HOUSE (ACH)", defaultGateway: "GOCardless" },
  { key: "ideal", label: "IDEAL", defaultGateway: "GOCardless" },
  { key: "qiwi", label: "QIWI WALLET", defaultGateway: "Braintree" },
];

const gateways = ["Braintree", "GOCardless", "Stripe", "Adyen", "Square"];

export default function SetDefaultGatewayPanel({ onClose, onSave }: Props) {
  return (
    <div className="fixed top-0 right-0 bottom-0 w-[360px] bg-white border-l border-[#cdcbc2] flex flex-col shadow-xl z-20">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-[#cdcbc2]">
        <h2 className="font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[16px] leading-[24px] text-[#141411]">
          Set Default Gateway by Payment Method
        </h2>
        <button
          onClick={onClose}
          className="text-[#737169] hover:text-[#141411] p-1 rounded cursor-pointer flex-shrink-0"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] mb-6">
          A list of all of the payment methods available to you through your payment gateways can be found below. In the event that your account has multiple gateways you can set a default payment gateway for each payment method.
        </p>

        <div className="flex flex-col gap-5">
          {paymentMethods.map((method) => (
            <div key={method.key}>
              <label className="block text-[#737169] text-[11px] leading-[16px] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold tracking-wide uppercase mb-1">
                {method.label}
              </label>
              <div className="relative">
                <select
                  defaultValue={method.defaultGateway}
                  className="w-full border border-[#b9b6ac] rounded-lg bg-[#f5f5f1] text-[#141411] text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] px-3 py-2 appearance-none cursor-pointer focus:outline-none focus:border-[#3077a3]"
                >
                  {gateways.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="size-4 text-[#737169]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#cdcbc2] flex gap-3">
        <button
          onClick={onSave}
          className="bg-[#ffd706] font-['FT_Polar_Trim:Semibold',sans-serif] font-bold text-[13px] leading-[20px] text-[#141411] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#f5ce00]"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="font-['FT_Polar_Trim:Regular',sans-serif] text-[13px] leading-[20px] text-[#737169] px-4 py-2 cursor-pointer hover:text-[#141411]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
