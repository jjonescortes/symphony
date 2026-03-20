"use client";

import React from "react";
import { Triangle, ChevronRight, ChevronDown } from "lucide-react";

// ─── Design tokens (matching source global.css + constants.js) ───────────────
export const HUB_BG = "#f8fafc";
export const HUB_CARD = "#ffffff";
export const HUB_TEXT_DARK = "#1e293b";
export const HUB_TEXT_MED = "#475569";
export const HUB_TEXT_LIGHT = "#64748b";
export const HUB_BORDER = "#e2e8f0";
export const HUB_GRID = "#f1f5f9";
export const HUB_PRIMARY = "#2676A5";
export const HUB_SUCCESS = "#10b981";
export const HUB_DANGER = "#ef4444";
export const HUB_WARNING = "#f59e0b";

/** CHART_COLORS from source constants.js */
export const CHART_COLORS = [
  "#FF5599", "#3AD1D1", "#A963CF", "#006801", "#F4481D",
  "#1C436E", "#932B10", "#FF9B7A", "#352055", "#FF8200",
  "#478DB0", "#FFD706",
];

// ─── Card ─────────────────────────────────────────────────────────────────────
export function HubCard({ children, className = "", style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background: HUB_CARD,
        borderRadius: "0.5rem",
        border: `1px solid ${HUB_BORDER}`,
        boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── StatCard (1:1 match to source StatCard.css) ─────────────────────────────
export function HubStatCard({ label, value, trend, subMetric, link }: {
  label: string; value: string; trend?: number; subMetric?: string; link?: boolean;
}) {
  const trendUp = trend !== undefined && trend > 0;
  const trendColor = trendUp ? HUB_SUCCESS : HUB_DANGER;
  return (
    <HubCard
      style={{
        padding: "2rem",                    // --spacing-xl = 32px
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1rem",                        // --spacing-md = 16px
        fontFamily: "Roboto, 'Open Sans', -apple-system, sans-serif",
        flex: 1,
      }}
    >
      {/* Label */}
      <div style={{ fontSize: 16, fontWeight: 600, color: HUB_TEXT_DARK, lineHeight: 1.2 }}>
        {label}
      </div>

      {/* Value */}
      <div style={{ fontSize: 28, fontWeight: 700, color: HUB_TEXT_DARK, lineHeight: 1.2, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>

      {/* Trend */}
      {trend !== undefined && (
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.375rem", fontSize: 16, fontWeight: 400, color: trendColor }}>
          <Triangle
            size={12}
            fill={trendColor}
            color={trendColor}
            style={{ transform: trendUp ? "none" : "rotate(180deg)", transition: "transform 150ms" }}
          />
          <span>{Math.abs(trend).toFixed(1)}%</span>
        </div>
      )}

      {/* Sub-metric */}
      {subMetric && (
        <div style={{ fontSize: 16, color: HUB_TEXT_LIGHT, fontWeight: 400 }}>
          {subMetric}
        </div>
      )}

      {/* View Details */}
      {link !== false && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: HUB_PRIMARY, fontSize: 16, fontWeight: 400, cursor: "pointer", marginTop: "auto", padding: "0.5rem", borderRadius: "0.25rem" }}>
          <span>View Details</span>
          <ChevronRight size={16} />
        </div>
      )}
    </HubCard>
  );
}

// ─── Stats Grid ───────────────────────────────────────────────────────────────
export function HubStatsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 8,
      marginBottom: "3rem",
    }}>
      {children}
    </div>
  );
}

