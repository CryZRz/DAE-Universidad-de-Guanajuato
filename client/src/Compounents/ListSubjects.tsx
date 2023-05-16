import axios from 'axios'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../helpers/getCookie'
import { ListSubjectsIn } from '../Interfaces/SubjectIn'
import LoadingSection from './LoadingSection'

export default function ListSubjects() {

    const [listSubjects, setListSubjects] = useState<ListSubjectsIn[]>([{
        courseSubjectId: 0,
        typeOfGroup: "",
        subjectId: 0,
        subjectName: "",
        teamId: 0,
        teamName: "",
        teacherId: 0,
        teacherName: "",
        teacherLastName: "",
        teacherImage: "",
        qualification: "",
        opportunity: 0,
        status: ""
    }])
    const [loadListSubjects, setLoadListSubjects] = useState(false)
    const token = getCookie("token")

    useEffect(() => {
        async function getListSubjects(){
            try {
                const reqListSubjects = await axios.get("http://localhost:3000/listsubjects", {
                    headers: {
                        token
                    }
                })
                setListSubjects(reqListSubjects.data)
                setLoadListSubjects(true)
            } catch (e) {
                alert(e)
            }
        }

        getListSubjects()
    }, [])

  return (
    <div className="w-full">
      {loadListSubjects ? (
        <div className="relative overflow-x-auto mt-4 pb-12">
          <table className="mx-auto w-9/12 shadow-2xl text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-oceanBlue text-white">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Clave
                </th>
                <th scope="col" className="px-6 py-3">
                  Materia
                </th>
                <th scope="col" className="px-6 py-3">
                  Op
                </th>
                <th scope="col" className="px-6 py-3">
                   Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipo grupo
                </th>
                <th scope="col" className="px-6 py-3">
                  Grupo
                </th>
                <th scope="col" className="px-6 py-3">
                  Calificación
                </th>
                <th scope="col" className="px-6 py-3">
                  Profesor
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {listSubjects.map((s) => {
                return (
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">
                        {s.subjectId}
                    </td>
                    <td className="px-6 py-4">
                        {s.subjectName}
                    </td>
                    <td className="px-6 py-4">
                        {s.opportunity}
                    </td>
                    <td className="px-6 py-4">
                        {s.status}
                    </td>
                    <td className="px-6 py-4">
                        {s.typeOfGroup}
                    </td>
                    <td className="px-6 py-4">
                        {s.teamName}
                    </td>
                    <td className="px-6 py-4">
                        {s.qualification}
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-52">
                        <div className="w-12 h-12">
                          <img
                            className="rounded-full w-full h-full"
                            src={`http://localhost:3000/static/images/profiles/${s.teacherImage}`}
                            alt={`image user ${s.teacherName}`}
                          />
                        </div>
                        <Link to={`/profile/${s.teacherId}`}>
                          <h3 className="inline ml-2">
                            {s.teacherName} {s.teacherLastName}
                          </h3>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <LoadingSection />
      )}
    </div>
  )
}
