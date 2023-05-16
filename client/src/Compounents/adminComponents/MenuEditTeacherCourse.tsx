import { ListBseUserIn, TeacherPrIn } from "../../Interfaces/TeachersIn";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "../../helpers/getCookie";
import Modal from "../Modal";
import CardProfileLi from "../CardProfileLi";
import { CourseIn } from "../../Interfaces/SubjectIn";
import MenuListTeachers from "./MenuListTeachers";

export default function MenuEditTeacherCourse({
    courseEdit,
    showMenu,
    setShowMenu,
  }: {
    courseEdit: CourseIn;
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
  }) {

    const [saveTeacherUpdate, setSaveTeacherUpdate] = useState<TeacherPrIn>({
      id: courseEdit.teacher.id,
      name: courseEdit.teacher.name,
      lastName: courseEdit.teacher.lastName,
      email: "",
      image: courseEdit.teacher.image,
      role: "teacher",
    });
    const token = getCookie("token")

    async function updateTeacher() {
      try {
        await axios.put(
          "http://localhost:3000/admin/updateteachercourse",
          {
            courseId: courseEdit.id,
            teacherId: saveTeacherUpdate.id,
          },
          {
            headers: {
              token,
            },
          }
        );
        alert("Maestro actulizada correctamente");
      } catch (e) {
        alert(e);
      }
    }

    function addTeacher(t : ListBseUserIn) {
      setSaveTeacherUpdate(t);
    }   
    
    return (
      <Modal
        showModal={showMenu}
        setShowModal={setShowMenu}
        actionModal={updateTeacher}
        title="Editar maestro"
        width={null}
        zindex="20"
      >
        <div>
          <div className="w-full mb-6 border-2 border-oceanBlue">
            <div className="w-full bg-oceanBlue text-white font-bold text-center">
              <span>Maestro seleccionado</span>
            </div>
            {saveTeacherUpdate.id != null &&
            saveTeacherUpdate.name != null &&
            saveTeacherUpdate.lastName != null &&
            saveTeacherUpdate.image != null ? (
              <CardProfileLi
                id={saveTeacherUpdate.id}
                name={saveTeacherUpdate.name}
                lastName={saveTeacherUpdate.lastName}
                image={saveTeacherUpdate.image}
              />
            ) : (
              <span>El maestro esta por asignarse</span>
            )}
          </div>
          <MenuListTeachers
            action={addTeacher}
          />
        </div>
      </Modal>
    );
  }