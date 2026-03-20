"use client";

import React from "react";
import {
  HubPageWrapper, HubStatsGrid, HubStatCard,
  HubChartSection, HubDistribution, HubSection,
  HUB_DANGER, CHART_COLORS,
} from "./HubShared";
import { HubLineChart, HubDonutChart, HubBarChart } from "./HubCharts";

// 30-day fraud blocks trend
const FRAUD_TREND = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  blockedCount: Math.round(82 + i * 4.7 + (Math.random() - 0.5) * 12),
}));

const FRAUD_BY_METHOD = [
  { name: "Credit Card", value: 45.2 },
  { name: "Debit Card",  value: 22.8 },
  { name: "PayPal",      value: 15.6 },
  { name: "Apple Pay",   value:  9.7 },
  { name: "Google Pay",  value:  4.3 },
  { name: "Other",       value:  2.4 },
];

const FRAUD_BY_GATEWAY = [
  { name: "Braintree",    value: 5 },
  { name: "PayPal",       value: 3 },
  { name: "Stripe",       value: 2 },
  { name: "Checkout.com", value: 1 },
  { name: "Adyen",        value: 1 },
  { name: "Square",       value: 0 },
];

export default function FraudPreventionPage() {
  return (
    <HubPageWrapper title="Fraud Prevention">

      <HubSection
        title="Fraud Detection & Blocking"
        subtitle="Monitor blocked transaction count, blocked volume, average risk scores, and rule performance. Balance fraud prevention with customer experience by tracking false positive rates and rule accuracy."
      >
        {/* KPIs */}
        <HubStatsGrid>
          <HubStatCard
            label="Blocked Transactions"
            value="1,456"
            trend={-3.1}
            subMetric="fraudulent attempts"
          />
          <HubStatCard
            label="Blocked Volume"
            value="$3.47M"
            trend={-2.8}
            subMetric="prevented losses"
          />
          <HubStatCard
            label="Avg Risk Score"
            value="23.4"
            trend={-1.2}
            subMetric="out of 100"
          />
        </HubStatsGrid>

        {/* Fraud Blocks Trend */}
        <HubChartSection title="Fraud Blocks Trend — Last 30 Days">
          <HubLineChart
            data={FRAUD_TREND}
            xKey="date"
            lines={[{ dataKey: "blockedCount", color: HUB_DANGER, name: "Blocked Transactions" }]}
            height={300}
          />
        </HubChartSection>

        {/* Distribution */}
        <HubDistribution>
          <HubChartSection title="Fraud by Payment Method">
            <HubDonutChart
              data={FRAUD_BY_METHOD}
              dataKey="value"
              nameKey="name"
              colors={CHART_COLORS}
              height={300}
              innerRadius="50%"
              showLegend
            />
          </HubChartSection>
          <HubChartSection title="Fraud Incidents by Gateway">
            <HubBarChart
              data={FRAUD_BY_GATEWAY}
              dataKey="value"
              xKey="name"
              color={HUB_DANGER}
              height={300}
            />
          </HubChartSection>
        </HubDistribution>
      </HubSection>

    </HubPageWrapper>
  );
}
