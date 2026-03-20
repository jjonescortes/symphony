"use client";

import React from "react";
import {
  HubPageWrapper, HubStatsGrid, HubStatCard,
  HubChartSection, HubSection, HubTable,
  HUB_SUCCESS,
} from "./HubShared";
import { HubBarChart } from "./HubCharts";

const RETRY_DATA = [
  { name: "Attempt 1", value: 2890000, transactions: 48200, rate: 59.6 },
  { name: "Attempt 2", value: 1240000, transactions: 20800, rate: 25.7 },
  { name: "Attempt 3", value:  580000, transactions:  9800, rate: 12.1 },
  { name: "Attempt 4", value:  140000, transactions:  2400, rate:  2.6 },
];

export default function PaymentRetryRecoveryPage() {
  return (
    <HubPageWrapper title="Payment Retry Recovery">

      <HubSection
        title="Retry Strategy Performance"
        subtitle="Track recovery rates and success by retry attempt. Understand how retry strategies impact revenue recovery and optimize retry timing and frequency to maximize successful payment collection while minimizing customer friction."
      >
        {/* KPIs */}
        <HubStatsGrid>
          <HubStatCard
            label="Total Recovered"
            value="$4.85M"
            trend={8.5}
            subMetric="this month"
          />
          <HubStatCard
            label="Transactions Recovered"
            value="81,200"
            trend={6.2}
            subMetric="successful retries"
          />
          <HubStatCard
            label="Overall Recovery Rate"
            value="62.4%"
            trend={3.8}
            subMetric="of failed payments"
          />
        </HubStatsGrid>

        {/* Revenue by Attempt Bar Chart */}
        <HubChartSection title="Revenue Recovered by Retry Attempt">
          <HubBarChart
            data={RETRY_DATA}
            dataKey="value"
            xKey="name"
            color={HUB_SUCCESS}
            height={300}
          />
        </HubChartSection>

        {/* Retry breakdown table */}
        <HubChartSection title="Retry Attempt Breakdown">
          <HubTable
            headers={["Attempt", "Transactions", "Revenue Recovered", "Success Rate", "Distribution"]}
            rows={RETRY_DATA.map((r) => [
              r.name,
              r.transactions.toLocaleString(),
              `$${(r.value / 1000000).toFixed(2)}M`,
              `${r.rate}%`,
              // inline mini bar
              <div key="bar" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 120, background: "#f1f5f9", borderRadius: 3, height: 8 }}>
                  <div style={{ width: `${r.rate}%`, background: HUB_SUCCESS, borderRadius: 3, height: 8 }} />
                </div>
              </div>,
            ])}
          />
        </HubChartSection>
      </HubSection>

    </HubPageWrapper>
  );
}
