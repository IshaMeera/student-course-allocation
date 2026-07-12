export interface Course {
  _id: string;
  courseName: string;
  totalSeats: number;

  reservedSeats: {
    GENERAL: number;
    OBC: number;
    SC: number;
    ST: number;
  };

  filledSeats: {
    GENERAL: number;
    OBC: number;
    SC: number;
    ST: number;
  };
}

export interface CoursePayload {
  courseName: string;
  totalSeats: number;

  reservedSeats: {
    GENERAL: number;
    OBC: number;
    SC: number;
    ST: number;
  };
}