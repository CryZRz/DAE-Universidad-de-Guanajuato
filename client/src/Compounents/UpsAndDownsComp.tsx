import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../helpers/getCookie";
import { SubjectUpAndDownsIn } from "../Interfaces/SubjectIn";
import TableUpsAndDows from "./TableUpsAndDows";
import CardSubject from "./CardSubject";
import LoadingSection from "./LoadingSection";
import { defaultTableSchedule } from "../helpers/dataDeafult/schedule";

export default function UpsAndDownsComp({user} : {user : string}) {
  const [listAviableSubjects, setListAviableSubjects] = useState<
  SubjectUpAndDownsIn[]
  >([
    {
      courseId: 0,
      subjectId: 0,
      teacherId: null,
      teacherName: null,
      teacherLastName: null,
      teacherImage: null,
      teamId: 0,
      teamName: "",
      subjectName: "",
      credits: 0,
      semesterId: 0,
      schedules: defaultTableSchedule
    },
  ]);
  const [listSubjectsOfUser, setListSubjectsOfUser] = useState<
  SubjectUpAndDownsIn[] | []
  >([]);
  const [listSubjectsUps, setListSubjectsUps] = useState<
  SubjectUpAndDownsIn[] | []
  >([]);
  const [listSubjectsDowns, setListSubjectsDowns] = useState<
  SubjectUpAndDownsIn[] | []
  >([]);
  const [loadListSubjects, setLoadListSubjects] = useState(false);
  const [reloadListSubjects, setReloadListSubjects] = useState(false)
  const token = getCookie("token");

  useEffect(() => {
    async function getSubjectsAviable() {
      let urlGetSubjects = ""
      if (user == "teacher") {
        urlGetSubjects = "http://localhost:3000/subjects/teachers/aviable"
      }
      else if(user == "student"){
        urlGetSubjects = "http://localhost:3000/subjects/students/aviable"
      }
      try {
        console.log(urlGetSubjects)
        const reqAviableSubjects = await axios.get(
          urlGetSubjects,
          {
            headers: {
              token,
            },
          }
        );
        console.log(reqAviableSubjects)
        setListAviableSubjects(reqAviableSubjects.data.aviableSubjects);
        setListSubjectsOfUser(reqAviableSubjects.data.subjectsUser);
        setListSubjectsUps([])
        setListSubjectsDowns([])
        setLoadListSubjects(true);
      } catch (e) {
        alert(e);
      }
    }

    getSubjectsAviable();
  }, [reloadListSubjects]);

  function chanegUpSubject(id: number) {
    const validateDuplicateSubjects = listSubjectsOfUser.filter(s => s.courseId == id)
    if (validateDuplicateSubjects.length >= 1) {
      return alert("La materia ya la tienes en tus materias")
    }
    const subjectDown = listAviableSubjects.filter((s) => s.courseId != id);
    const subjectUp = listAviableSubjects.filter((s) => s.courseId == id);
    setListAviableSubjects(subjectDown);
    setListSubjectsUps([...listSubjectsUps, subjectUp[0]]);
  }

  function changeStateSubject(id: number) {
    if (listSubjectsUps.length >= 10) {
        return alert("Solo puedes dar de alta 10 materias")
    }
    const subjectDown = listSubjectsUps.filter((s) => s.courseId != id);
    const subjectUp = listSubjectsUps.filter((s) => s.courseId == id);
    setListAviableSubjects([...listAviableSubjects, subjectUp[0]]);
    setListSubjectsUps(subjectDown);
  }

  function downSubjectsOfTeacher(id: number) {
    const subjectDown = listSubjectsOfUser.filter((s) => s.courseId != id);
    const subjectUp = listSubjectsOfUser.filter((s) => s.courseId == id);
    setListSubjectsDowns([...listSubjectsDowns, subjectUp[0]]);
    setListSubjectsOfUser(subjectDown);
  }

  function upSubjectOfTeacher(id: number) {
    const subjectDown = listSubjectsDowns.filter((s) => s.courseId != id);
    const subjectUp = listSubjectsDowns.filter((s) => s.courseId == id);
    setListSubjectsDowns(subjectDown);
    setListSubjectsOfUser([...listSubjectsOfUser, subjectUp[0]]);
  }

  async function sendUpsAndDowns(){
    let urlUpdateSubjects : string
    if (user == "teacher") {
      urlUpdateSubjects = "http://localhost:3000/update/subjects/teacher"
    }else{
      urlUpdateSubjects = "http://localhost:3000/update/subjects/student"
    }
    if (listSubjectsUps.length <= 0 && listSubjectsDowns.length !<= 0) {
        return alert("No puedes enviar altas vacias")
    }
    try {
        await axios.post(urlUpdateSubjects,{
            listSubjectsUps,
            listSubjectsDowns
        },{
            headers: {
                token
            }
        })
        alert("Materias actulizadas correctamente")
        setReloadListSubjects(!reloadListSubjects)
    } catch (e) {
        alert(e)
    }
  }

  return (
    <>
      <TableUpsAndDows title="Materias disponibles">
        {loadListSubjects ? (
          listAviableSubjects.map((s) => {
            return (
              <CardSubject
                key={s.courseId}
                courseId={s.courseId}
                subjectId={s.subjectId}
                nameSubject={s.subjectName}
                subjectCredits={s.credits}
                teacherSubjectId={s.teacherId}
                teacherSubjectName={s.teacherName}
                teacherSubjectImage={s.teacherImage}
                teacherSubjectlastName={s.teacherLastName}
                teamId={s.teamId}
                teamName={s.teamName}
                listSchedules={s.schedules}
                changeStateDown={chanegUpSubject}
              />
            );
          })
        ) : (
          <LoadingSection />
        )}
      </TableUpsAndDows>
      <TableUpsAndDows title="Altas">
        {listSubjectsUps.map((s) => {
          return (
            <CardSubject
              key={s.courseId}
              courseId={s.courseId}
              subjectId={s.subjectId}
              nameSubject={s.subjectName}
              subjectCredits={s.credits}
              teacherSubjectId={s.teacherId}
              teacherSubjectName={s.teacherName}
              teacherSubjectImage={s.teacherImage}
              teacherSubjectlastName={s.teacherLastName}
              teamId={s.teamId}
              teamName={s.teamName}
              listSchedules={s.schedules}
              changeStateUp={changeStateSubject}
            />
          );
        })}
      </TableUpsAndDows>
      {listSubjectsDowns.length > 0 ? (
        <>
          <TableUpsAndDows title="Bajas">
            {listSubjectsDowns.map((s) => {
              return (
                <CardSubject
                  key={s.courseId}
                  courseId={s.courseId}
                  subjectId={s.subjectId}
                  nameSubject={s.subjectName}
                  subjectCredits={s.credits}
                  teacherSubjectId={s.teacherId}
                  teacherSubjectName={s.teacherName}
                  teacherSubjectImage={s.teacherImage}
                  teacherSubjectlastName={s.teacherLastName}
                  teamId={s.teamId}
                  teamName={s.teamName}
                  listSchedules={s.schedules}
                  changeStateUp={upSubjectOfTeacher}
                />
              );
            })}
          </TableUpsAndDows>
        </>
      ) : (
        <></>
      )}
      <TableUpsAndDows title="Tus materias">
        {listSubjectsOfUser.length > 0 ? (
          listSubjectsOfUser.map((s) => {
            return (
              <CardSubject
                key={s.courseId}
                courseId={s.courseId}
                subjectId={s.subjectId}
                nameSubject={s.subjectName}
                subjectCredits={s.credits}
                teacherSubjectId={s.teacherId}
                teacherSubjectName={s.teacherName}
                teacherSubjectImage={s.teacherImage}
                teacherSubjectlastName={s.teacherLastName}
                teamId={s.teamId}
                teamName={s.teamName}
                listSchedules={s.schedules}
                changeStateUp={downSubjectsOfTeacher}
              />
            );
          })
        ) : (
          <tr>
            <h3>No tienes materias</h3>
          </tr>
        )}
      </TableUpsAndDows>
      <div className="w-full h-10">
        <button
          className="mt-4 mx-auto block bg-orangeLight p-1 w-48 rounded-2xl text-white font-bold"
          onClick={sendUpsAndDowns}
        >
          Guardar
        </button>
      </div>
    </>
  );
}
