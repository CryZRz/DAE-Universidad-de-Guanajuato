import axios from "axios";
import { useState, useEffect } from "react";
import { getCookie } from "../../helpers/getCookie";
import { KardexSubjectIn } from "../../Interfaces/KardexSubjectIn";
import LoadingSection from "../LoadingSection";
import TableCardKardexStudent from "../TableCardKardexStudent";
import LiKardexStudent from "./LiKardexStudent";

export default function UserInfoStudent({id}: {id: string}) {
  const [saveKardex, setSaveKardex] = useState<KardexSubjectIn[]>([
    {
      studentId: 0,
      subjectCourseId: 0,
      subjectId: 0,
      subjectName: "",
      subjectCredits: 0,
      subjectSemesterId: 0,
      ratings: [
        {
          id: 0,
          courseId: 0,
          opportunity: 0,
          date: "",
          qualification: "",
          typeOfGroup: "",
          team: {
            id: 0,
            name: "",
            semesterId: 0,
          },
          teacher: {
            id: null,
            name: null,
            lastName: null,
            image: null,
          },
          period: {
            id: 0,
            name: "",
            startDate: "",
            endDate: "",
            typeOfPeriod: "",
          },
        },
      ],
    },
  ]);
  const [loadKardexUser, setloadKardexUser] = useState(false);
  const token = getCookie("token");

  async function realodDataUser() {
    setloadKardexUser(false);
    try {
      const reqInfoUser = await axios.get(
        `http://localhost:3000/admin/user/${id}`,
        {
          headers: {
            token,
          },
        }
      );
      setSaveKardex(reqInfoUser.data);
      setloadKardexUser(true);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    async function getInfoStudent() {
      try {
        const reqInfoUser = await axios.get(
            `http://localhost:3000/admin/user/${id}`,
            {
              headers: {
                token,
              },
            }
          );
          setSaveKardex(reqInfoUser.data);
          setloadKardexUser(true);
      } catch (e) {
        alert(e)
      }
    }

    getInfoStudent()
  }, []);

  return (
    <div className="w-11/12 mx-auto">
        {
          loadKardexUser ? 
          <TableCardKardexStudent>
            <LiKardexStudent
                reloadDataUser={realodDataUser}
                listSubjects={saveKardex}
              />
        </TableCardKardexStudent>
        :
        <LoadingSection/>
        }
    </div>
  )
}
