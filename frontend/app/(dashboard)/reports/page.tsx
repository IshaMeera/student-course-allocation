"use client";

import { useEffect, useState } from "react";
import { getReports } from "@/services/reportApi";
import StatCard from "@/components/dashboard/StatCard";
import { CheckCircle2, GraduationCap, Trophy, Clock, Users, BookOpen, CircleCheckBig } from "lucide-react";
import { Card, CardContent , CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ReportsPage() {
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
        const data = await getReports();

        console.log("Reports API:", data);

        setReport(data);
    } catch (error) {
        console.error(error);
    }
 };

  if (!report) {
    return (
        <div className="flex h-full items-center justify-center">
        Loading reports...
        </div>
    );
 }

 const categoryData = Object.entries(
    report.categorySummary as Record<string, number>
    ).map(([category, students]) => ({
    category,
    students,
 }));

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Reports
        </h1>

        <p className="mt-2 text-slate-500">
          View detailed allocation statistics and insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
            title="Total Students"
            value={report.summary.totalStudents}
            icon={Users}
        />

        <StatCard
            title="Allocated"
            value={report.summary.allocatedStudents}
            icon={CircleCheckBig}
        />

        <StatCard
            title="Unallocated"
            value={report.summary.unallocatedStudents}
            icon={GraduationCap}
        />

      </div>

    <Card>
    <CardContent className="p-6">

        <h2 className="text-xl font-semibold mb-4">
        Highest Rejection Course
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

        <div>

            <h3 className="text-3xl font-bold">
            {report.highestRejectionCourse.courseName}
            </h3>

            <p className="text-red-500 text-lg font-medium mt-2">
            {report.highestRejectionCourse.rejectionRate}% Rejection Rate
            </p>

        </div>

        <div className="space-y-2">

            <p>
            Interested Students :
            <strong>
                {report.highestRejectionCourse.interestedStudents}
            </strong>
            </p>

            <p>
            Allocated :
            <strong>
                {report.highestRejectionCourse.allocatedStudents}
            </strong>
            </p>

            <p>
            Rejected :
            <strong>
                {report.highestRejectionCourse.rejectedStudents}
            </strong>
            </p>

        </div>

        </div>

    </CardContent>
    </Card>
    
    <Card>
    <CardHeader>
        <CardTitle>Category-wise Allocation</CardTitle>

        <p className="text-sm text-muted-foreground">
        Distribution of allocated students across reservation categories.
        </p>
    </CardHeader>

    <CardContent>
        <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={categoryData}
                dataKey="students"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(props: any)=>`${props.payload.category}: ${props.payload.students}`}
            />

            <Tooltip />

            <Legend />
            </PieChart>
        </ResponsiveContainer>
        </div>
    </CardContent>
    </Card>

    <Card>
    <CardHeader>
        <CardTitle>Course Statistics</CardTitle>

        <p className="text-sm text-muted-foreground">
        Seat availability and allocation details for each course.
        </p>
    </CardHeader>

    <CardContent>
        <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
            <tr className="border-b">
                <th className="py-3 text-left">Course</th>
                <th className="py-3 text-left">Total Seats</th>
                <th className="py-3 text-left">Filled</th>
                <th className="py-3 text-left">Available</th>
            </tr>
            </thead>

            <tbody>
            {report.courseStatistics.map((course: any) => (
                <tr
                key={course.courseId}
                className="border-b last:border-0"
                >
                <td className="py-4 font-medium">
                    {course.courseName}
                </td>

                <td className="py-4">
                    {course.totalSeats}
                </td>

                <td className="py-4">
                    {course.filledSeats}
                </td>

                <td className="py-4">
                    {course.availableSeats}
                </td>

                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </CardContent>
    </Card>
    <Card>
    <CardHeader>
        <CardTitle>
        Students Allocated to Lower Preferences
        </CardTitle>

        <p className="text-sm text-muted-foreground">
        Students who were not allocated their first course preference.
        </p>
    </CardHeader>

    <CardContent>
        {report.firstPreferenceMissed.length === 0 ? (
        <p className="text-sm text-muted-foreground">
            All allocated students received their first preference.
        </p>
        ) : (
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
                <tr className="border-b">
                <th className="py-3 text-left">Student ID</th>
                <th className="py-3 text-left">Student</th>
                <th className="py-3 text-left">Marks</th>
                <th className="py-3 text-left">Category</th>
                <th className="py-3 text-left">Allocated Course</th>
                <th className="py-3 text-left">Preference</th>
                </tr>
            </thead>

            <tbody>
                {report.firstPreferenceMissed.map((student: any) => (
                <tr
                    key={student._id}
                    className="border-b last:border-0"
                >
                    <td className="py-4">
                    {student.studentId}
                    </td>

                    <td className="py-4 font-medium">
                    {student.name}
                    </td>

                    <td className="py-4">
                    {student.marks}
                    </td>

                    <td className="py-4">
                    {student.category}
                    </td>

                    <td className="py-4">
                    {student.allocatedCourse?.courseName ?? "—"}
                    </td>

                    <td className="py-4">
                    Preference {student.allocatedPreference}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}
    </CardContent>
    </Card>
    </div>
  );
}