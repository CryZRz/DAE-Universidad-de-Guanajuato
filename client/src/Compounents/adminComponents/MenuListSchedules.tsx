import axios from "axios";
import { useEffect, useState } from "react";
import { defaultEschedule } from "../../helpers/dataDeafult/schedule";
import { getCookie } from "../../helpers/getCookie";
import { ScheduleIn } from "../../Interfaces/ScheduleIn";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";
import TableSchedules from "./TableSchedules";

export default function MenuListSchedules() {
  const [saveListSchedules, setSaveListSchedules] = useState<ScheduleIn[]>([
    defaultEschedule,
  ]);
  const [loadListSchedules, setLoadListSchedules] = useState(false);
  const token = getCookie("token");

  async function getListSchedules(start: number, end: number) {
    try {
      setLoadListSchedules(false);
      const listSchedules = await axios.get(
        `http://localhost:3000/admin/schedules?start=${start}&end=${end}`,
        {
          headers: {
            token,
          },
        }
      );
      setSaveListSchedules(listSchedules.data);
      setLoadListSchedules(true);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListSchedules(0, 10);
  }, []);

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto">
        {loadListSchedules ? (
          <TableSchedules>
            {saveListSchedules.map((s) => {
              return (
                <tr key={s.id}>
                  <td className="p-1">{s.id}</td>
                  <td className="p-1">{s.day}</td>
                  <td className="p-1">{s.startTime}</td>
                  <td className="p-1">{s.endTime}</td>
                  <td className="p-1">
                    <button className="bg-orangeLight p-1 rounded text-white">Ver curso: {s.courseId}</button>
                  </td>
                </tr>
              );
            })}
          </TableSchedules>
        ) : (
          <LoadingSection />
        )}
        <Pagination
          start={0}
          end={10}
          fetchingData={getListSchedules}
          isLoading={!loadListSchedules}
        />
      </div>
    </div>
  );
}
