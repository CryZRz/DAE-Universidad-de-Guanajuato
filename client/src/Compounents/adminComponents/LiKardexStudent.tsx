import { PageEdit, BinMinus } from "iconoir-react";
import { useState, Fragment } from "react";
import { formatTimeDate } from "../../helpers/formatTime";
import { KardexSubjectIn } from "../../Interfaces/KardexSubjectIn";
import "../../assets/styles/menuStudentKar..styles.css";
import Modal from "../Modal";
import { deafultKardexSubjectStudent } from "../../helpers/dataDeafult";
import MenuEditSubjectKardexStudent from "./MenuEditSubjectKardexStudent";
import MenuAddOpKardexStudent from "./MenuAddOpKardexStudent";
import MenuEditQualificationsKardexStudent from "./MenuEditQualificationsKardexStudent";
import MenuDeleteCourseKardexStudent from "./MenuDeleteCourseKardexStudent";

export default function LiKardexStudent({
  listSubjects,
  reloadDataUser
}: {
  listSubjects: KardexSubjectIn[];
  reloadDataUser: () => Promise<any>
}) {
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [showModalEditSub, setShowModalEditSub] = useState(false);
  const [showModalDeleteSub, setShowModalDeleteSub] = useState(false);
  const [showModalAddOp, setShowModalAddOp] = useState(false);
  const [showModalQua, setShowModalQua] = useState(false);

  const [dataSubjectEdit, setDataSubjectEdit] = useState<KardexSubjectIn>(
    deafultKardexSubjectStudent
  );

  function MenuOptions() {

    function assingOpportunityHandler() {
      const indexLastRaiting = dataSubjectEdit.ratings.length - 1;

      if (
        parseFloat(dataSubjectEdit.ratings[indexLastRaiting].qualification) <
          7 ||
        dataSubjectEdit.ratings[indexLastRaiting].qualification == "D2"
      ) {
        return setShowModalAddOp(true);
      }

      return alert("La materia no esta reprobada");
    }

    return (
      <Modal
        title="Menu materia"
        setShowModal={setShowModalOptions}
        showModal={showModalOptions}
        actionModal={() => {}}
        zindex="10"
        width={null}
      >
        {showModalEditSub && 
          <MenuEditSubjectKardexStudent
          showMenu={showModalEditSub}
          setShowMenu={setShowModalEditSub}
          subjectEdit={dataSubjectEdit}
          zindex="20"
          reloadData={() => {
            setShowModalEditSub(false)
            setShowModalOptions(false)
            reloadDataUser()
          }}
        />}
        {showModalAddOp && 
        <MenuAddOpKardexStudent
          showMenu={showModalAddOp}
          setShowMenu={setShowModalAddOp}
          subjectEdit={dataSubjectEdit}
          zindex="20"
          reloadData={() => {
            setShowModalAddOp(false)
            setShowModalOptions(false)
            reloadDataUser()
          }}
        />}
        {showModalQua && 
        <MenuEditQualificationsKardexStudent
          showMenu={showModalQua}
          setShowMenu={setShowModalQua}
          subjectEdit={dataSubjectEdit}
          zindex="20"
          reloadData={() => {
            setShowModalAddOp(false)
            setShowModalOptions(false)
            reloadDataUser()
          }}
        />}
        <div>
          <table className="w-full text-center shadow">
            <thead className="bg-oceanBlue text-white font-bold">
              <tr>
                <td className="p-1">Id</td>
                <td className="p-1">Nombre</td>
                <td className="p-1">Creditos</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">{dataSubjectEdit.subjectId}</td>
                <td className="p-2">{dataSubjectEdit.subjectName}</td>
                <td className="p-2">{dataSubjectEdit.subjectCredits}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <button
              onClick={(e) => {
                setShowModalEditSub(true);
              }}
              className="bg-orangeLight text-white p-2 rounded"
            >
              Editar materia
            </button>
          </div>
          <table className="w-full text-center shadow mt-6">
            <thead className="bg-oceanBlue text-white font-bold">
              <tr>
                <th className="p-1">Fecha 1</th>
                <th className="p-1">Cal 1</th>
                <th className="p-1">Fecha 2</th>
                <th className="p-1">Cal 2</th>
                <th className="p-1">Fecha 3</th>
                <th className="p-1">Cal 3</th>
                <th className="p-1">Fecha 4</th>
                <th className="p-1">Cal 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {dataSubjectEdit.ratings.map((r) => {
                  return (
                    <Fragment key={r.id}>
                      <td className="p-2">{formatTimeDate(r.date)}</td>
                      <td className="p-2">{r.qualification}</td>
                    </Fragment>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <button
              onClick={(e) => {
                setShowModalQua(true);
              }}
              className="bg-orangeLight m-2 text-white p-2 rounded"
            >
              Ediar calificaciones
            </button>
            <button
              onClick={assingOpportunityHandler}
              className="bg-orangeLight m-2 text-white p-2 rounded"
            >
              Agregar oportunidad
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <MenuOptions />
      {showModalDeleteSub && 
      <MenuDeleteCourseKardexStudent
        showMenu={showModalDeleteSub}
        setShowMenu={setShowModalDeleteSub}
        subjectEdit={dataSubjectEdit}
        reloadData={() => {
          setShowModalDeleteSub(false)
          reloadDataUser()
        }}
      />}
      {listSubjects.map((s) => {
        function showModalEditHandler() {

          const getSubjectFil = listSubjects.filter(
            (sf) => sf.subjectCourseId == s.subjectCourseId
          );

          if (getSubjectFil.length > 0) {
            setDataSubjectEdit(getSubjectFil[0]);
            return setShowModalOptions(true);
          }

          return alert("Materia inexistente");
        }

        function showModalDeleteHandler() {
          const getSubjectFil = listSubjects.filter(
            (sf) => sf.subjectCourseId == s.subjectCourseId
          );

          if (getSubjectFil.length > 0) {
            setDataSubjectEdit(getSubjectFil[0]);
            return setShowModalDeleteSub(true);
          }

          return alert("Materia inexistente");
        }

        return (
          <tr key={s.subjectCourseId}>
            <td className="px-6 py-4">{s.subjectId}</td>
            <td className="px-6 py-4 menu-student-kar">
              <span>{s.subjectName}</span>
              <div className="hidden">
                <button
                  onClick={showModalEditHandler}
                  className="bg-orangeLight m-2 cursor-pointer p-1 rounded"
                >
                  <PageEdit color="#ffff" height={30} width={30} />
                </button>
                <button
                  onClick={showModalDeleteHandler}
                  className="bg-orangeLight m-2 cursor-pointer p-1 rounded"
                >
                  <BinMinus color="#ffff" height={30} width={30} />
                </button>
              </div>
            </td>
            <td className="px-6 py-4">{s.subjectCredits}</td>
            {s.ratings.map((r) => {
              return (
                <Fragment key={r.id}>
                  <td>
                    {r.date != null ? formatTimeDate(r.date) : "Pendiente"}
                  </td>
                  <td>
                    {r.qualification != null ? r.qualification : "Pendiente"}
                  </td>
                </Fragment>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}
