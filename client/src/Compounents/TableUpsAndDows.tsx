import {ReactNode} from 'react'

export default function TableUpsAndDows({children, title} : {children : ReactNode, title :string}) {
  return (
    <div className="relative overflow-x-auto my-8">
      <div className='w-4/5 mx-auto m-2 text-4xl font-bold text-orangeLight'>
          <h1>{title}</h1>
      </div>
      <table className="w-4/5 mx-auto shadow-3xl shadow-oceanBlue text-sm rounded-md text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-white uppercase bg-oceanBlue dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              Clave
            </th>
            <th scope="col" className="px-6 py-3">
              Materia
            </th>
            <th scope="col" className="px-6 py-3 ">
              Creditos
            </th>
            <th scope="col" className="px-6 py-3">
              Maestro
            </th>
            <th scope="col" className="px-6 py-3">
              Grupo
            </th>
            <th scope="col" className="px-6 py-3">
              Horario
            </th>
            <th scope="col" className="px-6 py-3">
              Add
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {children}
        </tbody>
      </table>
    </div>
  )
}
