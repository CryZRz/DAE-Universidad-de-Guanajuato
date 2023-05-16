import {
  Book,
  CreditCard,
  Group,
  UserScan,
  WarningWindow,
  HighPriority,
  User,
  Mirror,
  ReportColumns
} from "iconoir-react";
import { useContext } from "react";
import { DataContextLogin } from "../context/Context";
import NavIcon from "./NavIcon";

export default function HomeMenu() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <div className="w-full">
      <div className="w-full h-600 flex">
        <div className="w-1/2 h-full bg-homeMenuBg bg-cover"></div>
        <div className="w-1/2 h-full flex items-center">
          <div className="w-full h-fit flex justify-center items-center flex-wrap gap-y-6">
            <NavIcon
              route="/kardex"
              text="Kardex"
              icon={
                <Book
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
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
                <Group
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
            />
            <NavIcon
              route="/eventos"
              text="Eventos"
              icon={
                <UserScan
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
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
            {
              dataUser.role == "admin" ?
              <NavIcon
              route="/usuarios"
              text="Usuarios"
              icon={
                <User
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
              />
              :
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
            }
            {
              dataUser.role == "admin" ?
              <NavIcon
              route="/materias"
              text="Materias"
              icon={
                <Mirror
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
              />
              :
              <></>
            }
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
             <NavIcon
              route="/menu"
              text="Mas..."
              icon={
                <ReportColumns
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
