import {Fragment} from "react";
import { ScheduleRowIn } from "../../Interfaces/ScheduleIn";
import { PageEdit, BinMinus} from "iconoir-react"

export default function RowSchelude({
  listHours,
  addToEditSchedule,
  addToDeleteSchedule,
}: {
  listHours: ScheduleRowIn[];
  addToEditSchedule?: (id: number | string) => void;
  addToDeleteSchedule?: (id: number | string) => void
}) {

  return (
    <div className="w-full">
      {listHours.map((h) => {
        return (
          <Fragment key={h.id}>
            <div className={`bg-orangeLight text-white p-1 m-2 ${addToEditSchedule != undefined && addToDeleteSchedule != undefined ? "menu-edit-schedule" : ""}`}>
              <span>{h.startTime}-{h.endTime}</span>
              {
                addToEditSchedule != undefined && addToDeleteSchedule != undefined?
                <div className="hidden">
                  <button 
                    className="m-1"
                    onClick={e => {addToEditSchedule(h.id)}}
                  >
                    <PageEdit width={25} height={25}/>
                  </button>
                  <button 
                    className="m-1"
                    onClick={e => {addToDeleteSchedule(h.id)}}
                  >
                    <BinMinus width={25} height={25}/>
                  </button>
                </div>
                :
                <></>
              }
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
