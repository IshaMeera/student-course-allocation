"use client";

import { useEffect, useState } from "react";
import { Course, CoursePayload } from "@/types/course";
import { createCourse, updateCourse } from "@/services/courseApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course?: Course | null;
  onSuccess: () => void;
}

export default function CourseDialog({
  open,
  onOpenChange,
  course,
  onSuccess
}: Props) {
  const [formData, setFormData] = useState({
  courseName: "",
  totalSeats: "",
  reservedSeats: {
    GENERAL: "",
    OBC: "",
    SC: "",
    ST: "",
  },
});
useEffect(() => {
  if (course) {
    setFormData({
      courseName: course.courseName,

      totalSeats: course.totalSeats.toString(),

      reservedSeats: {
        GENERAL: course.reservedSeats.GENERAL.toString(),
        OBC: course.reservedSeats.OBC.toString(),
        SC: course.reservedSeats.SC.toString(),
        ST: course.reservedSeats.ST.toString(),
      },
    });
  } else {
    setFormData({
      courseName: "",
      totalSeats: "",
      reservedSeats: {
        GENERAL: "",
        OBC: "",
        SC: "",
        ST: "",
      },
    });
  }
}, [course]);
const handleChange = ( field: keyof typeof formData, value: string ) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const handleReservedSeatChange = (category: keyof typeof formData.reservedSeats, value: string) => {
  setFormData((prev) => ({
    ...prev,
    reservedSeats: {
      ...prev.reservedSeats,
      [category]: value,
    },
  }));
};

const isEdit = !!course;

const handleSubmit = async () => {
  const totalSeats = Number(formData.totalSeats);

  const reservedSeats = {
    GENERAL: Number(formData.reservedSeats.GENERAL),
    OBC: Number(formData.reservedSeats.OBC),
    SC: Number(formData.reservedSeats.SC),
    ST: Number(formData.reservedSeats.ST),
  };

  const reservedTotal =
    reservedSeats.GENERAL +
    reservedSeats.OBC +
    reservedSeats.SC +
    reservedSeats.ST;

  if (reservedTotal > totalSeats) {
    alert("Reserved seats cannot exceed total seats.");
    return;
  }

  const payload: CoursePayload = {
    courseName: formData.courseName,
    totalSeats,
    reservedSeats,
  };

  try {
    if (course) {
      await updateCourse(course._id, payload);
    } else {
      await createCourse(payload);
    }

    onOpenChange(false);
    onSuccess();
  } catch (error: any) {
    console.log(error.response?.data);
  }
};
return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {isEdit ? "Edit Course" : "Add Course"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6">

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Course Name
            </p>

            <Input
              value={formData.courseName}
              onChange={(e) =>
                handleChange("courseName", e.target.value)
              }
              placeholder="Course Name"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Total Seats
            </p>

            <Input
              type="number"
              value={formData.totalSeats}
              onChange={(e) =>
                handleChange("totalSeats", e.target.value)
              }
              placeholder="Total Seats"
            />
          </div>

        </div>

        <div className="rounded-xl border p-5 space-y-4">

          <div>
            <h3 className="font-semibold">
              Reserved Seats
            </h3>

            <p className="text-sm text-muted-foreground">
              Allocate reserved seats for each category.
            </p>
          </div>

          {(["GENERAL", "OBC", "SC", "ST"] as const).map(
            (category) => (
              <div
                key={category}
                className="flex items-center justify-between gap-4"
              >
                <span className="font-medium w-24">
                  {category}
                </span>

                <Input
                  type="number"
                  className="max-w-40"
                  value={formData.reservedSeats[category]}
                  onChange={(e) =>
                    handleReservedSeatChange(
                      category,
                      e.target.value
                    )
                  }
                />
              </div>
            )
          )}

        </div>

        <div className="flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            {isEdit ? "Update Course" : "Create Course"}
          </Button>

        </div>

      </div>
    </DialogContent>
  </Dialog>
);
}