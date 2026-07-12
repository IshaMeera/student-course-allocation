export interface Course {
  _id: string;
  courseName: string;
  totalSeats: number;
}

export interface Student {
  _id: string;
  studentId: string;
  name: string;
  marks: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";

  preferences: Course[];

  allocatedCourse: Course | null;

  allocatedPreference: number;

  allocatedStatus: "Allocated" | "Not Allocated";

  applicationDate: string;

  allocatedDate?: string;
}

export interface StudentPayload {
  studentId?: string;
  name: string;
  marks: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";
  preferences: string[];
}