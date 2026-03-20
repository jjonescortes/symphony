"use client";

import React, { useState } from "react";

const imgVector1 = "https://www.figma.com/api/mcp/asset/8ddce924-fb12-4c00-937d-c69392921986";
const imgVector2 = "https://www.figma.com/api/mcp/asset/591eb54f-cf1f-4184-a4e4-22bfd23a7896";
const imgVector3 = "https://www.figma.com/api/mcp/asset/5bf3cc40-de4b-4f09-9c2b-68bcc580bdc8";
const imgVector4 = "https://www.figma.com/api/mcp/asset/ed9492ba-8173-46d6-8356-da34ff67a711";
const imgVector5 = "https://www.figma.com/api/mcp/asset/30d0a474-a693-4187-8cf4-b64221c2d08c";
const imgVector6 = "https://www.figma.com/api/mcp/asset/4970207a-e86e-4cd0-ad22-53ec3168a3d2";
const imgVector7 = "https://www.figma.com/api/mcp/asset/0c4ea7a5-345f-4792-9414-02cca824d331";
const imgVector8 = "https://www.figma.com/api/mcp/asset/2026b89a-2091-40a5-bd89-1d692d2a6f37";

const navSections = [
  { label: "AI Answers", icon: "sparkles" },
  { label: "Customers", icon: "customers" },
  { label: "Compass", icon: "compass" },
  { label: "Analytics", icon: "analytics" },
  {
    label: "Payments",
    icon: "payments",
    children: [
      {
        label: "Payments Hub",
        subItems: ["Overview", "Payment Processing", "Account Updater", "Payment Retry Recovery", "Fraud Prevention"],
      },
      {
        label: "Payments Symphony",
        subItems: ["Routing Rules", "Retry Settings"],
      },
    ],
    extraLinks: ["Payment Gateways", "Payment Settings"],
  },
  { label: "Revenue Recognition", icon: "revrec" },
  { label: "Configuration", icon: "config" },
  { label: "App Management", icon: "appmanagement" },
  { label: "Integrations", icon: "integrations" },
  { label: "Admin", icon: "admin" },
  { label: "Recurly Admin", icon: "admin" },
  { label: "Current Environment", icon: "environment" },
];

