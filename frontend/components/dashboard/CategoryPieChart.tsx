"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: {
    GENERAL: number;
    OBC: number;
    SC: number;
    ST: number;
  };
}

const COLORS = [
  "#64748B",
  "#94A3B8",
  "#CBD5E1",
  "#E2E8F0",
];

export default function CategoryPieChart({ data }: Props) {
  const chartData = [
  {
    name: "General",
    value: data.GENERAL,
    fill: "#64748B",
  },
  {
    name: "OBC",
    value: data.OBC,
    fill: "#94A3B8",
  },
  {
    name: "SC",
    value: data.SC,
    fill: "#CBD5E1",
  },
  {
    name: "ST",
    value: data.ST,
    fill: "#E2E8F0",
  },
];

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>Category Distribution</CardTitle>
      </CardHeader>

      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={95}
            label={({ percent }) =>
                `${((percent ?? 0) * 100).toFixed(0)}%`
            }
            />

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}