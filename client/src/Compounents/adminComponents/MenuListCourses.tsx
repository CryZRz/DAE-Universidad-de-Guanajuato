import axios from "axios";
import { useState, useEffect } from "react";
import { defaultCourse } from "../../helpers/dataDeafult/courses";
import { getCookie } from "../../helpers/getCookie";
import { CourseIn } from "../../Interfaces/SubjectIn";
import CardProfileLi from "../CardProfileLi";
import Pagination from "../Pagination";
import TableCourse from "./TableCourse";

export default function MenuListCourses({
  action,
  start,
  end
}: {
  action: (p: CourseIn) => void;
  start?: number,
  end?: number
}) {
  const [listCourses, setListCourses] = useState<CourseIn[]>([defaultCourse]);
  const [loadListCourses, setLoadListCourses] = useState(false);
  const token = getCookie("token");

  async function getListCourses(start: number, end: number) {
    try {
      setLoadListCourses(false);
      const reqListPeriods = await axios.get(
        `http://localhost:3000/admin/courses?start=${start}&end=${end}`,
        {
          headers: {
            token,
          },
        }
      );
      setListCourses(reqListPeriods.data);
      setLoadListCourses(true);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    if (start != undefined && end != undefined) {
        getListCourses(start, end)
    }else{
        getListCourses(0, 10)
    }

  }, []);

  return (
    <div>
      {
        loadListCourses && 
        <TableCourse>
        {listCourses.map((c) => {

            function actionSubject(){
                action(c)
            }

          return (
            <tr
              onClick={actionSubject}
              className="hover:bg-orangeLight cursor-pointer hover:text-white"
              key={c.id}
            >
              <td className="p-2">{c.id}</td>
              <td className="p-2">{c.subject.name}</td>
              <td className="p-2">{c.subject.credits}</td>
              <td className="p-2">
                {c.teacher.id != null &&
                c.teacher.name != null &&
                c.teacher.lastName != null &&
                c.teacher.image != null ? (
                  <CardProfileLi
                    id={c.teacher.id}
                    name={c.teacher.name}
                    lastName={c.teacher.lastName}
                    image={c.teacher.image}
                  />
                ) : (
                  <span>El maestro esta por asignarse</span>
                )}
              </td>
              <td>{c.team.name}</td>
              <td>{c.typeOfGroup}</td>
              <td>{c.period.name}</td>
            </tr>
          );
        })}
      </TableCourse>
      }
      <Pagination
        start={start != undefined ? start : 0}
        end={end != undefined ? end : 10}
        fetchingData={getListCourses}
        isLoading={!loadListCourses}
      />
    </div>
  );
}
