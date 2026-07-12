"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";

interface StudentColumnsProps {
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export const getStudentColumns = ({
  onEdit,
  onDelete,
}: StudentColumnsProps): ColumnDef<Student>[] => [
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "marks",
    header: "Marks",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.category}
      </Badge>
    ),
  },
  {
    header: "Preferences",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.preferences.map((course) => (
          <Badge
            key={course._id}
            variant="outline"
          >
            {course.courseName}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    header: "Allocated Course",
    cell: ({ row }) =>
      row.original.allocatedCourse ? (
        <Badge>
          {row.original.allocatedCourse.courseName}
        </Badge>
      ) : (
        <span className="text-muted-foreground">
          —
        </span>
      ),
  },
  {
    accessorKey: "allocatedStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.allocatedStatus === "Allocated"
            ? "default"
            : "secondary"
        }
      >
        {row.original.allocatedStatus}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(row.original)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onDelete(row.original)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];