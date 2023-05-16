import { useState } from "react";
import { ScheduleTableIn } from "../../Interfaces/ScheduleIn";
import TableSchelude from "../TableSchelude";
import RowSchelude from "./RowSchelude";
import Modal from "../Modal";
import { defaultRowSchedule } from "../../helpers/dataDeafult/schedule";
import { v4 } from "uuid";
import MenuAddHoursSchedule from "./MenuAddHoursSchedule";

export default function MenuEditSchelude({
  showMenu,
  setShowMenu,
  listSchedules,
  setSchedule,
  editSchedule,
  deleteSchedule,
  updateSchedules,
  zindex
}: {
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
  listSchedules: ScheduleTableIn[];
  setSchedule?: (schedule: ScheduleTableIn) => void;
  editSchedule?: (schedule: ScheduleTableIn) => void;
  deleteSchedule?: (schedule: ScheduleTableIn) => void;
  updateSchedules?: () => void;
  zindex?: string
}) {

  const [saveScheduleAc, setSaveScheduleAc] = useState<ScheduleTableIn>(defaultRowSchedule)
  const copyListSchedules: ScheduleTableIn[] = JSON.parse(JSON.stringify(listSchedules))

  const [showModalAddSchedule, setShowModalAddSchedule] = useState(false)
  const [showModalEditSchedule, setShowModalEditSchedule] = useState(false)

  function addIdNewSchedule(){
    const addIdNewSchedule = {...saveScheduleAc}
    addIdNewSchedule.rows = [{...addIdNewSchedule.rows[0], id: v4()}]
    setSaveScheduleAc(addIdNewSchedule)
  }

  function findDuplicateSchedule(schedule: ScheduleTableIn){
    let err = false
    copyListSchedules.map(s => {
      s.rows.map(row => {
        if (row.startTime == schedule.rows[0].startTime && row.endTime == schedule.rows[0].endTime && s.name.toLocaleLowerCase() == schedule.name.toLocaleLowerCase()) {
          err = true
        }
      })
    })

    return err
  }

  function findSchedule(id: number | string){
    const finSchedule = copyListSchedules.find(schedule => schedule.rows.some(row => row.id === id))
    if (finSchedule) {
      const scheduleHourToEdit = finSchedule.rows.filter(s => s.id == id)

      return {
        name: finSchedule.name,
        rows: scheduleHourToEdit
      }
    }else{
      return undefined
    }
  }

  function findToEditSchedule(id: number | string){
    const getSchedule = findSchedule(id)
    if (getSchedule) {
      setSaveScheduleAc(getSchedule)
      setShowModalEditSchedule(true)
    }else{
      alert("la materia que quieres editar no existe")
    }
  }

  function addScheduleToMain(){
    if (setSchedule != undefined) {

      if (findDuplicateSchedule(saveScheduleAc)) {
        return alert("el horario que quieres agregar ya esta en ese dia y horario")
      }

      setSchedule(saveScheduleAc)
    }
    
    setShowModalAddSchedule(false)
  }

  function addScheduleEdit(){
    if (editSchedule != undefined) {

      if (findDuplicateSchedule(saveScheduleAc)) {
        return alert("el horario que quieres editar ya esta en ese dia y horario")
      }

      editSchedule(saveScheduleAc)
    }

    setShowModalEditSchedule(false)
  }

  function addToDeleteSchedule(id: number | string){
    const getSchedule = findSchedule(id)

    if (getSchedule && deleteSchedule != undefined) {
      deleteSchedule(getSchedule)
    }else{
      alert("la materia que quieres eliminar no existe")
    }
  }

  return (
    <Modal
        showModal={showMenu}
        setShowModal={setShowMenu}
        actionModal={updateSchedules != undefined ? updateSchedules : () => { setShowMenu(false)}}
        title="Horario"
        width="w-11/12"
        zindex={zindex != undefined ? zindex : "10"}
    >
      {showModalAddSchedule && (
          <MenuAddHoursSchedule
          showMenu={showModalAddSchedule}
          setShowMenu={setShowModalAddSchedule}
          scheduleAc={saveScheduleAc}
          setScheduleAc={setSaveScheduleAc}
          addSchedule={addScheduleToMain}
          />
        )}
      {showModalEditSchedule && (
        <MenuAddHoursSchedule
          showMenu={showModalEditSchedule}
          setShowMenu={setShowModalEditSchedule}
          scheduleAc={saveScheduleAc}
          setScheduleAc={setSaveScheduleAc}
          editSchedule={addScheduleEdit}
        />
      )}
      <div className="w-full">
        <TableSchelude>
          {listSchedules.map((s) => {
            return <RowSchelude 
                      key={v4()} 
                      listHours={s.rows} 
                      addToEditSchedule={setSchedule != undefined ? findToEditSchedule : undefined}
                      addToDeleteSchedule={setSchedule != undefined ? addToDeleteSchedule : undefined}
                  />;
          })}
        </TableSchelude>
        {setSchedule != undefined && (
          <div className="w-full mt-4">
          <button 
            onClick={e => {
              addIdNewSchedule()
              setShowModalAddSchedule(true)
              
            }}
            className="bg-orangeLight text-white p-1 mx-auto block">
              Agregar horario
          </button>
        </div>
        )}
      </div>
    </Modal>
  );
}
