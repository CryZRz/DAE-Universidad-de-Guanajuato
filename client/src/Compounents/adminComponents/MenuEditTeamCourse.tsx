import axios from "axios";
import { useState } from "react";
import { getCookie } from "../../helpers/getCookie";
import { CourseIn, TeamIn } from "../../Interfaces/SubjectIn";
import Modal from "../Modal";;
import TableTeam from "../TableTeam";
import MenuListTeams from "./MenuListTeams";

export default function MenuEditTeamCourse({
  courseEdit,
  showMenu,
  setShowMenu,
}: {
  courseEdit: CourseIn;
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
}) {

  const [saveTeamUpdate, setSaveTeamUpdate] = useState<TeamIn>({
    id: courseEdit.team.id,
    name: courseEdit.team.name,
    semesterId: courseEdit.team.semesterId,
  });
  const token = getCookie("token");

  async function editTeamCourse(){
    try {
        await axios.put("http://localhost:3000/admin/updateteamcourse",{
            courseId: courseEdit.id,
            teamId: saveTeamUpdate.id
        },{
            headers:{
                token
            }
        })
        alert("Grupo actualizado correctamente")
    } catch (e) {
        alert(e)
    }
  }

  function addTeam(team: TeamIn) {
    setSaveTeamUpdate(team);
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={editTeamCourse}
      title="Editar grupo"
      width={null}
      zindex="20"
    >
      <div>
        <div className="mb-6">
          <div className="w-full bg-oceanBlue text-white font-bold text-center">
            <span>Grupo seleccionado</span>
          </div>
          <TableTeam>
            <tr>
              <td>{saveTeamUpdate.id}</td>
              <td>{saveTeamUpdate.name}</td>
              <td>{saveTeamUpdate.semesterId}</td>
            </tr>
          </TableTeam>
        </div>
        <div>
          <MenuListTeams
            action={addTeam}
          />
        </div>
      </div>
    </Modal>
  );
}
