import { ReactNode } from "react";

export default function TablePeriod({children} : {children : ReactNode}) {
  return (
    <table className="w-full mx-auto border border-oceanBlue text-sm rounded-md text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-center text-white uppercase bg-oceanBlue dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3 ">
            Id
          </th>
          <th scope="col" className="px-6 py-3">
            Nombre
          </th>
          <th scope="col" className="px-6 py-3 ">
            Fecha Inicio
          </th>
          <th scope="col" className="px-6 py-3">
            Fecha fin
          </th>
          <th scope="col" className="px-6 py-3">
            Tipo de periodo
          </th>
        </tr>
      </thead>
      <tbody className="text-center">{children}</tbody>
    </table>
  );
}