function NavSectionIcon({ icon }: { icon: string }) {
  const cls = "absolute -translate-y-1/2 left-[12px] top-[calc(50%-0.5px)] size-[18px] flex items-center justify-center";

  const icons: Record<string, React.ReactNode> = {
    compass: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.3"/>
        <polygon points="9,3.5 10.2,8 9,9 7.8,8" fill="white"/>
        <polygon points="9,14.5 10.2,10 9,9 7.8,10" fill="white" opacity="0.5"/>
        <polygon points="3.5,9 8,7.8 9,9 8,10.2" fill="white" opacity="0.5"/>
        <polygon points="14.5,9 10,7.8 9,9 10,10.2" fill="white"/>
        <circle cx="9" cy="9" r="1" fill="white"/>
      </svg>
    ),
    sparkles: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <path d="M9 2L9.9 6.5L14 7L9.9 8L9 12.5L8.1 8L4 7L8.1 6.5L9 2Z" fill="white"/>
        <path d="M14 1L14.5 3.5L17 4L14.5 4.5L14 7L13.5 4.5L11 4L13.5 3.5L14 1Z" fill="white"/>
        <path d="M4 11L4.5 13L7 13.5L4.5 14L4 16L3.5 14L1 13.5L3.5 13L4 11Z" fill="white"/>
      </svg>
    ),
    customers: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <circle cx="9" cy="6" r="3.5" stroke="white" strokeWidth="1.4"/>
        <path d="M2.5 16c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    analytics: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <rect x="1.5" y="9" width="3" height="7.5" rx="0.8" fill="white" opacity="0.5"/>
        <rect x="7" y="5" width="3" height="11.5" rx="0.8" fill="white"/>
        <rect x="12.5" y="2" width="3" height="14.5" rx="0.8" fill="white" opacity="0.8"/>
        <path d="M1.5 16.5h15" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    payments: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <rect x="1.5" y="4" width="15" height="10" rx="1.5" stroke="white" strokeWidth="1.4"/>
        <path d="M1.5 7.5h15" stroke="white" strokeWidth="1.4"/>
        <rect x="3.5" y="10" width="3" height="1.5" rx="0.5" fill="white"/>
        <rect x="8" y="10" width="2" height="1.5" rx="0.5" fill="white" opacity="0.6"/>
      </svg>
    ),
    revrec: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <rect x="2" y="3" width="14" height="13" rx="1.5" stroke="white" strokeWidth="1.4"/>
        <path d="M2 7h14" stroke="white" strokeWidth="1.4"/>
        <path d="M6 2v2M12 2v2" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M5.5 11l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    config: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <circle cx="9" cy="9" r="2.5" stroke="white" strokeWidth="1.4"/>
        <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.6 3.6l1.4 1.4M13 13l1.4 1.4M3.6 14.4l1.4-1.4M13 5l1.4-1.4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    appmanagement: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <rect x="1.5" y="1.5" width="6.5" height="6.5" rx="1.2" stroke="white" strokeWidth="1.4"/>
        <rect x="10" y="1.5" width="6.5" height="6.5" rx="1.2" stroke="white" strokeWidth="1.4"/>
        <rect x="1.5" y="10" width="6.5" height="6.5" rx="1.2" stroke="white" strokeWidth="1.4"/>
        <rect x="10" y="10" width="6.5" height="6.5" rx="1.2" stroke="white" strokeWidth="1.4"/>
      </svg>
    ),
    integrations: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <path d="M9 1.5L16.5 9L9 16.5L1.5 9L9 1.5Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M9 5.5L12.5 9L9 12.5L5.5 9L9 5.5Z" fill="white"/>
      </svg>
    ),
    admin: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <rect x="3" y="8" width="12" height="9" rx="1.5" stroke="white" strokeWidth="1.4"/>
        <path d="M5.5 8V6a3.5 3.5 0 017 0v2" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="9" cy="12.5" r="1.5" fill="white"/>
      </svg>
    ),
    environment: (
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.4"/>
        <path d="M9 1.5C9 1.5 6 5 6 9s3 7.5 3 7.5M9 1.5C9 1.5 12 5 12 9s-3 7.5-3 7.5" stroke="white" strokeWidth="1.2"/>
        <path d="M1.5 9h15M2.5 5.5h13M2.5 12.5h13" stroke="white" strokeWidth="1.2"/>
      </svg>
    ),
  };

  return (
    <div className={cls}>
      {icons[icon] ?? (
        <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
          <rect x="2" y="2" width="14" height="14" rx="2" stroke="white" strokeWidth="1.4"/>
        </svg>
      )}
    </div>
  );
}

