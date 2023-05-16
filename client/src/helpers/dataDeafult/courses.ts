import { CourseIn } from "../../Interfaces/SubjectIn";

export const defaultCourse: CourseIn = {
  id: 0,
  typeOfGroup: "",
  subject: {
    id: 0,
    courseId: 0,
    credits: 0,
    name: "",
  },
  teacher: {
    id: null,
    name: null,
    lastName: null,
    image: null,
  },
  team: {
    id: 0,
    name: "",
    semesterId: 0,
  },
  period: {
    id: 0,
    name: "",
    startDate: "",
    endDate: "",
    typeOfPeriod: "",
  },
  schedule: [{
    name: "",
    rows: [{
      id: 0,
      startTime: "",
      endTime: "",
      courseId: 0
    }]
  }]
};
