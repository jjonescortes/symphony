"use client";

import React from "react";
import {
  HubPageWrapper, HubStatsGrid, HubStatCard,
  HubChartSection, HubDistribution, HubSection,
  HUB_PRIMARY, HUB_SUCCESS, HUB_DANGER, HUB_CARD, HUB_BORDER, HUB_TEXT_DARK, HUB_TEXT_LIGHT,
  CHART_COLORS,
} from "./HubShared";
import { HubDonutChart, HubBarChart } from "./HubCharts";

const PAYMENT_METHODS = [
  { name: "Credit Card",   value: 45.2 },
  { name: "Debit Card",    value: 28.4 },
  { name: "PayPal",        value: 12.8 },
  { name: "Apple Pay",     value:  6.7 },
  { name: "Google Pay",    value:  3.9 },
  { name: "Bank Transfer", value:  1.8 },
  { name: "Other",         value:  1.2 },
];

const TOP_COUNTRIES = [
  { name: "United States", volume: "$4.5B", transactions: "89.2M" },
  { name: "United Kingdom", volume: "$2.9B", transactions: "64.5M" },
  { name: "Germany",       volume: "$2.2B", transactions: "53.4M" },
  { name: "France",        volume: "$2.0B", transactions: "47.8M" },
  { name: "Canada",        volume: "$1.8B", transactions: "42.3M" },
];

