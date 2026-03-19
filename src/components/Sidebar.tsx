"use client";

import { useState } from "react";

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
        subItems: [],
      },
      {
        label: "Payments Symphony",
        subItems: ["Routing Rules", "Retry Settings"],
        defaultExpanded: true,
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
  const cls = "absolute -translate-y-1/2 left-[12px] top-[calc(50%-0.5px)] size-[18px] flex items-center justify-center text-white";
  if (icon === "sparkles") {
    return (
      <div className={cls}>
        <span className="font-['Font_Awesome_6_Sharp:Regular',sans-serif] not-italic text-[14px] leading-none">✦</span>
      </div>
    );
  }
  return (
    <div className={`${cls} opacity-70`}>
      <div className="size-3 rounded-sm border border-white/60" />
    </div>
  );
}

export default function Sidebar({ activePage = "Routing Rules" }: { activePage?: string }) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Payments Symphony"]);

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
                                className="flex gap-3 items-center min-h-[28px] pl-[40px] pr-2 rounded-[4px] w-full"
                              >
                                <div className={`flex flex-1 items-center px-2 py-1 rounded-[4px] ${isActive ? "bg-[#ffd706]" : ""}`}>
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
                {section.extraLinks?.map((link) => (
                  <div key={link} className="flex items-center min-h-[28px] px-4 w-full">
                    <div className="flex flex-1 items-center pl-6 py-1 rounded-[4px]">
                      <span className="text-white text-[12px] leading-[19px] font-['FT_Polar_Trim:Regular',sans-serif]">{link}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
