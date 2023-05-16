import axios from "axios";
import { useState } from "react";
import { formatTimeDate } from "../../helpers/formatTime";
import { getCookie } from "../../helpers/getCookie";
import PeriodIn from "../../Interfaces/PeriodIn";
import { CourseIn } from "../../Interfaces/SubjectIn";
import { ListBseUserIn } from "../../Interfaces/TeachersIn";
import Modal from "../Modal";
import TablePeriod from "../TablePeriod";
import MenuListPeriods from "./MenuListPeriods";

export default function MenuEditPeriodCourse({
  courseEdit,
  showMenu,
  setShowMenu,
  lisStudentsCourse,
}: {
  courseEdit: CourseIn;
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
  lisStudentsCourse: ListBseUserIn[];
}) {
  const [savePeriodEdit, setSavePeriodEdit] = useState<PeriodIn>({
    id: courseEdit.period.id,
    name: courseEdit.period.name,
    startDate: courseEdit.period.startDate,
    endDate: courseEdit.period.endDate,
    typeOfPeriod: courseEdit.period.typeOfPeriod,
  });
  const token = getCookie("token");

  async function updatePeriod() {
    try {
      await axios.put(
        "http://localhost:3000/admin/updateperiodcourse",
        {
          courseId: courseEdit.id,
          periodId: savePeriodEdit.id,
        },
        {
          headers: {
            token,
          },
        }
      );
      alert("Periodo actualizado correctamente");
    } catch (e) {
      alert(e);
    }
  }

  function addPeriod(period: PeriodIn) {
    if (
      savePeriodEdit.typeOfPeriod == "REGULARIZACION" &&
      period.typeOfPeriod == "CURSO" &&
      lisStudentsCourse.length > 0
    ) {
      return alert(
        "No puedes cambiar un periodo de regularizacion a ordinario cuando ya hay alumnos inscritos"
      );
    }
    if (
      period.typeOfPeriod == "REGULARIZACION" &&
      savePeriodEdit.typeOfPeriod == "CURSO" &&
      lisStudentsCourse.length > 0
    ) {
      alert(
        "La accion que vas a hacer es muy peligrosa por que ya hay alumnos en este curso OORDINARIO y lo vas a cambiar a regularizacion verifica que los alumnos inscritos al curso esten en segunda oportunidad :)"
      );
    }

    setSavePeriodEdit(period);
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={updatePeriod}
      title="Editar Periodo"
      width={null}
      zindex="20"
    >
      <div>
        <div className="w-full mb-6">
          <TablePeriod>
            <tr>
              <td className="p-1">{savePeriodEdit.id}</td>
              <td className="p-1">{savePeriodEdit.name}</td>
              <td className="p-1">
                {formatTimeDate(savePeriodEdit.startDate)}
              </td>
              <td className="p-1">{formatTimeDate(savePeriodEdit.endDate)}</td>
              <td className="p-1">{savePeriodEdit.typeOfPeriod}</td>
            </tr>
          </TablePeriod>
        </div>
        <div className="w-full mb-2">
          <MenuListPeriods action={addPeriod} />
        </div>
      </div>
    </Modal>
  );
}
