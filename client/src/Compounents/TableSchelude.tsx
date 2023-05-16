import { ReactNode } from 'react'

export default function TableSchelude({children}: {children : ReactNode}) {
  return (
    <div className="w-full border border-oceanBlue text-center">
        <div className="w-full flex items-center justify-center bg-oceanBlue text-white">
            <div className="w-full p-1"><h3>Lunes</h3></div>
            <div className="w-full p-1"><h3>Martes</h3></div>
            <div className="w-full p-1"><h3>Miercoles</h3></div>
            <div className="w-full p-1"><h3>Jueves</h3></div>
            <div className="w-full p-1"><h3>Viernes</h3></div>
            <div className="w-full p-1"><h3>Sabado</h3></div>
            <div className="w-full p-1"><h3>Domingo</h3></div>
        </div>
        <div className="w-full flex">
            {children}
        </div>
    </div>
  )
}
