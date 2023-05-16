import { useState } from "react";
import { defaultCourse } from "../../helpers/dataDeafult/courses";
import { CourseIn, SubjectIn, TeamIn } from "../../Interfaces/SubjectIn";
import Modal from "../Modal";
import "../../assets/styles/menuStudentKar..styles.css";
import MenuListSubjects from "./MenuListSubjects";
import MenuListTeachers from "./MenuListTeachers";
import { ListBseUserIn } from "../../Interfaces/TeachersIn";
import MenuListTeams from "./MenuListTeams";
import MenuListPeriods from "./MenuListPeriods";
import PeriodIn from "../../Interfaces/PeriodIn";
import CardProfileLi from "../CardProfileLi";
import axios from "axios";
import { getCookie } from "../../helpers/getCookie";

export default function MenuCreateCourse({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
}) {

  const [saveNewCourse, setSaveNewCourse] = useState<CourseIn>(defaultCourse);

  const [showMenuSelectSub, setShowMenuSelectSub] = useState(false)
  const [showMenuSelectTeacher, setShowMenuSelectTeacher] = useState(false)
  const [showMenuSelectTeam, setShowMenuSelectTeam] = useState(false)
  const [showMenuSelectPeriod, setShowMenuSelectPeriod] = useState(false)
  const token = getCookie("token")

  function addSubject(subject: SubjectIn){
    const newDataSub = saveNewCourse
    newDataSub.subject.id = subject.id
    newDataSub.subject.credits = subject.credits
    newDataSub.subject.name = subject.name 
    setSaveNewCourse(newDataSub)
    alert("materia agregado correctamente")
  }

  function addTeacher(teacher: ListBseUserIn){
    const newDataSub = saveNewCourse
    newDataSub.teacher = teacher
    setSaveNewCourse(newDataSub)
    alert("maestro agregado correctamente")
  }

  function addTeam(team: TeamIn){
    const newDataSub = saveNewCourse
    newDataSub.team = team
    setSaveNewCourse(newDataSub)
    alert("grupo agregado correctamente")
  }

  function addPeriod(period: PeriodIn){
    const newDataSub = saveNewCourse
    newDataSub.period = period
    setSaveNewCourse(newDataSub)
    alert("periodo agregado correctamente")
  }

  async function sendCreateCourse(){
    try {
      await axios.post("http://localhost:3000/admin/createcourse",{
        subjectId: saveNewCourse.subject.id, 
        teacherId: saveNewCourse.teacher.id == 0 ? null : saveNewCourse.teacher.id, 
        teamId: saveNewCourse.team.id, 
        periodId: saveNewCourse.period.id, 
        typeOfGroup: saveNewCourse.period.typeOfPeriod
      },{
        headers:{
          token
        }
      })
      alert("curso creado correctamente")
    } catch (e) {
      alert(e)
    }
  }

  function validateData(){
    if (saveNewCourse.subject.id == 0) {
      return alert("No puedes crear un curso sin materia")
    }
    else if (saveNewCourse.team.id == 0) {
      return alert("No puedes crear un curso sin grupo")
    }
    else if (saveNewCourse.period.id == 0) {
      return alert("No puedes crear un curso sin periodo")
    }else{
      sendCreateCourse()
    }
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={validateData}
      title="Crea un nuevo curso"
      width={null}
      zindex="10"
    >
      <div>
        <Modal
          showModal={showMenuSelectSub}
          setShowModal={setShowMenuSelectSub}
          actionModal={() => {}}
          title="Seleciona un materia"
          width={null}
          zindex="20"
        >
          <MenuListSubjects
            action={addSubject}
          />
        </Modal>
        <Modal
          showModal={showMenuSelectTeacher}
          setShowModal={setShowMenuSelectTeacher}
          actionModal={() => {}}
          title="Seleciona un maestro"
          width={null}
          zindex="20"
        >
          <MenuListTeachers
            action={addTeacher}
          />
        </Modal>
        <Modal
          showModal={showMenuSelectPeriod}
          setShowModal={setShowMenuSelectPeriod}
          actionModal={() => {}}
          title="Seleciona un periodo"
          width={null}
          zindex="20"
        >
          <MenuListPeriods
            action={addPeriod}
          />
        </Modal>
        <Modal
          showModal={showMenuSelectTeam}
          setShowModal={setShowMenuSelectTeam}
          actionModal={() => {}}
          title="Seleciona un grupo"
          width={null}
          zindex="20"
        >
          <MenuListTeams
            action={addTeam}
          />
        </Modal>
        <div className="w-full text-center">
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
              <span>Materia</span>
            </div>
            <div
              className="w-1/2 p-1 border border-orangeLight menu-edit-course"
              onClick={e => {setShowMenuSelectSub(true)}}
            >
              <span>{saveNewCourse.subject.name}</span>
              <span className="hidden text-white font-bold">Editar</span>
            </div>
          </div>
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1 .menu-edit-course">
              <span>Creditos</span>
              <span className="hidden text-white font-bold">Editar</span>
            </div>
            <div className="w-1/2 p-1 border border-orangeLight">
              <span>{saveNewCourse.subject.credits}</span>
            </div>
          </div>
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
              <span>Maestro</span>
            </div>
            <div
              className="w-1/2 p-1 border border-orangeLight menu-edit-course"
              onClick={e => {setShowMenuSelectTeacher(true)}}
            >
              {saveNewCourse.teacher.id != null &&
                saveNewCourse.teacher.name != null &&
                saveNewCourse.teacher.lastName != null &&
                saveNewCourse.teacher.image != null ? (
                  <CardProfileLi
                    id={saveNewCourse.teacher.id}
                    name={saveNewCourse.teacher.name}
                    lastName={saveNewCourse.teacher.lastName}
                    image={saveNewCourse.teacher.image}
                  />
                ) : (
                  <span>Maestro no seleccionado</span>
                )}
              <span className="hidden text-white font-bold">Editar</span>
            </div>
          </div>
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
              <span>Grupo</span>
            </div>
            <div
              className="w-1/2 p-1 border border-orangeLight menu-edit-course"
              onClick={e => {setShowMenuSelectTeam(true)}}
            >
              <span>{saveNewCourse.team.name}</span>
              <span className="hidden text-white font-bold">Editar</span>
            </div>
          </div>
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
              <span>Tip.Grup</span>
            </div>
            <div className="w-1/2 p-1 border border-orangeLight">
              <span>{saveNewCourse.period.typeOfPeriod}</span>
            </div>
          </div>
          <div className="w-full flex">
            <div className="bg-oceanBlue text-white w-1/2 font-bold p-1">
              <span>Periodo</span>
            </div>
            <div
              className="w-1/2 p-1 border border-orangeLight menu-edit-course"
              onClick={e => {setShowMenuSelectPeriod(true)}}
            >
              <span>{saveNewCourse.period.name}</span>
              <span className="hidden text-white font-bold">Editar</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
