import { ReactNode } from 'react'

export default function TableSchedules({children} : {children : ReactNode}) {
  return (
    <table className="w-full text-center border border-oceanBlue">
        <thead className="w-full bg-oceanBlue text-white">
            <tr>
                <th className="p-1">Id</th>
                <th className="p-1">Dia</th>
                <th className="p-1">Inicio</th>
                <th className="p-1">Fin</th>
                <th className="p-1">Curso id</th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
  )
}
