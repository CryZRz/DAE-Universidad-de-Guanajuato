import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultListUser } from "../../helpers/dataDeafult/users";
import { getCookie } from "../../helpers/getCookie";;
import { ListBseUserIn } from "../../Interfaces/TeachersIn";
import LoadingSection from "../LoadingSection";
import Pagination from "../Pagination";
import MenuAddNewUser from "./MenuAddNewUser";

export default function ListUsers() {
  const [loadListUsers, setLoadListUsers] = useState(false);
  const [listUsers, setListUsers] = useState<ListBseUserIn[]>([defaultListUser]);
  const [searchListUsers, setsearchListUsers] = useState<ListBseUserIn[] | []>([]);
  const [showModal, setShowModal] = useState(false);
  const token = getCookie("token");

  async function getListUser(start: number, end: number) {
    try {
      setLoadListUsers(false);
      const reqListUsers = await axios.get(
        `http://localhost:3000/admin/users?start=${start}&end=${end}`,
        {
          headers: {
            token,
          },
        }
      );
      setListUsers(reqListUsers.data);
      setsearchListUsers(reqListUsers.data);
      setLoadListUsers(true);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getListUser(0, 20);
  }, []);

  function seacrhUser({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    const usersFilter = listUsers.filter(
      (u) =>
        u.name.concat(u.lastName).toLowerCase().includes(value.toLowerCase()) ||
        u.id == parseInt(value)
    );
    setsearchListUsers(usersFilter);
  }

  function filterListUser({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) {
    if (value != "") {
      const usersFilter = listUsers.filter((u) => u.role == value);
      return setsearchListUsers(usersFilter);
    }

    return setsearchListUsers(listUsers);
  }

  return (
    <div className="w-full mt-6 mb-6">
      <MenuAddNewUser
        showMenu={showModal}
        setShowMenu={setShowModal}
      />
      <div className="w-4/5 mx-auto flex justify-between">
        <div className="flex items-center">
          <input
            placeholder="buscar(id-nombre)"
            className="border-2 outline-none border-orangeLight text-orangeLight"
            type="text"
            onChange={seacrhUser}
          />
          <select
            onChange={filterListUser}
            className="bg-orangeLight text-white outlione-none"
          >
            <option value="">Filtrar</option>
            <option value="teacher">Maestros</option>
            <option value="student">Estudiantes</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button
          onClick={(e) => {
            setShowModal(true);
          }}
          className="bg-orangeLight p-2 text-white font-bold"
        >
          Agregar usuario
        </button>
      </div>
      {loadListUsers ? (
        <table className="w-4/5 mx-auto mt-2 shadow-3xl shadow-oceanBlue text-sm rounded-md text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-center text-white uppercase bg-oceanBlue dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 ">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Apellidos
              </th>
              <th scope="col" className="px-6 py-3">
                Imagen
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {searchListUsers.map((u) => {
              return (
                <tr key={u.id}>
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.lastName}</td>
                  <td className="p-2">
                    <div className="flex items-center justify-center">
                      <Link to={`/usuario/${u.id}`} className="w-12 h-12">
                        <img
                          className="rounded-full w-full h-full"
                          src={`http://localhost:3000/static/images/profiles/${u.image}`}
                          alt=""
                        />
                      </Link>
                    </div>
                  </td>
                  <td className="p-2">{u.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <LoadingSection />
      )}
      <Pagination
        start={0}
        end={20}
        fetchingData={getListUser}
        isLoading={!loadListUsers}
      />
    </div>
  );
}
