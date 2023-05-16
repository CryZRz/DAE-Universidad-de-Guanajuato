import {
  Book,
  CreditCard,
  Group,
  UserScan,
  WarningWindow,
  HighPriority,
  User,
  Mirror,
  StatsReport,
  AddFrame,
  AddKeyframe
} from "iconoir-react";
import { useContext } from "react";
import { DataContextLogin } from "../context/Context";
import NavIcon from "./NavIcon";

export default function NavegationMenu() {
  const { dataUser } = useContext(DataContextLogin);

  return (
    <div className="w-full h-fit flex justify-center items-center flex-wrap gap-y-6 my-6">
      <NavIcon
        route="/kardex"
        text="Kardex"
        icon={
          <Book className="m-auto" width={75} height={75} color={"#ffff"} />
        }
        style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
      />
      <NavIcon
        route="/credencial"
        text="Credencial"
        icon={
          <CreditCard
            className="m-auto"
            width={75}
            height={75}
            color={"#ffff"}
          />
        }
        style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
      />
      <NavIcon
        route="/publicaciones"
        text="Publicaciones"
        icon={
          <Group className="m-auto" width={75} height={75} color={"#ffff"} />
        }
        style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
      />
      <NavIcon
        route="/eventos"
        text="Eventos"
        icon={
          <UserScan className="m-auto" width={75} height={75} color={"#ffff"} />
        }
        style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
      />
      <NavIcon
        route="/avisos"
        text="Avisos"
        icon={
          <WarningWindow
            className="m-auto"
            width={75}
            height={75}
            color={"#ffff"}
          />
        }
        style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
      />
      {dataUser.role == "admin" ? (
        <NavIcon
          route="/usuarios"
          text="Usuarios"
          icon={
            <User className="m-auto" width={75} height={75} color={"#ffff"} />
          }
          style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
        />
      ) : (
        <NavIcon
          route="/inicio"
          text="Regularizaciones"
          icon={
            <HighPriority
              className="m-auto"
              width={75}
              height={75}
              color={"#ffff"}
            />
          }
          style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
        />
      )}
      {dataUser.role == "admin" ? (
        <NavIcon
          route="/materias"
          text="Materias"
          icon={
            <Mirror className="m-auto" width={75} height={75} color={"#ffff"} />
          }
          style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
        />
      ) : (
        <></>
      )}
      <NavIcon
        route="/altasbajas"
        text="Atas y Bajas"
        icon={
          <HighPriority
            className="m-auto"
            width={75}
            height={75}
            color={"#ffff"}
          />
        }
        style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
      />
      {dataUser.role == "admin" ? (
        <NavIcon
          route="/periodos"
          text="Periodos"
          icon={
            <HighPriority
              className="m-auto"
              width={75}
              height={75}
              color={"#ffff"}
            />
          }
          style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
        />
      ) : (
        <></>
      )}
      {dataUser.role == "admin" ? (
        <NavIcon
          route="/cursos"
          text="Cursos"
          icon={
            <StatsReport
              className="m-auto"
              width={75}
              height={75}
              color={"#ffff"}
            />
          }
          style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
        />
      ) : (
        <></>
      )}
      {dataUser.role == "admin" ? (
        <NavIcon
          route="/materias"
          text="Materias"
          icon={
            <AddFrame
              className="m-auto"
              width={75}
              height={75}
              color={"#ffff"}
            />
          }
          style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
        />
      ) : (
        <></>
      )}
      {dataUser.role == "admin" ? (
        <NavIcon
          route="/horarios"
          text="Horarios"
          icon={
            <AddKeyframe
              className="m-auto"
              width={75}
              height={75}
              color={"#ffff"}
            />
          }
          style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
