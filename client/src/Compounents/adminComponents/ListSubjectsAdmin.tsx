import axios from 'axios';
import {useEffect, useState} from 'react'
import { defaultSubject } from '../../helpers/dataDeafult/subject';
import { getCookie } from '../../helpers/getCookie';
import { SubjectIn } from '../../Interfaces/SubjectIn'
import LoadingSection from '../LoadingSection';
import Pagination from '../Pagination';
import TableSubject from '../TableSubject';
import MenuCreateSubject from './MenuCreateSubject';

export default function ListSubjectsAdmin() {

  const [loadListSubjects, setLoadListSubjects] = useState(false)
  const [saveListSubjects, setSaveListSubjects] = useState<SubjectIn[]>([defaultSubject])
  const [saveSubjectEdit, setSaveSubjectEdit] = useState<SubjectIn>(defaultSubject)
  const [showMenuCreateSub, setShowMenuCreateSub] = useState(false)
  const [showMenuEditSub, setShowMenuEditSub] = useState(false)
  const token = getCookie("token")

  async function getListSubjects(start: number, end: number) {
    try {
      setLoadListSubjects(false);
      const listSubjects = await axios.get(
        `http://localhost:3000/admin/subjects/?start=${start}&end=${end}`,
        {
          headers: {
            token,
          },
        }
      );
      setSaveListSubjects(listSubjects.data);
      setLoadListSubjects(true);
      console.log(listSubjects.data);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListSubjects(0, 10);
  }, []);

  return (
    <div className="mx-4">
      <MenuCreateSubject
          showMenu={showMenuCreateSub}
          setShowMenu={setShowMenuCreateSub}
      />
      <MenuCreateSubject
        showMenu={showMenuEditSub}
        setShowMenu={setShowMenuEditSub}
        subjectEdit={saveSubjectEdit}
        setSubjectEdit={setSaveSubjectEdit}
      />
      <div className="w-11/12 mx-auto mb-2 mt-4">
        <h1 className="text-orangeLight text-3xl font-bold">Materias</h1>
      </div>
      <div className="w-11/12 mx-auto mb-2">
          <button 
            className="w-full bg-orangeLight text-white p-1"
            onClick={e => {setShowMenuCreateSub(true)}}
          >
              Crear nueva materia
          </button>
      </div>
      <div className="w-11/12 mx-auto">
        {
          loadListSubjects ?
          <TableSubject>
            {
              saveListSubjects.map(s => {

                function addSubEdit(){
                  setSaveSubjectEdit(s)
                  setShowMenuEditSub(true)
                }

                return(
                  <tr className="hover:bg-orangeLight cursor-pointer" key={s.id} onClick={addSubEdit}>
                    <td className="p-1">{s.id}</td>
                    <td className="p-1">{s.name}</td>
                    <td className="p-1">{s.credits}</td>
                    <td className="p-1">{s.semesterId}</td>
                  </tr>
                )
              })
            }
          </TableSubject>
          :
          <LoadingSection/>
        }
      </div>
      <div>
        <Pagination
          start={0}
          end={10}
          fetchingData={getListSubjects}
          isLoading={!loadListSubjects}
        />
      </div>
    </div>
  )
}

