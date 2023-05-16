import axios from "axios";
import { useState, useEffect } from "react";
import { defaultTeam } from "../../helpers/dataDeafult/team";
import { getCookie } from "../../helpers/getCookie";
import { TeamIn } from "../../Interfaces/SubjectIn";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";
import TableTeam from "../TableTeam";

export default function MenuListTeams({action} : {action : (p : TeamIn) => void}) {

  const [loadListTeams, setLoadListTeams] = useState(false);
  const [saveListTeams, setSaveListTeams] = useState<TeamIn[]>([defaultTeam]);
  const token = getCookie("token");

  async function getListTeams(start: number, end: number) {
    try {
      setLoadListTeams(false);
      const listTeams = await axios.get(
        `http://localhost:3000/admin/teams?start=${start}&end=${end}`,
        {
          headers: {
            token,
          },
        }
      );
      setSaveListTeams(listTeams.data);
      setLoadListTeams(true);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListTeams(0, 10);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full bg-oceanBlue text-white font-bold text-center">
        <span>Grupo seleccionado</span>
      </div>
      {loadListTeams ? (
        <div>
          <TableTeam>
            {saveListTeams.map((t) => {

              function addTeam() {
                action(t);
              }

              return (
                <tr
                  key={t.id}
                  className="hover:bg-orangeLight cursor-pointer"
                  onClick={addTeam}
                >
                  <td className="p-1">{t.id}</td>
                  <td className="p-1">{t.name}</td>
                  <td className="p-1">{t.semesterId}</td>
                </tr>
              );
            })}
          </TableTeam>
        </div>
      ) : (
        <LoadingSection />
      )}
      <Pagination
        start={0}
        end={10}
        isLoading={!loadListTeams}
        fetchingData={getListTeams}
      />
    </div>
  );
}
