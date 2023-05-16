import { useState } from "react";
import PeriodIn from "../../Interfaces/PeriodIn";
import { defaultPeriod } from "../../helpers/dataDeafult/periods";
import MenuCreatePeriod from "./MenuCreatePeriod";
import MenuListPeriods from "./MenuListPeriods";

export default function PeriodsComp() {
  const [savePeriodEdit, setSavePeriodEdit] = useState<PeriodIn>(defaultPeriod);
  const [showMenuCreatePeriod, setShowMenuCreatePeriod] = useState(false);
  const [showMenuEditPeriod, setShowMenuEditPeriod] = useState(false);

  function addPeriodEdit(period: PeriodIn){
    setSavePeriodEdit(period)
    setShowMenuEditPeriod(true)
  }

  return (
    <div>
      <div className="relative overflow-x-auto my-4">
        <MenuCreatePeriod
          showMenu={showMenuCreatePeriod}
          setShowMenu={setShowMenuCreatePeriod}
        />
        <MenuCreatePeriod
          showMenu={showMenuEditPeriod}
          setShowMenu={setShowMenuEditPeriod}
          periodEdit={savePeriodEdit}
          setPeriodEdit={setSavePeriodEdit}
        />
        <div className="w-4/5 mx-auto m-2 text-4xl font-bold text-orangeLight">
          <h1>Periodos</h1>
        </div>
        <div className="w-4/5 mx-auto mb-2">
          <button
            className="w-full bg-orangeLight p-1 text-white"
            onClick={(e) => {
              setShowMenuCreatePeriod(true);
            }}
          >
            Crear periodo
          </button>
        </div>
        <div>
          <MenuListPeriods
            action={addPeriodEdit}
          />
        </div>
      </div>
    </div>
  );
}
