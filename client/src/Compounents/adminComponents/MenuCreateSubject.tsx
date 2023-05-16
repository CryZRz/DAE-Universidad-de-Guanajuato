import axios from "axios";
import { ChangeEvent, useState } from "react";
import { getCookie } from "../../helpers/getCookie";
import { SubjectIn } from "../../Interfaces/SubjectIn";
import Modal from "../Modal";

export default function MenuCreateSubject({
  showMenu,
  setShowMenu,
  subjectEdit,
  setSubjectEdit
}: {
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
  subjectEdit?: SubjectIn;
  setSubjectEdit?: (s: SubjectIn) => void
}) {
  const [saveNameSubject, setSaveNameSubject] = useState("");
  const [saveCreditsSubject, setSaveCreditsSubject] = useState(0);
  const [saveSemesterSubject, setSaveSemesterSubject] = useState(0);
  const token = getCookie("token");

  function saveName({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    if (setSubjectEdit != undefined && subjectEdit != undefined) {
      setSubjectEdit({...subjectEdit, ["name"] : value})
    }else{
      setSaveNameSubject(value);
    }
  }

  function saveCredits({ target: { value } }: ChangeEvent<HTMLInputElement>) {
     if (setSubjectEdit != undefined && subjectEdit != undefined) {
      setSubjectEdit({...subjectEdit, ["credits"] : parseInt(value)})
     }else{
      setSaveCreditsSubject(parseInt(value));
     }
  }

  function saveSemester({ target: { value } }: ChangeEvent<HTMLSelectElement>) {
    if (setSubjectEdit != undefined && subjectEdit != undefined) {
      setSubjectEdit({...subjectEdit, ["semesterId"] : parseInt(value)})
     }else{
      setSaveSemesterSubject(parseInt(value));
     }
  }

  async function createSubject() {
    try {
      await axios.post(
        "http://localhost:3000/admin/createsubject",
        {
          subjectName: saveNameSubject,
          subjectCredits: saveCreditsSubject,
          subjectSemester: saveSemesterSubject,
        },
        {
          headers: {
            token,
          },
        }
      );
      alert("Materia creada correctamente");
    } catch (e) {
      alert(e);
    }
  }

  async function editSubject() {
    if (subjectEdit != undefined) {
      try {
        await axios.put(
          "http://localhost:3000/admin/editsubject",
          {
            subjectName: subjectEdit.name,
            subjectCredits: subjectEdit.credits,
            subjectSemester: subjectEdit.semesterId,
            subjectId: subjectEdit.id
          },
          {
            headers: {
              token,
            },
          }
        );
        alert("Materia actualizada correctamente");
      } catch (e) {
        alert(e);
      }
    }
  }

  async function deleteSubject() {
    if (subjectEdit != undefined) {
      try {
        await axios.delete("http://localhost:3000/admin/deletesubject", {
          data: {
            subjectId: subjectEdit.id,
          },
          headers: {
            token,
          },
        });
        alert("materia eliminada correctamente")
      } catch (e) {
        alert(e);
      }
    }
  }

  function validateSubject() {
    if (subjectEdit != undefined) {
      if (subjectEdit.name == "") {
        return alert("No puedes crear materias sin nombre");
      } else if (subjectEdit.credits <= 0 || subjectEdit.semesterId <= 0) {
        return alert("no pudes crear materias con creditos 0 o semestre 0");
      } else {
        editSubject();
      }
    }else{
      if (saveNameSubject == "") {
        return alert("No puedes crear materias sin nombre");
      } else if (saveCreditsSubject <= 0 || saveSemesterSubject <= 0) {
        return alert("no pudes crear materias con creditos 0 o semestre 0");
      } else {
        createSubject();
      }
    }
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={validateSubject}
      width={null}
      title={
        subjectEdit != undefined ? "Editar materia" : "Crear nueva materia"
      }
      zindex="10"
    >
      <div>
        <form>
          <div className="mb-2">
            <label htmlFor="name">Nombre: </label>
            <input
              type="text"
              name="name"
              onChange={saveName}
              className="w-full border-orangeLight border outline-none"
              defaultValue={subjectEdit != undefined ? subjectEdit.name : ""}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="credits">Creditos: </label>
            <input
              type="number"
              name="credits"
              onChange={saveCredits}
              className="w-full border-orangeLight border outline-none"
              defaultValue={subjectEdit != undefined ? subjectEdit.credits : ""}
            />
          </div>
          <div>
            <label htmlFor="semester">Semestre: </label>
            <select
              onChange={saveSemester}
              className="w-full border-orangeLight border outline-none"
              defaultValue={
                subjectEdit != undefined ? subjectEdit.semesterId : ""
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </form>
        {subjectEdit != undefined ? (
          <div className="w-full mt-6">
            <button
              className="w-full bg-orangeLight text-white p-1"
              onClick={(e) => {
                deleteSubject();
              }}
            >
              Eliminar materia
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}
