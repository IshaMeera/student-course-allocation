import StatCard from "@/components/dashboard/StatCard";
import { getDashboardData } from "@/services/dashboardApi";
import { Users, GraduationCap, BookOpen, CircleCheckBig } from "lucide-react";
import CourseAllocationChart from "@/components/dashboard/CourseAllocationChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Overview of the Student Course Allocation System
        </p>
      </div>

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
      <div className="grid gap-6 lg:grid-cols-2">
        <CourseAllocationChart
          data={dashboard.courseStatistics}
        />

        <CategoryPieChart
          data={dashboard.categorySummary}
      />
</div>
    </div>
  );
}