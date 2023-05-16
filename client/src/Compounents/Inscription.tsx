import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../helpers/getCookie";
import { SubjectIn } from "../Interfaces/SubjectIn";
import CardSubject from "./CardSubject";
import LoadingSection from "./LoadingSection";

export default function Inscription() {
  const listSubjectsExample = [
    {
      subjectCourseId: 0,
      subjectCredits: 0,
      subjectId: 0,
      subjectName: "",
      subjectTeamId: 0,
      subjectTeamName: "",
      teacherId: 0,
      teacherImage: "",
      teacherLastName: "",
      teacherName: "",
    },
  ];

  const [saveListSubjects, setSaveListSubjects] = useState<SubjectIn[]>(listSubjectsExample);
  const [listSubjectUp, setListSubjectUp] = useState<SubjectIn[] | []>([]);
  const [loadListPost, setLoadListPost] = useState(false);
  const token = getCookie("token");

  useEffect(() => {
    async function getSubjects() {
      try {
        const reqGetSubjects = await axios.get(
          "http://localhost:3000/subjects",
          {
            headers: {
              token,
            },
          }
        );
        console.log(reqGetSubjects.data);
        setSaveListSubjects(reqGetSubjects.data);
        setLoadListPost(true);
      } catch (e) {
        return alert(e);
      }
    }

    getSubjects();
  }, []);

  function downSubject(id: number) {
    const taskDown = listSubjectUp.filter((s) => s.subjectId == id);
    const taskUpdate = listSubjectUp.filter((s) => s.subjectId != id);
    setListSubjectUp(taskUpdate);
    setSaveListSubjects([...saveListSubjects, taskDown[0]]);
  }

  function updateSubject(id: number) {
    const taskUpdate = saveListSubjects.filter((s) => s.subjectId == id);
    const taskDown = saveListSubjects.filter((s) => s.subjectId != id);
    setListSubjectUp([...listSubjectUp, taskUpdate[0]]);
    setSaveListSubjects(taskDown);
  }

  async function sendSubjectChange(){
    if (listSubjectUp.length <= 0) {
      return alert("No puedes enviar dar de alta materias vacias")
    }else{
      try {
        await axios.post("http://localhost:3000/save/inscription", {
          listSubjects: listSubjectUp 
        },{
          headers: {
            token
          }
        })
        alert("Inscripcion hecha correctamente")
      } catch (e) {
        alert(e)
      }
    }
  } 

  return (
    <div className="mt-12">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-lg">
                Clave
              </th>
              <th scope="col" className="px-6 py-3">
                Materia
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                Creditos
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                Maestro
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                Grupo
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                Add
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {loadListPost ? (
              saveListSubjects.map((s) => {
                return (
                  <CardSubject
                    courseId={s.subjectCourseId}
                    subjectId={s.subjectId}
                    nameSubject={s.subjectName}
                    subjectCredits={s.subjectCredits}
                    teacherSubjectId={s.teacherId}
                    teacherSubjectName={s.teacherName}
                    teacherSubjectImage={s.teacherImage}
                    teacherSubjectlastName={s.teacherLastName}
                    teamId={s.subjectTeamId}
                    teamName={s.subjectTeamName}
                    changeStateDown={updateSubject}
                  />
                );
              })
            ) : (
              <LoadingSection />
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-12">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-l-lg">
                  Clave
                </th>
                <th scope="col" className="px-6 py-3">
                  Materia
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  Creditos
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  Maestro
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  Grupo
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loadListPost ? (
                listSubjectUp.map((s) => {
                  return (
                    <CardSubject
                      courseId={s.subjectCourseId}
                      subjectId={s.subjectId}
                      nameSubject={s.subjectName}
                      subjectCredits={s.subjectCredits}
                      teacherSubjectId={s.teacherId}
                      teacherSubjectName={s.teacherName}
                      teacherSubjectImage={s.teacherImage}
                      teacherSubjectlastName={s.teacherLastName}
                      teamId={s.subjectTeamId}
                      teamName={s.subjectTeamName}
                      changeStateUp={downSubject}
                    />
                  );
                })
              ) : (
                <LoadingSection />
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full h-10">
          <button 
            className="mt-4 mx-auto block bg-orangeLight p-1 w-48 rounded-2xl text-white font-bold" 
            onClick={sendSubjectChange}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
