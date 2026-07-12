"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { getCourseColumns } from "@/components/course/CourseColumns";
import { getCourses } from "@/services/courseApi";
import { useState, useEffect } from "react";
import { Course } from "@/types/course";
import CourseDialog from "@/components/course/CourseDialog";
import DeleteCourseDialog from "@/components/course/DeleteCourseDialog";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleAdd = () => {
    setSelectedCourse(null);
    setOpen(true);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleDelete = (course: Course) => {
    setCourseToDelete(course);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Courses
          </h1>

          <p className="mt-2 text-slate-500">
            Manage Course registrations and preferences.
          </p>
        </div>

        <Button onClick={handleAdd}>
          + Add Course
        </Button>
      </div>

      <DataTable
        columns={getCourseColumns({
          onEdit: handleEdit,
          onDelete: handleDelete
        })}
        data={courses}
        searchColumn="courseName"
        searchPlaceholder="Search Course"
      />

      <CourseDialog
        open={open}
        onOpenChange={setOpen}
        course={selectedCourse}
        onSuccess={fetchCourses}
      />

      <DeleteCourseDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        course={courseToDelete}
        onSuccess={fetchCourses}
      />
    </div>
  );
}