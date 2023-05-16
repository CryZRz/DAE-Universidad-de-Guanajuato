import axios from "axios";
import { useContext, useState } from "react";
import { DataContextLogin } from "../../context/Context";
import { formatTimeDate } from "../../helpers/formatTime";
import { getCookie } from "../../helpers/getCookie";
import { KardexSubjectIn } from "../../Interfaces/KardexSubjectIn";
import PeriodIn from "../../Interfaces/PeriodIn";
import { ListBseUserIn } from "../../Interfaces/TeachersIn";
import CardProfileLi from "../CardProfileLi";
import Modal from "../Modal";
import TablePeriod from "../TablePeriod";
import MenuListPeriods from "./MenuListPeriods";
import MenuListTeachers from "./MenuListTeachers";

export default function MenuAddOpKardexStudent({
    showMenu,
    setShowMenu,
    zindex,
    subjectEdit,
    reloadData
}: {
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
    zindex?: string;
    subjectEdit: KardexSubjectIn;
    reloadData: () => void
}) {

    const {setIsLoading} = useContext(DataContextLogin)

    const indexLastRaiting = subjectEdit.ratings.length - 1;
    const itemSubjectEdit = subjectEdit.ratings[indexLastRaiting];

    const [saveTeacherOp, setSaveTeacherOp] = useState({
      id: itemSubjectEdit.teacher.id,
      name: itemSubjectEdit.teacher.name,
      lastName: itemSubjectEdit.teacher.lastName,
      image: itemSubjectEdit.teacher.image,
      email: "",
      role: "",
    });
    const [savePeriodOp, setSavePeriodOp] = useState<PeriodIn | null>(null);
    const token = getCookie("token")

    function addPeriodOp(period: PeriodIn) {
        setSavePeriodOp(period);
    }

    function addTeacherOp(teacher: ListBseUserIn) {
        setSaveTeacherOp(teacher);
      }

    async function addOpportunity() {
      if (saveTeacherOp == null || savePeriodOp == null) {
        return alert("Debes agregar una materia o periodo");
      }

      const saveDataOp = {
        subjectId: subjectEdit.subjectId,
        courseSubjectId: subjectEdit.subjectCourseId,
        studentId: subjectEdit.studentId,
        teacherId: saveTeacherOp.id,
        opportunity: itemSubjectEdit.opportunity + 1,
        periodId: savePeriodOp != null ? savePeriodOp.id : 0,
      };

      try {
        setIsLoading(false)
        await axios.post(
          "http://localhost:3000/admin/saveopportunity",
          saveDataOp,
          {
            headers: {
              token,
            },
          }
        );
        setIsLoading(true)
        alert("oportunidad hecha correctamente");
        return reloadData()
      } catch (e) {
        setIsLoading(false)
        return alert(e);
      }
    }

    return (
      <Modal
        showModal={showMenu}
        setShowModal={setShowMenu}
        title="Asignar oportunidad"
        width={null}
        actionModal={addOpportunity}
        zindex={zindex != undefined ? zindex : "10"}
      >
        <div>
          <div className="w-full bg-oceanBlue text-white mt-2 font-bold p-1">
            <h3>Maestro seleccionado</h3>
          </div>
          <div className="shadow w-full">
            {saveTeacherOp.id != null &&
            saveTeacherOp.name != null &&
            saveTeacherOp.lastName != null &&
            saveTeacherOp.image != null ? (
              <CardProfileLi
                id={saveTeacherOp.id}
                name={saveTeacherOp.name}
                lastName={saveTeacherOp.lastName}
                image={saveTeacherOp.image}
              />
            ) : (
              <span>El maestro esta por asignarse</span>
            )}
          </div>
          <div className="w-full bg-oceanBlue text-white mt-4 font-bold p-1">
            <h3>Periodo seleccionado</h3>
          </div>
          <TablePeriod>
          {savePeriodOp != null ? (
                <tr key={savePeriodOp.id} className="cursor-pointer">
                  <td>{savePeriodOp.id}</td>
                  <td className="p-2 text-oceanBlue">{savePeriodOp.name}</td>
                  <td className="p-2 text-oceanBlue">
                    {formatTimeDate(savePeriodOp.startDate)}
                  </td>
                  <td className="p-2 text-oceanBlue">
                    {formatTimeDate(savePeriodOp.endDate)}
                  </td>
                  <td className="p-2 text-oceanBlue">
                    {savePeriodOp.typeOfPeriod}
                  </td>
                </tr>
              ) : (
                <tr>No seleccionado</tr>
              )}
          </TablePeriod>
          <div className="w-full bg-oceanBlue text-white mt-4 font-bold p-1">
            <h3>Selecione un periodo</h3>
          </div>
          <MenuListPeriods
                action={addPeriodOp}
                regularization={true}
            />
          <div className="w-full bg-oceanBlue text-white mt-4 font-bold p-1">
            <h3>Selecione un maestro</h3>
          </div>
          <MenuListTeachers
            action={addTeacherOp}
          />
        </div>
      </Modal>
    );
  }