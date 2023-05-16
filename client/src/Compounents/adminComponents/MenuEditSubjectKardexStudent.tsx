import axios from "axios";
import { useContext, useState } from "react";
import { DataContextLogin } from "../../context/Context";
import { getCookie } from "../../helpers/getCookie";
import { KardexSubjectIn } from "../../Interfaces/KardexSubjectIn";
import { CourseIn, SubjectStudentIn } from "../../Interfaces/SubjectIn";
import CardProfileLi from "../CardProfileLi";
import Modal from "../Modal";
import MenuListCourses from "./MenuListCourses";
import TableCourse from "./TableCourse";

export default function MenuEditSubjectKardexStudent({
    showMenu,
    setShowMenu,
    zindex,
    subjectEdit,
    reloadData
} : {
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
    zindex?: string;
    subjectEdit: KardexSubjectIn;
    reloadData: () => void
}) {

    const {setIsLoading} = useContext(DataContextLogin)
  
    const [saveOldSubject, setSaveOldSubject] = useState<SubjectStudentIn | null>(null);
    const [saveNewSubject, setSaveNewSubject] = useState<SubjectStudentIn | null>(null);
    const token = getCookie("token")

      function addNewSubject(coruse: CourseIn) {
        if (
          saveOldSubject != null &&
          saveOldSubject.opportunity > 1 &&
          saveOldSubject.id != coruse.subject.id
        ) {
          return alert(
            "No puedes agregar materias distintas a la principal en segunda oportunidad"
          );
        }

        if (
          saveOldSubject != null &&
          saveOldSubject.opportunity == 1 &&
          subjectEdit.ratings.length > 1
        ) {
          return alert(
            "No puedes cambiar la materia principal cuadno tiene mas de 1 oportunidad. Si deseas cambiarla borra las materias en oportunidad mayores a 1 de la materia"
          );
        }

        return setSaveNewSubject({
          courseId: coruse.id,
          credits: coruse.subject.credits,
          date: null,
          id: coruse.period.id,
          name: coruse.subject.name,
          opportunity: 0,
          period: coruse.period,
          qualification: null,
          semester: coruse.team.semesterId,
          studentId: 0,
          team: coruse.team,
          teacher: coruse.teacher,
          subjectStudiedId: 0,
        });
      }

    async function sendChangesSubjects() {
      if (saveOldSubject == null || saveNewSubject == null) {
        return alert("No puedes hacer cambios vacios agrega materias");
      }
      try {
        setIsLoading(false)
        await axios.put(
          "http://localhost:3000/admin/updatecoursestudent",
          {
            subjecOld: saveOldSubject.courseId,
            subjectNew: saveNewSubject.courseId,
          },
          {
            headers: {
              token,
            },
          }
        );
        setIsLoading(true)
        alert("Cambio hecho correctamente");
        return reloadData()
      } catch (e) {
        setIsLoading(false)
        return alert(e);
      }
    }

    return (
      <Modal
        title="Editar materia"
        setShowModal={setShowMenu}
        showModal={showMenu}
        actionModal={sendChangesSubjects}
        zindex={zindex != undefined ? zindex : "10"}
        width="w-4/5"
      >
        <div>
          <div className="w-full bg-oceanBlue text-white text-xl p-1 rounded-t-md">
            Materia seleccionada
          </div>
          <TableCourse>
            {subjectEdit.ratings.map((r) => {
              /*Table courses of student per subject*/

              function addOldSubject() {
                if (
                  saveNewSubject != null &&
                  r.opportunity > 1 &&
                  saveNewSubject.id != subjectEdit.subjectId
                ) {
                  return alert(
                    "No puedes agregar materias distintas a la principal en segunda oportunidad"
                  );
                }

                if (r.opportunity == 1 && subjectEdit.ratings.length > 1) {
                  return alert(
                    "No puedes cambiar la materia principal cuadno tiene mas de 1 oportunidad. Si deseas cambiarla borra las materias en oportunidad mayores a 1 de la materia"
                  );
                }

                return setSaveOldSubject({
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
                  onClick={addOldSubject}
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
          <div className="w-full bg-oceanBlue text-white text-xl p-1 rounded-t-md">
            Materia anterior
          </div>
          <TableCourse>
            {saveOldSubject != null ? (
              <tr>
                <td>{saveOldSubject.courseId}</td>
                <td>{saveOldSubject.name}</td>
                <td>{saveOldSubject.credits}</td>
                <td>
                  {saveOldSubject.teacher.id != null &&
                  saveOldSubject.teacher.name != null &&
                  saveOldSubject.teacher.lastName != null &&
                  saveOldSubject.teacher.image != null ? (
                    <CardProfileLi
                      id={saveOldSubject.teacher.id}
                      name={saveOldSubject.teacher.name}
                      lastName={saveOldSubject.teacher.lastName}
                      image={saveOldSubject.teacher.image}
                    />
                  ) : (
                    <span>El maestro esta por asignarse</span>
                  )}
                </td>
                <td>{saveOldSubject.team.name}</td>
                <td>{saveOldSubject.period.typeOfPeriod}</td>
                <td>{saveOldSubject.period.name}</td>
              </tr>
            ) : (
              <tr>No se ha seleccionado materia</tr>
            )}
          </TableCourse>
          <div className="w-full bg-oceanBlue text-white text-xl p-1 rounded-t-md">
            Materia nueva
          </div>
          <TableCourse>
            {saveNewSubject != null ? (
              <tr>
                <td>{saveNewSubject.courseId}</td>
                <td>{saveNewSubject.name}</td>
                <td>{saveNewSubject.credits}</td>
                <td>
                  {saveNewSubject.teacher.id != null &&
                  saveNewSubject.teacher.name != null &&
                  saveNewSubject.teacher.lastName != null &&
                  saveNewSubject.teacher.image != null ? (
                    <CardProfileLi
                      id={saveNewSubject.teacher.id}
                      name={saveNewSubject.teacher.name}
                      lastName={saveNewSubject.teacher.lastName}
                      image={saveNewSubject.teacher.image}
                    />
                  ) : (
                    <span>El maestro esta por asignarse</span>
                  )}
                </td>
                <td>{saveNewSubject.team.name}</td>
                <td>{saveNewSubject.period.typeOfPeriod}</td>
                <td>{saveNewSubject.period.name}</td>
              </tr>
            ) : (
              <tr>No se ha seleccionado materia</tr>
            )}
          </TableCourse>
          <div className="w-full bg-oceanBlue text-white text-xl p-1 rounded-t-md">
            Lista de cursos
          </div>
            <MenuListCourses
                action={addNewSubject}
            />
        </div>
      </Modal>
    );
  }

