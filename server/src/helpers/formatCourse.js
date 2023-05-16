import { poolSiia } from "../dB.js";

export const formatCourse = (listCourses) => {
  const listCoursesFormat = [];
  for (let i = 0; i < listCourses.length; i++) {
    let courseItem = listCourses[i];
    const courseFormat = {
      id: courseItem.subjectCourseId,
      typeOfGroup: courseItem.typeOfGroup,
      subject: {
        id: courseItem.subjectId,
        credits: courseItem.subjectCredits,
        name: courseItem.subjectName,
      },
      teacher: {
        id: courseItem.teacherId,
        name: courseItem.teacherName,
        lastName: courseItem.teacherLastName,
        image: courseItem.teacherImage,
      },
      team: {
        id: courseItem.teamId,
        name: courseItem.teamName,
        semester: courseItem.teamSemester,
      },
      period: {
        id: courseItem.periodId,
        name: courseItem.periodName,
        startDate: courseItem.periodStartDate,
        endDate: courseItem.periodEndDate,
        typeOfPeriod: courseItem.typeOfPeriod,
      },
      schedule: courseItem.schedules,
    };

    listCoursesFormat.push(courseFormat);
  }

  return listCoursesFormat;
};

export const addSchedulesCourse = async (listCourses) => {
  const listCoursesAddSchedule = listCourses;

  for (let i = 0; i < listCourses.length; i++) {
    const course = listCoursesAddSchedule[i];
    course.schedules = [];
    try {
      const [getSchedule] = await poolSiia.query(
        "SELECT * FROM schedule_subjects WHERE subject_course_id = ?",
        [course.subjectCourseId]
      );

      if (getSchedule.length > 0) {
        const formatSchedule = formatHoursSchedule(getSchedule)

        course.schedules = formatSchedule;
      }
    } catch (e) {
      throw e;
    }
  }

  return listCoursesAddSchedule;
};

const formatHoursSchedule = (listSchedules) => {
  const listSchedulesFormat = [
    {
      name: "lunes",
      rows: [],
    },
    {
      name: "martes",
      rows: [],
    },
    {
      name: "miercoles",
      rows: [],
    },
    {
      name: "jueves",
      rows: [],
    },
    {
      name: "viernes",
      rows: [],
    },
    {
      name: "sabado",
      rows: [],
    },
    {
      name: "domingo",
      rows: [],
    },
  ];

  for (let i = 0; i < listSchedulesFormat.length; i++) {
    const hourRow = listSchedulesFormat[i];

    for (let y = 0; y < listSchedules.length; y++) {
      const scheduleRow = listSchedules[y];

      if (
        hourRow.name.toLocaleLowerCase() == scheduleRow.day.toLocaleLowerCase()
      ) {
        listSchedulesFormat[i].rows.push({
          id: scheduleRow.id,
          startTime: scheduleRow.start_time,
          endTime: scheduleRow.end_time,
          courseId: scheduleRow.subject_course_id,
        });
      }
    }
  }

  return listSchedulesFormat
};
