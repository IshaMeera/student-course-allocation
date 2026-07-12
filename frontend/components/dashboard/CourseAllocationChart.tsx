"use client";

import {ResponsiveContainer,BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseStat {
  courseId: string;
  courseName: string;
  allocatedStudents: number;
}

interface Props {
  data: CourseStat[];
}

export default function CourseAllocationChart({ data }: Props) {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>Course Allocation</CardTitle>
      </CardHeader>

      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="courseName"
              tick={{ fontSize: 12 }}
            />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="allocatedStudents"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}