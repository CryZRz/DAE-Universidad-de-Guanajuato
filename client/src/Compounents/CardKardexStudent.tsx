import axios from "axios";
import { useEffect, useState } from "react";
import { KardexSubjectIn } from "../Interfaces/KardexSubjectIn";
import { getCookie } from "../helpers/getCookie";
import LoadingSection from "./LoadingSection";
import { formatTimeDate } from "../helpers/formatTime";
import { deafultKardexSubjectStudent } from "../helpers/dataDeafult";
import TableCardKardexStudent from "./TableCardKardexStudent";

export default function CardKardexStudent() {
  const [saveKardex, setSaveKardex] = useState<KardexSubjectIn[]>([
    deafultKardexSubjectStudent,
  ]);
  const [loadKardex, setLoadKardex] = useState(false);
  const token = getCookie("token");

  useEffect(() => {
    async function getKardex() {
      try {
        const reqKardex = await axios.get(
          "http://localhost:3000/subjects/studied",
          {
            headers: {
              token,
            },
          }
        );
        setSaveKardex(reqKardex.data);
        setLoadKardex(true);
        console.log(reqKardex);
      } catch (e) {
        alert(e);
      }
    }

    getKardex();
  }, []);

  return (
    <div className="w-full">
      {loadKardex ? (
        <div className="relative overflow-x-auto mt-4 pb-12">
          <div className="w-11/12 mx-auto">
          <TableCardKardexStudent>
            {saveKardex.map((s) => {
              return (
                <tr
                  key={s.subjectCourseId}
                  className="bg-white dark:bg-gray-800"
                >
                  <td className="px-6 py-4">{s.subjectId}</td>
                  <td className="px-6 py-4">{s.subjectName}</td>
                  <td className="px-6 py-4">{s.subjectCredits}</td>
                  {s.ratings.map((q) => {
                    return (
                      <>
                        <td className="px-6 py-4">
                          {q.date != null ? (
                            <span>{formatTimeDate(q.date)}</span>
                          ) : (
                            <span>Pendiente</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {q.qualification != null ? (
                            <span>{q.qualification}</span>
                          ) : (
                            <span>Pendiente</span>
                          )}
                        </td>
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </TableCardKardexStudent>
          </div>
        </div>
      ) : (
        <LoadingSection />
      )}
    </div>
  );
}
