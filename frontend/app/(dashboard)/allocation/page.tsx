"use client";

import { useState } from "react";
import { CheckCircle2, GraduationCap, Trophy, Clock, Users, BookOpen, CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { recalculateAllocation } from "@/services/allocationApi";
import { Student } from "@/types/student";
import { getDashboardData } from "@/services/dashboardApi";
import { getStudents } from "@/services/studentApi";
import StatCard from "@/components/dashboard/StatCard";

export default function AllocationPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dashboard, setDashboard] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);

  const handleAllocation = async () => {
    try {
      setLoading(true);

      await recalculateAllocation();
      const dashboardData = await getDashboardData();
      const studentData = await getStudents();

      setDashboard(dashboardData);
      setStudents(studentData);

    } catch (err) {
      console.error(err);
      setMessage("Allocation failed.");
    } finally {
      setLoading(false);
    }
  };

  const allocatedStudents = students.filter(
    (student) => student.allocatedStatus === "Allocated"
  );

  const unallocatedStudents = students.filter(
    (student) => student.allocatedStatus !== "Allocated"
  );

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Course Allocation
        </h1>

        <p className="mt-2 text-slate-500">
          Run the allocation engine to assign students to courses.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">

          <h3 className="font-semibold">
            Allocation Process
          </h3>

          <div className="space-y-3">

            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5" />
              Students are sorted by marks in descending order.
            </div>

            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5" />
              Students with the same marks are prioritized by their application date.
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5" />
              Each student's course preferences are checked one by one until a seat is available.
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5" />
              Category-wise reservation rules are applied before confirming the allocation.
            </div>

          </div>

        </CardContent>
      </Card>

      <Button
        size="lg"
        className="min-w-56"
        disabled={loading}
        onClick={handleAllocation}
        >
        {loading
            ? "Running Allocation..."
            : "Run Allocation"}
      </Button>

      {dashboard && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
            title="Students"
            value={dashboard.cards.totalStudents}
            icon={Users}
            />

            <StatCard
            title="Allocated"
            value={dashboard.cards.allocatedStudents}
            icon={CircleCheckBig}
            />

            <StatCard
            title="Unallocated"
            value={dashboard.cards.unallocatedStudents}
            icon={GraduationCap}
            />

            <StatCard
            title="Courses"
            value={dashboard.cards.totalCourses}
            icon={BookOpen}
            />

        </div>
        )}

        {allocatedStudents.length > 0 && (
        <div className="rounded-2xl border bg-white p-6">

            <h2 className="mb-5 text-xl font-semibold">
            Allocated Students
            </h2>

            <table className="w-full">

            <thead>

                <tr className="border-b">

                <th className="py-3 text-left">
                    Student
                </th>

                <th className="py-3 text-left">
                    Course
                </th>

                <th className="py-3 text-left">
                    Preference Used
                </th>

                </tr>

            </thead>

            <tbody>

                {allocatedStudents.map((student) => (
                <tr
                    key={student._id}
                    className="border-b"
                >

                    <td className="py-3">
                    {student.name}
                    </td>

                    <td className="py-3">
                    {student.allocatedCourse?.courseName}
                    </td>

                    <td className="py-3">
                    Preference {student.allocatedPreference}
                    </td>

                </tr>
                ))}

            </tbody>

            </table>

        </div>
        )}

        <div className="rounded-2xl border bg-white p-6">

        <h2 className="mb-5 text-xl font-semibold">
            Unallocated Students
        </h2>

        {unallocatedStudents.length === 0 ? (

            <p className="text-green-600 font-medium">
            🎉 All students have been successfully allocated.
            </p>

        ) : (

            <ul className="space-y-2">

            {unallocatedStudents.map((student) => (
                <li
                key={student._id}
                >
                {student.name}
                </li>
            ))}

            </ul>

        )}

        </div>

      {message && (
        <Card>
          <CardContent className="p-6">
            <p className="font-medium">
              {message}
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}