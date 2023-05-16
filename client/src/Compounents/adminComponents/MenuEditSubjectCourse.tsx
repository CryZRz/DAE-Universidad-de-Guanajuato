import axios from "axios";
import { useState } from "react";
import { getCookie } from "../../helpers/getCookie";
import { CourseIn, SubjectIn } from "../../Interfaces/SubjectIn";
import Modal from "../Modal";
import TableSubject from "../TableSubject";
import MenuListSubjects from "./MenuListSubjects";

export default function MenuEditSubjectCourse({
    courseEdit,
    showMenu,
    setShowMenu,
  }: {
    courseEdit: CourseIn;
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
  }) {

    const [saveSubjectEdit, setSaveSubjectEdit] = useState<SubjectIn>({
      id: courseEdit.subject.id,
      name: courseEdit.subject.name,
      credits: courseEdit.subject.credits,
      semesterId: 0,
    });
    const token = getCookie("token")

    async function updateSubject() {
      try {
        await axios.put(
          "http://localhost:3000/admin/updatesubjectcourse",
          {
            courseId: courseEdit.id,
            subjectId: saveSubjectEdit.id,
          },
          {
            headers: {
              token,
            },
          }
        );
        alert("Materia actulizada correctamente");
      } catch (e) {
        alert(e);
      }
    }

    function addSubject(subject: SubjectIn) {
      setSaveSubjectEdit(subject);
    }

    return (
      <Modal
        showModal={showMenu}
        setShowModal={setShowMenu}
        actionModal={updateSubject}
        title="Editar Maestro"
        width={null}
        zindex="20"
      >
        <div>
          <div className="w-full mb-4">
            <div className="w-full bg-oceanBlue text-white font-bold text-center">
              <span>Materia seleccionada</span>
            </div>
            <TableSubject>
              <tr>
                <td>{saveSubjectEdit.id}</td>
                <td>{saveSubjectEdit.name}</td>
                <td>{saveSubjectEdit.credits}</td>
                <td>{saveSubjectEdit.semesterId}</td>
              </tr>
            </TableSubject>
          </div>
          <MenuListSubjects
            action={addSubject}
          />
        </div>
      </Modal>
    );
  }