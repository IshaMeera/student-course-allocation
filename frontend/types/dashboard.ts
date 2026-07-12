export interface DashboardData {
  cards: {
    totalStudents: number;
    allocatedStudents: number;
    unallocatedStudents: number;
    totalCourses: number;
  };

  courseStatistics: {
    courseId: string;
    courseName: string;
    totalSeats: number;
    filledSeats: number;
    availableSeats: number;
    allocatedStudents: number;
  }[];

  categorySummary: {
    GENERAL: number;
    OBC: number;
    SC: number;
    ST: number;
  };
}