// Simple SVG world map placeholder matching source Card style
function WorldMapCard() {
  return (
    <div style={{
      background: HUB_CARD,
      borderRadius: "0.5rem",
      border: `1px solid ${HUB_BORDER}`,
      boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
      padding: "2rem",
      flex: 1,
      fontFamily: "Roboto, 'Open Sans', sans-serif",
    }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: HUB_TEXT_DARK, marginBottom: "1.5rem" }}>
        Global Payment Volume Distribution
      </div>
      {/* Map SVG */}
      <svg viewBox="0 0 540 260" style={{ width: "100%", height: 180, display: "block" }}>
        <rect width="540" height="260" fill="#f1f5f9" rx="4" />
        <path d="M60,60 L130,50 L150,80 L140,130 L110,150 L80,140 L60,110Z" fill="#cbd5e1" />
        <path d="M110,160 L140,155 L150,200 L135,240 L110,245 L95,210 L100,175Z" fill="#cbd5e1" />
        <path d="M220,55 L265,50 L275,75 L260,95 L240,100 L220,90 L215,70Z" fill="#94a3b8" />
        <path d="M220,110 L265,105 L275,160 L255,205 L230,210 L210,175 L210,130Z" fill="#cbd5e1" />
        <path d="M275,40 L400,35 L420,70 L410,120 L370,130 L310,125 L275,100 L270,65Z" fill="#94a3b8" opacity="0.6" />
        <path d="M380,180 L430,175 L440,210 L415,230 L385,225 L375,200Z" fill="#cbd5e1" />
        <circle cx="95" cy="95" r="8" fill={HUB_PRIMARY} opacity="0.9" />
        <circle cx="235" cy="68" r="5" fill={HUB_PRIMARY} opacity="0.7" />
        <circle cx="248" cy="72" r="4" fill={HUB_PRIMARY} opacity="0.55" />
        <circle cx="238" cy="75" r="4" fill={HUB_PRIMARY} opacity="0.45" />
        <circle cx="123" cy="95" r="4" fill={HUB_PRIMARY} opacity="0.4" />
      </svg>
      {/* Country list */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: "1rem" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${HUB_BORDER}` }}>
            <th style={{ textAlign: "left", padding: "6px 8px", fontWeight: 600, color: HUB_TEXT_LIGHT, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Country</th>
            <th style={{ textAlign: "right", padding: "6px 8px", fontWeight: 600, color: HUB_TEXT_LIGHT, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Volume</th>
            <th style={{ textAlign: "right", padding: "6px 8px", fontWeight: 600, color: HUB_TEXT_LIGHT, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {TOP_COUNTRIES.map((c, i) => (
            <tr key={c.name} style={{ borderBottom: i < TOP_COUNTRIES.length - 1 ? `1px solid ${HUB_BORDER}` : "none" }}>
              <td style={{ padding: "8px 8px", color: HUB_TEXT_DARK }}>{c.name}</td>
              <td style={{ padding: "8px 8px", textAlign: "right", color: HUB_TEXT_DARK }}>{c.volume}</td>
              <td style={{ padding: "8px 8px", textAlign: "right", color: HUB_TEXT_DARK }}>{c.transactions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaymentMethodCard() {
  return (
    <div style={{
      background: HUB_CARD,
      borderRadius: "0.5rem",
      border: `1px solid ${HUB_BORDER}`,
      boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
      padding: "2rem",
      flex: 1,
      fontFamily: "Roboto, 'Open Sans', sans-serif",
    }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: HUB_TEXT_DARK, marginBottom: "1.5rem" }}>
        Payment Method Distribution
      </div>
      <HubDonutChart
        data={PAYMENT_METHODS}
        dataKey="value"
        nameKey="name"
        colors={CHART_COLORS}
        height={280}
        innerRadius="50%"
        showLegend
      />
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: "1rem" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${HUB_BORDER}` }}>
            <th style={{ textAlign: "left", padding: "6px 8px", fontWeight: 600, color: HUB_TEXT_LIGHT, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Method</th>
            <th style={{ textAlign: "right", padding: "6px 8px", fontWeight: 600, color: HUB_TEXT_LIGHT, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Share</th>
            <th style={{ textAlign: "right", padding: "6px 8px", fontWeight: 600, color: HUB_TEXT_LIGHT, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Volume</th>
          </tr>
        </thead>
        <tbody>
          {[
            { method: "Credit Card", share: "45.2%", vol: "$28.6B" },
            { method: "Debit Card",  share: "28.4%", vol: "$17.9B" },
            { method: "PayPal",      share: "12.8%", vol: "$8.1B"  },
            { method: "Apple Pay",   share: "6.7%",  vol: "$4.2B"  },
            { method: "Google Pay",  share: "3.9%",  vol: "$2.5B"  },
          ].map((r, i, arr) => (
            <tr key={r.method} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${HUB_BORDER}` : "none" }}>
              <td style={{ padding: "8px 8px", color: HUB_TEXT_DARK }}>{r.method}</td>
              <td style={{ padding: "8px 8px", textAlign: "right", color: HUB_TEXT_DARK }}>{r.share}</td>
              <td style={{ padding: "8px 8px", textAlign: "right", color: HUB_TEXT_DARK }}>{r.vol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PaymentsHubPage() {
  return (
    <HubPageWrapper title="Payments Hub">

      {/* Section 1: Payment Authorizations */}
      <HubSection
        title="Payment Authorizations"
        subtitle="Track where payments are coming from and how they are performing"
      >
        {/* Map + Pie row */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
          <WorldMapCard />
          <PaymentMethodCard />
        </div>

        {/* Auth rate stat cards */}
        <HubStatsGrid>
          <HubStatCard
            label="Overall Payment Authorization"
            value="84.5%"
            trend={3.2}
            subMetric="$5,000,000 authorized"
          />
          <HubStatCard
            label="Sign Up Payment Authorization"
            value="92.4%"
            trend={2.1}
            subMetric="$4,567,000 authorized"
          />
          <HubStatCard
            label="Recurring Payment Authorization"
            value="89.7%"
            trend={1.8}
            subMetric="$3,890,000 authorized"
          />
        </HubStatsGrid>
      </HubSection>

      {/* Section 2: Payment Recovery Engine */}
      <HubSection
        title="Payment Recovery Engine"
        subtitle="Optimize your safety nets and automated tools to maximize successful billing."
      >
        <HubStatsGrid>
          <HubStatCard
            label="Account Updater"
            value="$944K"
            trend={8.2}
            subMetric="75.0% lift in recovery"
          />
          <HubStatCard
            label="Fail-over Gateway"
            value="$3.1M"
            trend={6.8}
            subMetric="60.0% recovered"
          />
          <HubStatCard
            label="Payment Retry"
            value="$4.8M"
            trend={8.5}
            subMetric="62.0% recovered"
          />
        </HubStatsGrid>
      </HubSection>

      {/* Section 3: Risk and Dispute Management */}
      <HubSection
        title="Risk and Dispute Management"
        subtitle="Analyze transaction blocks, payment security measures, and financial impacts of disputes and refunds."
      >
        <HubStatsGrid>
          <HubStatCard
            label="Customer Authentications"
            value="89.2%"
            trend={4.2}
            subMetric="authentication success rate"
          />
          <HubStatCard
            label="Fraud Blocks"
            value="1,456"
            trend={-3.1}
            subMetric="$3.47M blocked"
          />
          <HubStatCard
            label="Refunds"
            value="1,823"
            trend={0.3}
            subMetric="$437.5K refunded"
          />
          <HubStatCard
            label="Chargebacks"
            value="234"
            trend={-0.8}
            subMetric="$56.1K disputed"
          />
        </HubStatsGrid>
      </HubSection>

    </HubPageWrapper>
  );
}
