"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Course } from "@/types/course";

interface CourseColumnsProps {
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export const getCourseColumns = ({
  onEdit,
  onDelete,
}: CourseColumnsProps): ColumnDef<Course>[] => [
  {
    accessorKey: "courseName",
    header: "Course Name",
  },
  {
    accessorKey: "totalSeats",
    header: "Total Seats",
  },
  {
    id: "general",
    header: "General",
    cell: ({ row }) => row.original.reservedSeats.GENERAL,
  },
  {
    id: "obc",
    header: "OBC",
    cell: ({ row }) => row.original.reservedSeats.OBC,
  },
  {
    id: "sc",
    header: "SC",
    cell: ({ row }) => row.original.reservedSeats.SC,
  },
  {
    id: "st",
    header: "ST",
    cell: ({ row }) => row.original.reservedSeats.ST,
  },
  {
    id: "filled",
    header: "Filled",
    cell: ({ row }) => {
      const filled = row.original.filledSeats;

      return (
        filled.GENERAL +
        filled.OBC +
        filled.SC +
        filled.ST
      );
    },
  },
  {
    id: "available",
    header: "Available",
    cell: ({ row }) => {
      const filled = row.original.filledSeats;

      const totalFilled =
        filled.GENERAL +
        filled.OBC +
        filled.SC +
        filled.ST;

      return row.original.totalSeats - totalFilled;
    },
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