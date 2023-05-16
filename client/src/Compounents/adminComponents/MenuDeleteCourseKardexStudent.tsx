import axios from "axios";
import {useContext, useState} from "react";
import { DataContextLogin } from "../../context/Context";
import { getCookie } from "../../helpers/getCookie";
import { KardexSubjectIn } from "../../Interfaces/KardexSubjectIn";
import { SubjectStudentIn } from "../../Interfaces/SubjectIn";
import CardProfileLi from "../CardProfileLi";
import Modal from "../Modal";
import TableCourse from "./TableCourse";

export default function MenuDeleteCourseKardexStudent({
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

  const [saveDeleteSubject, setSaveDeleteSubject] = useState<SubjectStudentIn | null>(null);
  const token = getCookie("token")

  async function deteleCourseStudent() {
    if (saveDeleteSubject == null) {
      return alert("Debes elegir una materia para borrar");
    }
    try {
    setIsLoading(false)
      await axios.delete("http://localhost:3000/admin/deletecoursestudent", {
        data: {
          subjectStudiedId: saveDeleteSubject.subjectStudiedId,
        },
        headers: {
          token,
        },
      });
      setIsLoading(true)
      alert("Materia elimada correctamente");
      return reloadData();
    } catch (e) {
        setIsLoading(false)
      return alert(e);
    }
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={deteleCourseStudent}
      title="Eliminar materias"
      zindex={zindex != undefined ? zindex : "10"}
      width="w-4/5"
    >
      <div>
        <TableCourse>
          {subjectEdit.ratings.map((r) => {
            /*Table courses of student per subject*/

            function addDeleteSubject() {
              if (r.opportunity < subjectEdit.ratings.length) {
                return alert(
                  "No puedes borrar la primera oportunidad cuando hay mas de 1 oportunidad"
                );
              }

              return setSaveDeleteSubject({
                courseId: r.courseId,
                credits: subjectEdit.subjectCredits,
                date: r.date,
                id: subjectEdit.subjectId,
                name: subjectEdit.subjectName,
                opportunity: r.opportunity,
                period: r.period,
                qualification: r.qualification,
                semester: 0,
                studentId: subjectEdit.studentId,
                team: r.team,
                teacher: r.teacher,
                subjectStudiedId: r.id,
              });
            }

            return (
              <tr
                onClick={addDeleteSubject}
                className="hover:bg-orangeLight cursor-pointer"
                key={r.id}
              >
                <td className="p-2">{r.courseId}</td>
                <td className="p-2">{subjectEdit.subjectName}</td>
                <td className="p-2">{subjectEdit.subjectCredits}</td>
                <td className="p-2">
                  {r.teacher.id != null &&
                  r.teacher.name != null &&
                  r.teacher.lastName != null &&
                  r.teacher.image != null ? (
                    <CardProfileLi
                      id={r.teacher.id}
                      name={r.teacher.name}
                      lastName={r.teacher.lastName}
                      image={r.teacher.image}
                    />
                  ) : (
                    <span>El maestro esta por asignarse</span>
                  )}
                </td>
                <td className="p-2">{r.team.name}</td>
                <td className="p-2">{r.typeOfGroup}</td>
                <td className="p-2">{r.period.name}</td>
              </tr>
            );
          })}
        </TableCourse>
        <TableCourse>
          {saveDeleteSubject != null ? (
            <tr>
              <td>{saveDeleteSubject.courseId}</td>
              <td>{saveDeleteSubject.name}</td>
              <td>{saveDeleteSubject.credits}</td>
              <td>
                {saveDeleteSubject.teacher.id != null &&
                saveDeleteSubject.teacher.name != null &&
                saveDeleteSubject.teacher.lastName != null &&
                saveDeleteSubject.teacher.image != null ? (
                  <CardProfileLi
                    id={saveDeleteSubject.teacher.id}
                    name={saveDeleteSubject.teacher.name}
                    lastName={saveDeleteSubject.teacher.lastName}
                    image={saveDeleteSubject.teacher.image}
                  />
                ) : (
                  <span>El maestro esta por asignarse</span>
                )}
              </td>
              <td>{saveDeleteSubject.team.name}</td>
              <td>{saveDeleteSubject.period.typeOfPeriod}</td>
              <td>{saveDeleteSubject.period.name}</td>
            </tr>
          ) : (
            <tr>No se ha seleccionado materia</tr>
          )}
        </TableCourse>
      </div>
    </Modal>
  );
}
