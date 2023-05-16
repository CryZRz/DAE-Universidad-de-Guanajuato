import axios from "axios";
import { useState, useEffect } from "react";
import { getCookie } from "../../helpers/getCookie";
import { SubjectIn } from "../../Interfaces/SubjectIn";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";
import TableSubject from "../TableSubject";

export default function MenuListSubjects({action} : {action : (p: SubjectIn) => void}) {

  const [loadListSubjects, setLoadListSubjects] = useState(false);
  const [saveListSubjects, setSaveListSubjects] = useState<SubjectIn[] | []>();
  const token = getCookie("token");

  async function getListSubjects(start: number, end: number) {
    try {
      setLoadListSubjects(false);
      const listSubjects = await axios.get(
        `http://localhost:3000/admin/subjects/?start=${start}&end=${end}`,
        {
          headers: {
            token,
          },
        }
      );
      setSaveListSubjects(listSubjects.data);
      setLoadListSubjects(true);
      console.log(listSubjects.data);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListSubjects(0, 10);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full bg-oceanBlue text-white font-bold text-center">
        <span>Materia seleccionada</span>
      </div>
      {loadListSubjects ? (
        <TableSubject>
          {saveListSubjects?.map((s) => {
            function addSubject() {
              action(s);
            }

            return (
              <tr
                key={s.id}
                className="hover:bg-orangeLight cursor-pointer"
                onClick={addSubject}
              >
                <td className="p-1">{s.id}</td>
                <td className="p-1">{s.name}</td>
                <td className="p-1">{s.credits}</td>
                <td className="p-1">{s.semesterId}</td>
              </tr>
            );
          })}
        </TableSubject>
      ) : (
        <LoadingSection />
      )}
      <Pagination
        start={0}
        end={10}
        fetchingData={getListSubjects}
        isLoading={!loadListSubjects}
      />
    </div>
  );
}