export default function Sidebar({ activePage = "Routing Rules", onNavigate }: { activePage?: string; onNavigate?: (page: string) => void }) {
  const paymentsHubPages = ["Overview", "Payment Processing", "Account Updater", "Payment Retry Recovery", "Fraud Prevention"];
  const paymentsSymphonyPages = ["Routing Rules", "Retry Settings"];
  const initialExpanded = paymentsHubPages.includes(activePage)
    ? ["Payments Hub"]
    : ["Payments Symphony"];
  const [expandedSections, setExpandedSections] = useState<string[]>(initialExpanded);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[220px] bg-[#0d0d0b] flex flex-col">
      {/* Logo */}
      <div className="h-[82px] flex items-center px-[15px]">
        <div className="relative h-[28px] w-[130.797px]">
          <div className="absolute left-[35.01px] top-[2px] h-[26px] w-[95.785px]">
            <div className="absolute inset-[3.8%_82.96%_22.62%_0]">
              <img alt="" className="absolute block max-w-none size-full" src={imgVector1} />
            </div>
            <div className="absolute inset-[22.62%_68.62%_22.62%_16.97%]">
              <img alt="" className="absolute block max-w-none size-full" src={imgVector2} />
            </div>
            <div className="absolute inset-[22.62%_52.58%_22.62%_32.78%]">
              <img alt="" className="absolute block max-w-none size-full" src={imgVector3} />
            </div>
            <div className="absolute inset-[23.62%_0_0_85.55%]">
              <img alt="" className="absolute block max-w-none size-full" src={imgVector4} />
            </div>
            <div className="absolute inset-[0_13.85%_22.62%_78.95%]">
              <img alt="" className="absolute block max-w-none size-full" src={imgVector5} />
            </div>
            <div className="absolute inset-[22.72%_22.85%_23.62%_65.22%]">
              <img alt="" className="absolute block max-w-none size-full" src={imgVector6} />
            </div>
            <div className="absolute inset-[23.62%_37.21%_22.62%_49.15%]">
              <img alt="" className="absolute block max-w-none size-full" src={imgVector7} />
            </div>
          </div>
          <div className="absolute left-[-1.24px] overflow-clip size-[28px] top-[-0.04px]">
            <div className="absolute inset-[0_4.48%]">
              <img alt="" className="absolute block max-w-none size-full" src={imgVector8} />
            </div>
          </div>
        </div>
      </div>

      {/* Site Selector */}
      <div className="px-[15px] mb-2">
        <div className="border border-[#55534d] rounded-[4px] flex items-center pr-2">
          <div className="flex-1 px-3 py-[6px]">
            <span className="text-white text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif] whitespace-nowrap">
              Site Name
            </span>
          </div>
          <svg className="size-4 text-[#ccc9b8]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto pt-2">
        {navSections.map((section) => (
          <div key={section.label}>
            {/* Section header */}
            <div className="relative h-[45px] w-full flex items-center cursor-pointer hover:bg-white/5">
              <NavSectionIcon icon={section.icon} />
              <span className="absolute left-[40px] right-4 text-white text-[13px] leading-[20px] font-['FT_Polar_Trim:Regular',sans-serif]">
                {section.label}
              </span>
            </div>

            {/* Payments sub-nav */}
            {section.children && (
              <div className="pb-2">
                {section.children.map((child) => {
                  const isExpanded = expandedSections.includes(child.label);
                  return (
                    <div key={child.label}>
                      <div
                        className="flex items-center px-4 cursor-pointer"
                        onClick={() => child.subItems.length > 0 && toggleSection(child.label)}
                      >
                        <div className="flex flex-1 gap-1 items-center pl-1 pr-2 py-1 rounded-[4px]">
                          {child.subItems.length > 0 && (
                            <svg className="size-4 text-white/70 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              {isExpanded ? (
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                              ) : (
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                              )}
                            </svg>
                          )}
                          <span className="text-white text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif]">
                            {child.label}
                          </span>
                        </div>
                      </div>
                      {isExpanded && child.subItems.length > 0 && (
                        <div>
                          {child.subItems.map((item) => {
                            const isActive = item === activePage;
                            return (
                              <div
                                key={item}
                                onClick={() => onNavigate?.(item)}
                                className="flex gap-3 items-center min-h-[28px] pl-[40px] pr-2 rounded-[4px] w-full cursor-pointer"
                              >
                                <div className={`flex flex-1 items-center px-2 py-1 rounded-[4px] ${isActive ? "bg-[#ffd706]" : "hover:bg-white/10"}`}>
                                  <span className={`text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] ${isActive ? "text-[#0d0d0b]" : "text-white"}`}>
                                    {item}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
                {section.extraLinks?.map((link) => {
                  const isActive = link === activePage;
                  return (
                    <div
                      key={link}
                      onClick={() => onNavigate?.(link)}
                      className="flex items-center min-h-[28px] px-4 w-full cursor-pointer"
                    >
                      <div className={`flex flex-1 items-center pl-6 py-1 rounded-[4px] ${isActive ? "bg-[#ffd706]" : "hover:bg-white/10"}`}>
                        <span className={`text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif] ${isActive ? "text-[#0d0d0b]" : "text-white"}`}>{link}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
