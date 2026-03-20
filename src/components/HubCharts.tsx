"use client";

import React from "react";
import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS, HUB_TEXT_LIGHT, HUB_GRID, HUB_PRIMARY } from "./HubShared";

const AXIS_STYLE = { fontSize: 12, fill: HUB_TEXT_LIGHT };
const GRID_COLOR = HUB_GRID;

function fmtNum(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return String(v);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const yTickFmt = (v: any) => fmtNum(Number(v));

// ─── Area Chart ───────────────────────────────────────────────────────────────
export function HubAreaChart({
  data,
  dataKey = "value",
  xKey = "date",
  color = HUB_PRIMARY,
  height = 300,
}: {
  data: Record<string, unknown>[];
  dataKey?: string;
  xKey?: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey={xKey} tick={AXIS_STYLE} axisLine={false} tickLine={false}
          interval={Math.ceil(data.length / 8)} />
        <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} width={45} tickFormatter={yTickFmt} />
        <Tooltip contentStyle={{ fontSize: 13, borderRadius: 6 }} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={color}
          fillOpacity={0.3}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Multi-line Area Chart ─────────────────────────────────────────────────────
export function HubMultiAreaChart({
  data,
  lines,
  xKey = "date",
  height = 300,
}: {
  data: Record<string, unknown>[];
  lines: { dataKey: string; color: string; name: string }[];
  xKey?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey={xKey} tick={AXIS_STYLE} axisLine={false} tickLine={false}
          interval={Math.ceil(data.length / 8)} />
        <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} width={60} />
        <Tooltip contentStyle={{ fontSize: 13, borderRadius: 6 }} />
        <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
        {lines.map((l) => (
          <Area
            key={l.dataKey}
            type="monotone"
            dataKey={l.dataKey}
            name={l.name}
            stroke={l.color}
            strokeWidth={2}
            fill={l.color}
            fillOpacity={0.3}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Bar Chart (vertical columns) ─────────────────────────────────────────────
export function HubBarChart({
  data,
  dataKey = "value",
  xKey = "name",
  color = HUB_PRIMARY,
  height = 300,
}: {
  data: Record<string, unknown>[];
  dataKey?: string;
  xKey?: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey={xKey} tick={AXIS_STYLE} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} width={50} tickFormatter={yTickFmt} />
        <Tooltip contentStyle={{ fontSize: 13, borderRadius: 6 }} />
        <Bar dataKey={dataKey} fill={color} radius={[3, 3, 0, 0]} maxBarSize={60} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Horizontal Bar Chart ──────────────────────────────────────────────────────
export function HubHBarChart({
  data,
  dataKey = "value",
  yKey = "name",
  color = HUB_PRIMARY,
  height = 300,
}: {
  data: Record<string, unknown>[];
  dataKey?: string;
  yKey?: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="horizontal" margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} horizontal={false} />
        <XAxis type="number" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey={yKey} tick={AXIS_STYLE} axisLine={false} tickLine={false} width={80} />
        <Tooltip contentStyle={{ fontSize: 13, borderRadius: 6 }} />
        <Bar dataKey={dataKey} fill={color} radius={[0, 3, 3, 0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Line Chart ───────────────────────────────────────────────────────────────
export function HubLineChart({
  data,
  lines,
  xKey = "date",
  height = 300,
}: {
  data: Record<string, unknown>[];
  lines: { dataKey: string; color: string; name: string }[];
  xKey?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey={xKey} tick={AXIS_STYLE} axisLine={false} tickLine={false}
          interval={Math.ceil(data.length / 8)} />
        <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} width={45} tickFormatter={yTickFmt} />
        <Tooltip contentStyle={{ fontSize: 13, borderRadius: 6 }} />
        {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />}
        {lines.map((l) => (
          <Line
            key={l.dataKey}
            type="monotone"
            dataKey={l.dataKey}
            name={l.name}
            stroke={l.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── Donut / Pie Chart ─────────────────────────────────────────────────────────
export function HubDonutChart({
  data,
  dataKey = "value",
  nameKey = "name",
  colors = CHART_COLORS,
  height = 300,
  innerRadius = "55%",
  showLegend = true,
}: {
  data: Record<string, unknown>[];
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
  height?: number;
  innerRadius?: string | number;
  showLegend?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy={showLegend ? "45%" : "50%"}
          outerRadius="70%"
          innerRadius={innerRadius}
          paddingAngle={1}
          label={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ fontSize: 13, borderRadius: 6 }}
          formatter={(value: unknown, name: unknown) => [
            typeof value === "number" ? value.toLocaleString() : String(value),
            name,
          ]}
        />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
            formatter={(value) => <span style={{ color: HUB_TEXT_LIGHT }}>{value}</span>}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
