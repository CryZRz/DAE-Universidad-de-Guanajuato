import { ReactNode } from "react";

export default function TableTeam({children} : {children : ReactNode}) {
  return (
    <table className="w-full mx-auto text-center border-2 border-oceanBlue">
      <thead className="w-full bg-oceanBlue text-white font-bold">
        <tr>
          <th className="p-1">Id</th>
          <th className="p-1">Nombre</th>
          <th className="p-1">Semestr id</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
}
