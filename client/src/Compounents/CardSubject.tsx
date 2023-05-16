import "../assets/styles/cardSubject.styles.css";
import { Plus, Minus, Cancel } from "iconoir-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ScheduleTableIn } from "../Interfaces/ScheduleIn"; 
import Modal from "./Modal";
import MenuEditSchelude from "./adminComponents/MenuEditSchelude";

export default function CardSubject({
  courseId,
  subjectId,
  nameSubject,
  subjectCredits,
  teacherSubjectId,
  teacherSubjectName,
  teacherSubjectlastName,
  teacherSubjectImage,
  teamId,
  teamName,
  listSchedules,
  changeStateUp,
  changeStateDown,
}: {
  courseId: number;
  subjectId: number;
  nameSubject: string;
  subjectCredits: number;
  teacherSubjectId: number | null;
  teacherSubjectName: string | null;
  teacherSubjectImage: string | null;
  teacherSubjectlastName: string | null;
  teamId: number;
  teamName: string;
  listSchedules: ScheduleTableIn[] | [];
  changeStateUp?: (p: number) => void;
  changeStateDown?: (p: number) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  function changeStateSubject() {
    if (changeStateDown != undefined) {
      changeStateDown(courseId);
    } else if (changeStateUp != undefined) {
      changeStateUp(courseId);
    }
  }

  return (
    <>
      <MenuEditSchelude
          listSchedules={listSchedules}
          showMenu={showModal}
          setShowMenu={setShowModal}
          zindex="10"
        />
      <tr className="bg-white dark:bg-gray-800 ">
        <td className="px-6 py-4">{subjectId}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {nameSubject}
        </th>
        <td className="px-6 py-4">{subjectCredits}</td>
        <td className="px-6 py-4">
          {teacherSubjectId != null &&
          teacherSubjectName != null &&
          teacherSubjectlastName != null &&
          teacherSubjectImage != null ? (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12">
                <img
                  className="rounded-full w-full h-full"
                  src={`http://localhost:3000/static/images/profiles/${teacherSubjectImage}`}
                  alt=""
                />
              </div>
              <Link to={`/profile/${teacherSubjectId}`}>
                <h3 className="inline ml-2">
                  {teacherSubjectName} {teacherSubjectlastName}
                </h3>
              </Link>
            </div>
          ) : (
            <div>
              <span>El maestro esta por asignarse</span>
            </div>
          )}
        </td>
        <td className="px-6 py-4">{teamName}</td>
        <td className="px-6 py-4">
          {listSchedules.length > 0 ? (
            <button
              className="block text-white bg-orangeLight  mx-auto font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={e => {setShowModal(true)}}
            >
              Ver horario
            </button>
          ) : (
            <span>Horario no disponible</span>
          )}
        </td>
        <td className="px-6 py-4 text-center">
          <button onClick={changeStateSubject}>
            {changeStateUp == undefined ? (
              <Plus width={30} height={30} />
            ) : (
              <Minus width={30} height={30} />
            )}
          </button>
        </td>
      </tr>
    </>
  );
}
