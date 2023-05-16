import PeriodIn from "./PeriodIn";
import { ScheduleTableIn } from "./ScheduleIn";

export interface SubjectStudentIn {
  id: number;
  date: string | null;
  opportunity: number;
  qualification: number | null | string;
  studentId: number;
  courseId: number;
  credits: number;
  name: string;
  semester: number;
  subjectStudiedId: number;
  period:{
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    typeOfPeriod: string;
  }
  teacher:{
    id: number | null;
    name: string | null;
    lastName: string | null;
    image: string | null;
  }
  team: TeamIn
}

export interface SubjectUpAndDownsIn {
  courseId: number;
  subjectStudiedId?: number;
  subjectId: number;
  teacherId: number | null;
  teacherName: string | null;
  teacherLastName: string | null;
  teacherImage: string | null;
  teamId: number;
  teamName: string;
  subjectName: string;
  credits: number;
  semesterId: number;
  schedules: ScheduleTableIn[] | [];
}

export interface SubjectKardexTeacherIn {
  subjectCourseId: number;
  subjectStudiedId: number;
  qualification: number | null | string;
  subjectName: string;
  subjectCredits: number;
  subjectId: number;
  opportunity: number;
  subjectSemesterId: number;
  studentId: number;
  studentName: string;
  studentLastName: string;
  studentImage: string;
  teamName: string;
  teamId: number;
}

export interface ListSubjectsIn {
  courseSubjectId: number;
  typeOfGroup: string;
  subjectId: number;
  subjectName: string;
  teamId: number;
  teamName: string;
  teacherId: number;
  teacherName: string;
  teacherLastName: string;
  teacherImage: string;
  qualification: string | null | number;
  opportunity: number;
  status: string;
}

export interface TeamIn {
  id: number;
  name: string;
  semesterId: number;
}

export interface CourseIn {
  id: number; 
  typeOfGroup: string;
  subject:{
    id: number;
    courseId: number;
    credits: number;
    name: string;
  }
  teacher:{
    id: number | null;
    name: string | null;
    lastName: string | null;
    image: string | null;
  }
  team: TeamIn
  period: PeriodIn
  schedule: ScheduleTableIn[]
}


export interface SubjectIn {
  id: number
  name: string
  credits: number
  semesterId: number
}