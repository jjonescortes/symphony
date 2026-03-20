"use client";

import React from "react";
import {
  HubPageWrapper, HubStatsGrid, HubStatCard,
  HubChartSection, HubDistribution, HubSection,
  HubTable, HubBadge,
  HUB_PRIMARY, CHART_COLORS,
} from "./HubShared";
import { HubAreaChart, HubDonutChart, HubBarChart } from "./HubCharts";

// Generate 30-day auth rate trend
const AUTH_TREND = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  value: parseFloat((90 + Math.sin(i * 0.4) * 2 + i * 0.05 + (Math.random() - 0.5) * 1.5).toFixed(2)),
}));

const PAYMENT_METHODS = [
  { name: "Credit Card",   value: 45.2 },
  { name: "Debit Card",    value: 28.4 },
  { name: "PayPal",        value: 12.8 },
  { name: "Apple Pay",     value:  6.7 },
  { name: "Google Pay",    value:  3.9 },
  { name: "Bank Transfer", value:  1.8 },
  { name: "Venmo",         value:  0.7 },
  { name: "Other",         value:  0.5 },
];

const GATEWAYS = [
  { name: "Stripe",       value: 97.2 },
  { name: "Adyen",        value: 96.8 },
  { name: "Checkout.com", value: 96.5 },
  { name: "PayPal",       value: 96.3 },
  { name: "Square",       value: 95.7 },
  { name: "Braintree",    value: 95.1 },
];

const DECLINE_REASONS = [
  { reason: "Insufficient Funds",  type: "Soft", count: "1,245,000", pct: "34.2%", volume: "$289M",  retryable: true  },
  { reason: "Invalid Card Number", type: "Hard", count: "892,000",   pct: "24.5%", volume: "$214M",  retryable: false },
  { reason: "Card Expired",        type: "Soft", count: "678,000",   pct: "18.6%", volume: "$162M",  retryable: true  },
  { reason: "Fraud Suspected",     type: "Hard", count: "423,000",   pct: "11.6%", volume: "$101M",  retryable: false },
  { reason: "Issuer Declined",     type: "Soft", count: "289,000",   pct: "7.9%",  volume: "$69M",   retryable: true  },
  { reason: "Other",               type: "Hard", count: "112,000",   pct: "3.2%",  volume: "$27M",   retryable: false },
];

export default function PaymentProcessingPage() {
  return (
    <HubPageWrapper title="Payment Processing">

      <HubSection
        title="Sign-up & Recurring Payments"
        subtitle="Overall authorization rates for new customer sign-ups and recurring payments. Track success rates, identify friction points, and optimize payment method and gateway performance."
      >
        {/* KPIs */}
        <HubStatsGrid>
          <HubStatCard
            label="Overall Auth Rate"
            value="92.4%"
            trend={2.1}
            subMetric="vs last period"
          />
          <HubStatCard
            label="Successful Signups"
            value="4,221,000"
            trend={3.4}
            subMetric="4,567,000 total attempts"
          />
          <HubStatCard
            label="Decline Rate"
            value="7.6%"
            trend={-2.1}
            subMetric="346,000 declined"
          />
        </HubStatsGrid>

        {/* Auth Rate Trend */}
        <HubChartSection title="Authorization Rate Trend — Last 30 Days">
          <HubAreaChart data={AUTH_TREND} dataKey="value" xKey="date" color={HUB_PRIMARY} height={300} />
        </HubChartSection>

        {/* Distribution */}
        <HubDistribution>
          <HubChartSection title="Payment Method Distribution">
            <HubDonutChart
              data={PAYMENT_METHODS}
              dataKey="value"
              nameKey="name"
              colors={CHART_COLORS}
              height={300}
              innerRadius="50%"
              showLegend
            />
          </HubChartSection>
          <HubChartSection title="Gateway Success Rates">
            <HubBarChart data={GATEWAYS} dataKey="value" xKey="name" color={HUB_PRIMARY} height={300} />
          </HubChartSection>
        </HubDistribution>

        {/* Decline Reasons Table */}
        <HubChartSection title="Top Decline Reasons">
          <HubTable
            headers={["Reason", "Type", "Count", "Percentage", "Volume", "Retryable"]}
            rows={DECLINE_REASONS.map((r) => [
              r.reason,
              <HubBadge key="type" variant={r.type === "Hard" ? "danger" : "warning"}>{r.type}</HubBadge>,
              r.count,
              r.pct,
              r.volume,
              <HubBadge key="retry" variant={r.retryable ? "success" : "neutral"}>{r.retryable ? "Yes" : "No"}</HubBadge>,
            ])}
          />
        </HubChartSection>
      </HubSection>

    </HubPageWrapper>
  );
}
