import { ChangeEvent } from "react";
import { ScheduleTableIn } from "../../Interfaces/ScheduleIn";
import Modal from "../Modal";
import { validateHourInput } from "../../helpers/formatTime";

export default function MenuAddHoursSchedule({
    showMenu,
    setShowMenu,
    scheduleAc,
    setScheduleAc,
    addSchedule,
    editSchedule,
}:{
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
    scheduleAc: ScheduleTableIn,
    setScheduleAc: (schedule: ScheduleTableIn) => void;
    addSchedule?: () => void;
    editSchedule?: () => void;
}) {

    function validateScheduleDay(day: string){
      const validDays = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
      
      return validDays.includes(day.toLocaleLowerCase())
    }

    function addScheduleName({target: {value}}: ChangeEvent<HTMLSelectElement>){
        if (validateScheduleDay(value)) {
          return setScheduleAc({...scheduleAc, ["name"]: value})
        }
        
        alert("el dia elegido no es valido")
    }
    
      function addScheduleStartTime({target: {value}}: ChangeEvent<HTMLInputElement>){
        if (validateHourInput(value)) {
          const oldValueScheduleAc = {...scheduleAc}
          oldValueScheduleAc.rows[0].startTime = value
          
          return setScheduleAc(oldValueScheduleAc)
        }
        
        alert("Solo puedes poner horas en punto ejemplo: 12:00")
      }
    
      function addScheduleEndTime({target: {value}}: ChangeEvent<HTMLInputElement>){
        if (validateHourInput(value)) {
          console.log(validateHourInput(value))
          const oldValueScheduleAc = {...scheduleAc}
          oldValueScheduleAc.rows[0].endTime = value
          
          return setScheduleAc(oldValueScheduleAc)
        }

        alert("Solo puedes poner horas en punto ejemplo: 12:00")
      }

      function addScheduleToMain(){
        if (addSchedule != undefined) {
            addSchedule()
        }else if (editSchedule != undefined) {
            editSchedule()
        }
      }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={addScheduleToMain}
      title="Agregar horario"
      zindex="30"
      width={null}
    >
      <div>
        <form className="w-full p-2">
          <div className="w-full mb-2">
            <span>Dia: </span>
            <select
              className="w-full outline-none border border-transparent border-b-orangeLight"
              onChange={addScheduleName}
              value={scheduleAc.name}
            >
              <option value="lunes">lunes</option>
              <option value="martes">martes</option>
              <option value="miercoles">miercoles</option>
              <option value="jueves">jueves</option>
              <option value="viernes">viernes</option>
              <option value="sabado">sabado</option>
              <option value="domingo">domingo</option>
            </select>
          </div>
          <div className="mb-2">
            <span>Hora inicio: </span>
            <input
              className="w-full outline-none border border-transparent border-b-orangeLight"
              type="time"
              value={scheduleAc.rows[0].startTime}
              onChange={addScheduleStartTime}
            />
          </div>
          <div>
            <span>Hora Final: </span>
            <input
              className="w-full outline-none border border-transparent border-b-orangeLight"
              type="time"
              value={scheduleAc.rows[0].endTime}
              onChange={addScheduleEndTime}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