// ─── Chart Card (chart-section / chart-column) ────────────────────────────────
export function HubChartSection({ title, children, style }: {
  title?: string; children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      background: HUB_CARD,
      borderRadius: "0.5rem",
      border: `1px solid ${HUB_BORDER}`,
      boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
      padding: "2rem",
      ...style,
    }}>
      {title && (
        <div style={{ fontSize: 16, fontWeight: 600, color: HUB_TEXT_DARK, marginBottom: "1.5rem" }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

// ─── Distribution Section (2-col grid, gap 8px) ───────────────────────────────
export function HubDistribution({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: "3rem",
    }}>
      {children}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
export function HubSection({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: 700, color: HUB_TEXT_DARK, marginBottom: subtitle ? "0.25rem" : "1.5rem" }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: "0.9375rem", color: HUB_TEXT_LIGHT, marginBottom: "2rem", lineHeight: 1.6 }}>
          {subtitle}
        </div>
      )}
      {children}
    </div>
  );
}

// ─── Filter Pill ──────────────────────────────────────────────────────────────
export function FilterPill({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.25rem",
      border: `1px solid ${HUB_BORDER}`,
      borderRadius: "0.375rem",
      background: HUB_CARD,
      padding: "0.375rem 0.75rem",
      cursor: "pointer",
      fontSize: 14,
      color: HUB_TEXT_DARK,
      fontFamily: "Roboto, sans-serif",
      userSelect: "none",
    }}>
      <span style={{ color: HUB_TEXT_LIGHT }}>{label}:</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
      <ChevronDown size={14} color={HUB_TEXT_LIGHT} style={{ marginLeft: 2 }} />
    </div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────
export function HubFilterBar() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      flexWrap: "wrap",
      marginBottom: "2rem",
      fontFamily: "Roboto, sans-serif",
    }}>
      <FilterPill label="Date Range" value="Last 13 months" />
      <FilterPill label="Country" value="All Countries" />
      <FilterPill label="Gateway" value="All Gateways" />
      <FilterPill label="Payment Type" value="All Types" />
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
type BadgeVariant = "success" | "danger" | "warning" | "info" | "neutral";
const BADGE_STYLES: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: "#d1fae5", color: HUB_SUCCESS },
  danger:  { bg: "#fee2e2", color: HUB_DANGER },
  warning: { bg: "#fef3c7", color: HUB_WARNING },
  info:    { bg: "#dbeafe", color: "#3b82f6" },
  neutral: { bg: HUB_GRID,  color: HUB_TEXT_MED },
};

export function HubBadge({ variant = "neutral", children }: {
  variant?: BadgeVariant; children: React.ReactNode;
}) {
  const s = BADGE_STYLES[variant];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: "0.125rem 0.5rem", fontSize: "0.75rem", fontWeight: 500,
      borderRadius: 9999, background: s.bg, color: s.color,
      fontFamily: "Roboto, sans-serif",
    }}>
      {children}
    </span>
  );
}

// ─── Data Table ───────────────────────────────────────────────────────────────
export function HubTable({ headers, rows }: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, fontFamily: "Roboto, sans-serif" }}>
        <thead>
          <tr style={{ background: "#f9fafb", borderBottom: `2px solid ${HUB_BORDER}` }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: "12px 16px", textAlign: i > 0 ? "right" : "left", fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: `1px solid ${HUB_BORDER}`, background: ri % 2 === 1 ? HUB_GRID : "white" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "12px 16px", color: "#1f2937", textAlign: ci > 0 ? "right" : "left" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────
export function HubPageWrapper({ title, children }: {
  title: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      marginLeft: 220,
      minHeight: "100vh",
      background: HUB_BG,
      fontFamily: "Roboto, 'Open Sans', -apple-system, sans-serif",
    }}>
      {/* Page title bar */}
      <div style={{
        padding: "1.5rem 2rem 0.5rem",
        maxWidth: 1440,
        margin: "0 auto",
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: HUB_TEXT_DARK, margin: "0 0 1.5rem" }}>
          {title}
        </h1>
        <HubFilterBar />
      </div>

      {/* Content */}
      <div style={{ padding: "0 2rem 2rem", maxWidth: 1440, margin: "0 auto" }}>
        {children}
      </div>
    </div>
  );
}
