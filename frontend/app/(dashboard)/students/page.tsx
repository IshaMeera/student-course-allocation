"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { getStudentColumns } from "@/components/student/StudentColumns";
import { getStudents } from "@/services/studentApi";
import { useState, useEffect } from "react";
import { Student } from "@/types/student";
import StudentDialog from "@/components/student/StudentDialong";
import DeleteStudentDialog from "@/components/student/DeleteStudentDialog";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const handleAdd = () => {
    setSelectedStudent(null);
    setOpen(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleDelete = (student: Student) => {
    setStudentToDelete(student);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Students
          </h1>

          <p className="mt-2 text-slate-500">
            Manage student registrations and preferences.
          </p>
        </div>

        <Button onClick={handleAdd}>
          + Add Student
        </Button>
      </div>

      <DataTable
        columns={getStudentColumns({
          onEdit: handleEdit,
          onDelete: handleDelete
        })}
        data={students}
        searchColumn="name"
        searchPlaceholder="Search student"
      />

      <StudentDialog
        open={open}
        onOpenChange={setOpen}
        student={selectedStudent}
        onSuccess={fetchStudents}
      />

      <DeleteStudentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        student={studentToDelete}
        onSuccess={fetchStudents}
      />
    </div>
  );
}