import { ReactNode } from "react";

export default function TableCourse({ children }: { children: ReactNode }) {
  return (
    <table className="w-full mb-4 shadow">
      <thead className="bg-oceanBlue text-white">
        <tr>
          <th className="p-2">Curso Id</th>
          <th className="p-2">Materia</th>
          <th className="p-2">Creditos</th>
          <th className="p-2">Maestro</th>
          <th className="p-2">Grupo</th>
          <th className="p-2">Tip. Grup</th>
          <th className="p-2">Periodo</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
