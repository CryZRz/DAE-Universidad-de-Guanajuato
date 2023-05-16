import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../helpers/getCookie";
import { SubjectKardexTeacherIn } from "../Interfaces/SubjectIn";
import ListQualifications from "./ListQualifications";
import LoadingSection from "./LoadingSection";

export default function CardKardexTeacher({typeQualifications}: {typeQualifications : string}) {

  const [listSubjects, setListSubjects] = useState<SubjectKardexTeacherIn[]>([
    {
      subjectCourseId: 0,
      subjectStudiedId: 0,
      qualification: 0,
      subjectName: "",
      subjectCredits: 0,
      opportunity: 0,
      subjectId: 0,
      subjectSemesterId: 0,
      studentId: 0,
      studentName: "",
      studentLastName: "",
      studentImage: "",
      teamName: "",
      teamId: 0,
    },
  ]);
  const [loadListSubjects, setLoadListSubjects] = useState(false);
  const token = getCookie("token");
  let urlListQualifications : string
  typeQualifications == "regularization" ? urlListQualifications = "http://localhost:3000/regularizations" : urlListQualifications = "http://localhost:3000/subjects/teacher"
  useEffect(() => {
    async function getKardexTeacher() {

      try {
        const reqKardexTeacher = await axios.get(
          urlListQualifications,
          {
            headers: {
              token,
            },
          }
        );
        setListSubjects(reqKardexTeacher.data);
        setLoadListSubjects(true);
        console.log(reqKardexTeacher)
      } catch (e) {
        alert(e);
      }
    }

    getKardexTeacher();
  }, []);

  async function sendQualificationsSubjects(){
    let errorQualification = false
    listSubjects.map(s => {
      if (typeof(s.qualification) == "string") {
        let convertQualificationNumber = parseFloat(s.qualification)
        if (isNaN(convertQualificationNumber) && s.qualification != "D2") {
          errorQualification = true
        }
        else if (convertQualificationNumber < 1 || convertQualificationNumber > 10) {
          errorQualification = true
        }
      }
      else if (s.qualification == null) {
        errorQualification = true
      }
    })
    
    if (errorQualification) {
      return alert("Hay calificaciones no validas solo puedes poner calificaciones de 1 a 10 o D2")
    }

    try {
      await axios.post("http://localhost:3000/subjects/qualifications/save", {
        listQualifications : listSubjects
      },{
        headers: {
          token
        }
      })
      alert("calificaciones subidas correctamente")
    } catch (e) {
      alert(e)
    }

  }

  return (
    <div className="w-full">
      {loadListSubjects ? (
        <div className="relative overflow-x-auto mt-6 pb-12">
          <table className="mx-auto w-9/12 shadow-2xl text-sm text-left shadow text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-oceanBlue text-white">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Clave
                </th>
                <th scope="col" className="px-6 py-3">
                  Materia
                </th>
                <th scope="col" className="px-6 py-3">
                  Creditos
                </th>
                <th scope="col" className="px-6 py-3">
                  Oportunidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Estudiante
                </th>
                <th scope="col" className="px-6 py-3">
                  Grupo
                </th>
                <th scope="col" className="px-6 py-3">
                    Calificacion
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {listSubjects.map((s, i) => {

                function handleChangeValueSubjectOne({target : {value}} : ChangeEvent<HTMLSelectElement>){
                    const listSubjectsCopy = listSubjects
                    listSubjectsCopy[i].qualification = value
                    setListSubjects(listSubjectsCopy)
                }

                return (
                  <tr key={s.subjectCourseId} className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">{s.subjectId}</td>
                    <td className="px-6 py-4">{s.subjectName}</td>
                    <td className="px-6 py-4">{s.subjectCredits}</td>
                    <td className="px-6 py-4">{s.opportunity}</td>
                    <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-52">
                        <div className="w-12 h-12">
                          <img
                            className="rounded-full w-full h-full"
                            src={`http://localhost:3000/static/images/profiles/${s.studentImage}`}
                            alt={`image user ${s.studentName}`}
                          />
                        </div>
                        <Link to={`/profile/${s.studentId}`}>
                          <h3 className="inline ml-2">
                            {s.studentName} {s.studentLastName}
                          </h3>
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {s.teamName}
                    </td>
                    <td className="px-6 py-4">
                      {s.qualification != null ? (
                        <span>
                            {s.qualification}
                        </span>
                      ) : (
                        <select onChange={handleChangeValueSubjectOne} className="w-16 h-6 bg-zinc-300 outline-none text-center text-bold">
                          <ListQualifications/>
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-full h-10">
            <button
              className="mt-4 mx-auto block bg-orangeLight p-1 w-48 rounded-2xl text-white font-bold"
              onClick={sendQualificationsSubjects}
            >
              Guardar
            </button>
        </div>
        </div>
      ) : (
        <LoadingSection />
      )}
    </div>
  );
}
