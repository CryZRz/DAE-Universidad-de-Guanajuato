import {ChangeEvent, useState} from "react";
import Modal from "../Modal";
import { formatDateForInput, validateAfterDate } from "../../helpers/formatTime";
import { getCookie } from "../../helpers/getCookie";
import axios from "axios";
import PeriodIn from "../../Interfaces/PeriodIn";
import { defaultPeriod } from "../../helpers/dataDeafult/periods";

export default function MenuCreatePeriod({
  showMenu,
  setShowMenu,
  periodEdit,
  setPeriodEdit
}: {
  showMenu: boolean;
  setShowMenu: (p: boolean) => void;
  periodEdit?: PeriodIn;
  setPeriodEdit?: (period: PeriodIn) => void
}) {

  const [saveDataPeriod, setSaveDataPeriod] = useState<PeriodIn>(defaultPeriod)
  const token = getCookie("token");

  function saveData({target: {value, name}} : ChangeEvent<HTMLInputElement>){
    if (periodEdit != undefined && setPeriodEdit != undefined) {
      setPeriodEdit({...periodEdit, [name]: value})
    }else{
      setSaveDataPeriod({...saveDataPeriod, [name]: value})
    }
  }

  function validateData(period: PeriodIn) {
    if (!validateAfterDate(period.startDate)) {
      alert("no puedes poner fechas anterirores a la actual");

      return false;
    } else if (!validateAfterDate(period.endDate)) {
      alert("no puedes poner fechas anterirores a la actual");

      return false;
    } else if (period.name == "") {
      alert("no puedes enviar un nombre vacio");

      return false;
    } else if (period.typeOfPeriod == "") {
      alert("no puedes enviar un periodo vacio");
      
      return false;
    }
    
    return true;
  }
  
  async function createPeriod(){
    try {
      await axios.post(
        "http://localhost:3000/admin/createperiod",
        {
          name: saveDataPeriod.name,
          startDate: saveDataPeriod.startDate,
          endDate: saveDataPeriod.endDate,
          typeOfPeriod: saveDataPeriod.typeOfPeriod,
        },
        {
          headers: {
            token,
          },
        }
      );
      alert("periodo creado correctamente");
    } catch (e) {
      alert(e);
    }
  }

  async function updatePeriod(){
    if (periodEdit != undefined) {
      try {
        await axios.post(
          "http://localhost:3000/admin/updateperiod",
          {
            name: periodEdit.name,
            startDate: periodEdit.startDate,
            endDate: periodEdit.endDate,
            typeOfPeriod: periodEdit.typeOfPeriod,
            periodId: periodEdit.id
          },
          {
            headers: {
              token,
            },
          }
        );
        alert("periodo creado correctamente");
      } catch (e) {
        alert(e);
      }
    }
  }

  async function deletePeriod(){
    try {
      if (periodEdit != undefined && validateData(periodEdit)) {
        await axios.delete("http://localhost:3000/admin/deleteperiod",{
          data:{
            periodId: periodEdit.id
          },
          headers:{
            token
          }
        })

        return alert("periodo eliminado correctamente")
      }

      return alert("No hay materia para borrar")
    } catch (e) {
      alert(e)
    }
  }

  function sendPeriod(){
    if (periodEdit != undefined) {
      const validate = validateData(periodEdit)
      if (validate) {
        return updatePeriod()
      }
    }

    const validate = validateData(saveDataPeriod)
    if (validate) {
      createPeriod()
    }
  }

  return (
    <Modal
      showModal={showMenu}
      setShowModal={setShowMenu}
      actionModal={sendPeriod}
      title={periodEdit != undefined ? "Editar periodo" : "Crea un nuevo periodo"}
      width={null}
      zindex="10"
    >
      <div>
        <form className="w-full">
          <div className="mb-2">
            <label htmlFor="name">Nombre: </label>
            <input
              onChange={saveData}
              className="w-full border-orangeLight border outline-none"
              type="text"
              name="name"
              defaultValue={periodEdit != undefined ? periodEdit.name : ""}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="startDate">Fecha inicio: </label>
            <input
              onChange={saveData}
              className="w-full border-orangeLight border outline-none"
              type="date"
              name="startDate"
              defaultValue={periodEdit != undefined ? formatDateForInput(periodEdit.startDate) : ""}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="endDate">Fecha fin: </label>
            <input
              onChange={saveData}
              className="w-full border-orangeLight border outline-none"
              type="date"
              name="endDate"
              defaultValue={periodEdit != undefined ? formatDateForInput(periodEdit.endDate) : ""}
            />
          </div>
          <div>
            <label htmlFor="typeOfPeriod">Tipo de periodo: </label>
            <input
              onChange={saveData}
              className="w-full border-orangeLight border outline-none"
              type="text"
              name="typeOfPeriod"
              defaultValue={periodEdit != undefined ? periodEdit.typeOfPeriod : ""}
            />
          </div>
        </form>
        {
        periodEdit != undefined ?
          <div className="w-full mt-4">
            <button 
              className="w-full bg-orangeLight text-white p-1 font-bold"
              onClick={deletePeriod}
            >
                Eliminar Periodo
            </button>
          </div>
          :
          <></>  
        }
      </div>
    </Modal>
  );
}
