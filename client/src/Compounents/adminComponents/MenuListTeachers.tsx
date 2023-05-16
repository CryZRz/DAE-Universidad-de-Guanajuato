import axios from "axios";
import {useState, useEffect} from "react";
import { defaultListUser } from "../../helpers/dataDeafult/users";
import { getCookie } from "../../helpers/getCookie";
import { ListBseUserIn } from "../../Interfaces/TeachersIn";
import CardProfileLi from "../CardProfileLi";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";

export default function MenuListTeachers({action} : {action : (p : ListBseUserIn) => void}) {

    const [loadListTeachers, setLoadListTeachers] = useState(false);
    const [saveListTeachers, setSaveListTeachers] = useState<ListBseUserIn[]>([
        defaultListUser,
    ]);
    const token = getCookie("token");

  async function getListTeachers(start: number, end: number) {
    try {
      setLoadListTeachers(false);
      const listTeachers = await axios.get(
        `http://localhost:3000/admin/teachers?start=${start}&end=${end}`,
        {
          headers: {
            token,
          },
        }
      );
      setSaveListTeachers(listTeachers.data);
      setLoadListTeachers(true);
      console.log(listTeachers.data);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListTeachers(0, 10);
  }, []);

  return (
    <div>
        <div className="border-2 border-oceanBlue">
            <div className="w-full bg-oceanBlue text-white font-bold text-center">
              <span>Maestros</span>
            </div>
            {loadListTeachers ? (
              saveListTeachers.map((t) => {

                function addTeacher() {
                    action(t);
                }

                return (
                  <div
                    key={t.id}
                    className="hover:bg-orangeLight cursor-pointer"
                    onClick={addTeacher}
                  >
                    <CardProfileLi
                      id={t.id}
                      name={t.name}
                      lastName={t.lastName}
                      image={t.image}
                    />
                  </div>
                );
              })
            ) : (
              <LoadingSection />
            )}
          </div>
          <Pagination
            start={0}
            end={10}
            fetchingData={getListTeachers}
            isLoading={!loadListTeachers}
          />
    </div>
  )
}
