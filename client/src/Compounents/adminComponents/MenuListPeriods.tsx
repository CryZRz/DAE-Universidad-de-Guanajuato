import axios from "axios";
import { useEffect, useState } from "react";
import { defaultPeriod } from "../../helpers/dataDeafult/periods";
import { formatTimeDate } from "../../helpers/formatTime";
import { getCookie } from "../../helpers/getCookie";
import PeriodIn from "../../Interfaces/PeriodIn";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";
import TablePeriod from "../TablePeriod";

export default function MenuListPeriods({
  action,
  regularization
  } : 
  {
    action : (p: PeriodIn) => void
    regularization?: boolean
  }) {
  const [listPeriods, setListPeriods] = useState<PeriodIn[]>([defaultPeriod]);
  const [loadListPeriods, setLoadListPeriods] = useState(false);
  const token = getCookie("token");

  async function getListPeriods(start: number, end: number) {

    let urlFeching: string
    if (regularization != undefined) {
      urlFeching = "http://localhost:3000/admin/regularization/currentperiods"
    }else{
      urlFeching = `http://localhost:3000/admin/periods?start=${start}&end=${end}`
    }

    try {
      setLoadListPeriods(false);
      const reqListPeriods = await axios.get(
        urlFeching,
        {
          headers: {
            token,
          },
        }
      );
      setListPeriods(reqListPeriods.data);
      setLoadListPeriods(true);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListPeriods(0, 10);
  }, []);

  return (
    <div className="w-full">
      {loadListPeriods ? (
        <TablePeriod>
          {listPeriods.map((p, i) => {

            function addPeriod(){
                action(p)
            }

            return (
              <tr
                key={p.id}
                className="hover:bg-orangeLight hover:text-white"
                onClick={addPeriod}
              >
                <td className="p-1">{p.id}</td>
                <td className="p-1">{p.name}</td>
                <td className="p-1">{formatTimeDate(p.startDate)}</td>
                <td className="p-1">{formatTimeDate(p.endDate)}</td>
                <td className="p-1">{p.typeOfPeriod}</td>
              </tr>
            );
          })}
        </TablePeriod>
      ) : (
        <LoadingSection />
      )}
      <Pagination
        start={0}
        end={10}
        fetchingData={getListPeriods}
        isLoading={!loadListPeriods}
      />
    </div>
  );
}
