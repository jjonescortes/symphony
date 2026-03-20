"use client";

import React from "react";
import {
  HubPageWrapper, HubStatsGrid, HubStatCard,
  HubChartSection, HubDistribution, HubSection,
  HUB_SUCCESS, HUB_DANGER, CHART_COLORS,
} from "./HubShared";
import { HubDonutChart, HubBarChart, HubMultiAreaChart } from "./HubCharts";

// 30-day card status trend
const CARD_TREND = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  current: Math.round(3456000 + i * 600 + (Math.random() - 0.5) * 3000),
  expired:  Math.round(892000  - i * 240 + (Math.random() - 0.5) * 1500),
}));

const UPDATE_TYPES = [
  { name: "Card Number (PAN) Updates", value: 60.0 },
  { name: "Expiration Date Updates",   value: 40.0 },
];

const UPDATE_COUNTS = [
  { name: "Card Number Updates", value: 4707 },
  { name: "Expiration Updates",  value: 3138 },
];

export default function AccountUpdaterPage() {
  return (
    <HubPageWrapper title="Account Updater">

      <HubSection
        title="Card Lifecycle Management"
        subtitle="Track current vs expired cards, card update success rates, and failure reasons. Proactive card updates reduce involuntary churn and improve recurring payment success rates by keeping payment methods current."
      >
        {/* KPIs */}
        <HubStatsGrid>
          <HubStatCard
            label="Current Cards"
            value="3,456,000"
            trend={2.1}
            subMetric="valid payment methods"
          />
          <HubStatCard
            label="Expired Cards"
            value="892,000"
            trend={-5.4}
            subMetric="requiring updates"
          />
          <HubStatCard
            label="Update Success"
            value="7,845"
            trend={12.1}
            subMetric="cards updated this month"
          />
          <HubStatCard
            label="Update Failed"
            value="1,234"
            trend={-3.2}
            subMetric="update failures"
          />
        </HubStatsGrid>

        {/* Distribution */}
        <HubDistribution>
          <HubChartSection title="Update Type Distribution">
            <HubDonutChart
              data={UPDATE_TYPES}
              dataKey="value"
              nameKey="name"
              colors={CHART_COLORS}
              height={300}
              innerRadius="50%"
              showLegend
            />
          </HubChartSection>
          <HubChartSection title="Update Breakdown">
            <HubBarChart data={UPDATE_COUNTS} dataKey="value" xKey="name" color={CHART_COLORS[0]} height={300} />
          </HubChartSection>
        </HubDistribution>

        {/* Card Status Trend */}
        <HubChartSection title="Card Status Trend — Last 30 Days">
          <HubMultiAreaChart
            data={CARD_TREND}
            xKey="date"
            lines={[
              { dataKey: "current", color: HUB_SUCCESS, name: "Current Cards" },
              { dataKey: "expired", color: HUB_DANGER,  name: "Expired Cards" },
            ]}
            height={300}
          />
        </HubChartSection>
      </HubSection>

    </HubPageWrapper>
  );
}
