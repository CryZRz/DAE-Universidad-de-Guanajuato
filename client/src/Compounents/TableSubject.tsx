import {ReactNode} from 'react'

export default function TableSubject({children} : {children : ReactNode}) {
  return (
    <table className="w-full text-center border border-oceanBlue">
        <thead className="bg-oceanBlue text-white font-bold">
            <tr>
                <th className="p-1">Id</th>
                <th className="p-1">Materia</th>
                <th className="p-1">Creditos</th>
                <th className="p-1">Semestre id</th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
  )
}
