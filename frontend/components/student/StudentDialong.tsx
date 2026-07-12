"use client";

import { Student } from "@/types/student";
import { Course } from "@/types/course";
import { useState, useEffect } from "react";
import { getCourses } from "@/services/courseApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createStudent, updateStudent } from "@/services/studentApi";
import axios from "axios";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
  onSuccess:() => void;
}

type Category = "GENERAL" | "OBC" | "SC" | "ST";

type StudentFormData = {
  name: string;
  marks: string;
  category: Category;
  preferences: string[];
};

export default function StudentDialog({
  open,
  onOpenChange,
  student,
  onSuccess
}: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    marks: "",
    category: "GENERAL",
    preferences: ["", "", ""],
    });
  useEffect(() => {
    if (open) {
        fetchCourses();
    }
    }, [open]);

  useEffect(() => {
    if (student) {
        setFormData({
        name: student.name,
        marks: student.marks.toString(),
        category: student.category,
        preferences: student.preferences.map((course) => course._id),
        });
    } else {
        setFormData({
        name: "",
        marks: "",
        category: "GENERAL",
        preferences: ["", "", ""],
        });
    }
    }, [student]);

    const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
    };

    console.log(courses);

    const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
        ...prev,
        [field]: value,
    }));
    };

    const handlePreferenceChange = (index: number, value: string) => {
      if (isDuplicatePreference(index, value)) {
        alert("This course has already been selected.");
        return;
      }

      const updated = [...formData.preferences];
      updated[index] = value;

      setFormData((prev) => ({
        ...prev,
        preferences: updated,
      }));
    };

    const isDuplicatePreference = (currentIndex: number, courseId: string) => {
      return formData.preferences.some(
        (id, index) => index !== currentIndex && id === courseId
      );
    };
  const isEdit = !!student;

  const renderPreferenceSelect = (index: number) => (

    <Select
        value={formData.preferences[index]}
        onValueChange={(value) => {
          if (value !== null) {
            setFormData((prev) => ({
              ...prev,
              category: value as Category,
            }));
          }
        }}
    >
        <SelectTrigger>
        <SelectValue>
          {formData.preferences[index]
            ? courses.find(
                (course) => course._id === formData.preferences[index]
              )?.courseName
            : `Preference ${index + 1}`}
        </SelectValue>
        </SelectTrigger>

        <SelectContent>
        {courses.map((course) => (
            <SelectItem
            key={course._id}
            value={course._id}
            disabled={
                formData.preferences.includes(course._id) &&
                formData.preferences[index] !== course._id
            }
            >
            {course.courseName}
            </SelectItem>
        ))}
        </SelectContent>
    </Select>
    );

    const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      marks: Number(formData.marks),
      category: formData.category,
      preferences: formData.preferences,
    };

    console.log("Payload:", payload);

    try {
      if (student) {
        await updateStudent(student._id, payload);
      } else {
        await createStudent(payload);
      }

      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        console.log(error.response?.status);
      } else {
        console.error(error);
      }

      alert("Something went wrong.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Student" : "Add Student"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Student Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
         />

          <Input
            placeholder="Marks"
            type="number"
            value={formData.marks}
            onChange={(e) => handleChange("marks", e.target.value)}
         />

         <div className="space-y-2">
          <p className="text-sm font-medium">
            Category
          </p>

          <Select
            value={formData.category}
            onValueChange={(value) => {
            if (value !== null) {
              handleChange("category", value);
            }
          }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="GENERAL">GENERAL</SelectItem>
              <SelectItem value="OBC">OBC</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="ST">ST</SelectItem>
            </SelectContent>
          </Select>
        </div>
          <div className="space-y-5 rounded-xl border p-5">
            <div>
              <h3 className="text-base font-semibold">
                Course Preferences
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Select your top 3 course preferences in order of priority.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Preference 1</p>
                {renderPreferenceSelect(0)}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Preference 2</p>
                {renderPreferenceSelect(1)}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Preference 3</p>
                {renderPreferenceSelect(2)}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleSubmit}>
              {isEdit ? "Update Student" : "Create Student"}
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}