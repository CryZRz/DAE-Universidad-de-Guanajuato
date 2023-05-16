import {ReactNode} from "react";

export default function TableCardKardexStudent({children} : {children : ReactNode}) {
  return (
    <table className="mx-auto w-full text-sm text-left shadow-2xl text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-center text-gray-700 uppercase bg-oceanBlue text-white">
        <tr>
          <th scope="col" className="px-6 py-3 ">
            Clave
          </th>
          <th scope="col" className="px-6 py-3">
            Materia
          </th>
          <th scope="col" className="px-6 py-3">
            Creditos
          </th>
          <th scope="col" className="px-6 py-3">
            Fecha 1
          </th>
          <th scope="col" className="px-6 py-3">
            Calif 1
          </th>
          <th scope="col" className="px-6 py-3">
            Fecha 2
          </th>
          <th scope="col" className="px-6 py-3">
            Calif 2
          </th>
          <th scope="col" className="px-6 py-3">
            Fecha 3
          </th>
          <th className="px-6 py-3">Calif 3</th>
          <th scope="col" className="px-6 py-3">
            Fecha 4
          </th>
          <th className="px-6 py-3">Calif 4</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {children}
      </tbody>
    </table>
  );
}
