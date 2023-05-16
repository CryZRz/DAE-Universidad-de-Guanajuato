import axios from 'axios';
import { CloudUpload } from 'iconoir-react';
import {ChangeEvent, useState} from 'react'
import { defaultTeam } from '../../helpers/dataDeafult/team';
import { getCookie } from '../../helpers/getCookie';
import { validateEmail } from '../../helpers/validates';
import { TeamIn } from '../../Interfaces/SubjectIn';
import Modal from '../Modal';

export default function MenuAddNewUser({
    showMenu,
    setShowMenu,
    zindex
} : {
    showMenu: boolean;
    setShowMenu: (p: boolean) => void;
    zindex?: string;
}) {

    const [saveImageUser, setSaveImageUser] = useState<File | null>(null);
  const [saveDataUser, setSaveDataUser] = useState({
    name: "",
    email: "",
    lastName: "",
    password: "",
    verifyPassword: "",
    direction: "",
    role: "teacher",
    teamId: 0,
    semesterId: 0,
  });
  const [showOptionsUser, setShowOptionsUser] = useState(false);
  const [saveListTeams, setSaveListTeams] = useState<TeamIn[]>([defaultTeam]);
  const token = getCookie("token");

    async function sendDataUser() {
        if (Object.values(saveDataUser).includes("")) {
          return alert("no puedes enviar datos vacios");
        } else if (!validateEmail(saveDataUser.email)) {
          return alert("el email es invalido");
        } else if (saveDataUser.password != saveDataUser.verifyPassword) {
          return alert("las contraseñas son distintas");
        } else if (saveDataUser.role == "student" && saveDataUser.teamId == 0) {
          return alert("debes elegir un grupo");
        } else if (saveDataUser.role == "student" && saveDataUser.semesterId == 0) {
          return alert("debes elegir un grupo");
        } else if (saveImageUser == null) {
          return alert("no has subido ninguna imagen");
        } else {
          const formDataUser = new FormData();
          formDataUser.append("name", saveDataUser.name);
          formDataUser.append("lastName", saveDataUser.lastName);
          formDataUser.append("email", saveDataUser.email);
          formDataUser.append("password", saveDataUser.password);
          formDataUser.append("direction", saveDataUser.direction);
          formDataUser.append("role", saveDataUser.role);
          formDataUser.append("teamId", saveDataUser.teamId.toString());
          formDataUser.append("semesterId", saveDataUser.semesterId.toString());
          formDataUser.append("image", saveImageUser);
    
          try {
            await axios.post(
              "http://localhost:3000/admin/registeruser",
              formDataUser,
              {
                headers: {
                  token,
                },
              }
            );
            alert("usuario creado correctamente");
          } catch (e) {
            alert(e);
          }
        }
      }
    
      function handleSaveImageUser({
        target: { files },
      }: ChangeEvent<HTMLInputElement>) {
        if (files) {
          const fileImage = files[0]!;
          if (
            !fileImage.type.startsWith("image/") ||
            fileImage.size > 20 * 1000000
          ) {
            return alert("solo puedes poner imagenes y menores a 20mb");
          }
          setSaveImageUser(fileImage);
        }
      }
    
      function handleChangeDataUser({
        target: { value, name },
      }: ChangeEvent<HTMLInputElement>) {
        setSaveDataUser({ ...saveDataUser, [name]: value });
      }
    
      async function getListTeams() {
        try {
          const reqListTeams = await axios.get(
            "http://localhost:3000/admin/teams",
            {
              headers: {
                token,
              },
            }
          );
          setSaveListTeams(reqListTeams.data);
          setShowOptionsUser(true);
        } catch (e) {
          alert(e);
        }
      }

    function handleRoleUser({
        target: { value },
      }: ChangeEvent<HTMLSelectElement>) {
        if (value == "student") {
          getListTeams();
        } else {
          setShowOptionsUser(false);
        }
        setSaveDataUser({ ...saveDataUser, ["role"]: value });
      }
    
      function handleChangeTeam({
        target: { value },
      }: ChangeEvent<HTMLSelectElement>) {
        setSaveDataUser({ ...saveDataUser, ["teamId"]: parseInt(value) });
      }
    
      function handleChangeSemester({
        target: { value },
      }: ChangeEvent<HTMLSelectElement>) {
        setSaveDataUser({ ...saveDataUser, ["semesterId"]: parseInt(value) });
      }

  return (
    <Modal
        showModal={showMenu}
        setShowModal={setShowMenu}
        actionModal={sendDataUser}
        title="Registrar usuario"
        width={null}
        zindex={zindex != undefined ? zindex : "10"}
      >
        <form>
          {saveImageUser != null ? (
            <div className="w-full flex items-center justify-center">
              <div className="h-36 w-36 mb-4">
                <img
                  className="w-full h-full rounded-t-full"
                  src={URL.createObjectURL(saveImageUser)}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudUpload />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click para subir imagen</span>{" "}
                  o arrastrar
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 20mb)
                </p>
              </div>
              <input
                id="dropzone-file"
                onChange={handleSaveImageUser}
                type="file"
                className="hidden"
              />
            </label>
          </div>
          <div className="flex w-full">
            <input
              onChange={handleChangeDataUser}
              name="name"
              className="w-1/2 border-2 border-transparent border-b-orangeLight outline-none m-2 p-2"
              type="text"
              placeholder="Nombre"
            />
            <input
              onChange={handleChangeDataUser}
              name="lastName"
              className="w-1/2 border-2 border-transparent border-b-orangeLight outline-none m-2 p-2"
              type="text"
              placeholder="Apellidos"
            />
          </div>
          <div className="w-full">
            <input
              onChange={handleChangeDataUser}
              name="email"
              className="w-full border-2 border-transparent border-b-orangeLight outline-none m-2 p-2"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              onChange={handleChangeDataUser}
              name="password"
              className="w-full border-2 border-transparent border-b-orangeLight outline-none m-2 p-2"
              type="password"
              placeholder="Contraseña"
            />
          </div>
          <div>
            <input
              onChange={handleChangeDataUser}
              name="verifyPassword"
              className="w-full border-2 border-transparent border-b-orangeLight outline-none m-2 p-2"
              type="password"
              placeholder="Contraseña"
            />
          </div>
          <div>
            <input
              onChange={handleChangeDataUser}
              name="direction"
              className="w-full border-2 border-transparent border-b-orangeLight outline-none m-2 p-2"
              type="text"
              placeholder="Direccion"
            />
          </div>
          <div>
            <select
              onChange={handleRoleUser}
              className="w-full border-2 border-transparent border-b-orangeLight outline-none m-2 p-2"
            >
              <option value="teacher">Maestro</option>
              <option value="student">Estudiante</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          {showOptionsUser ? (
            <div>
              <select
                onChange={handleChangeTeam}
                className="w-full border-2 border-transparent border-b-orangeLight outline-none m-2 p-2"
              >
                <option>Grupo</option>
                {saveListTeams.map((t) => {
                  return (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  );
                })}
              </select>
              <select
                onChange={handleChangeSemester}
                className="w-full border-2 border-transparent border-b-orangeLight outline-none m-2 p-2"
              >
                <option>Semestre</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          ) : (
            <></>
          )}
        </form>
      </Modal>
  )
}
