import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import jsCookie from "js-cookie"
import { DataContextLogin } from "../context/Context";

const Header = () => {

  const {dataUser} = useContext(DataContextLogin)
  const navigate = useNavigate()
  const [showMenu, setShowmenu] = useState(false);

  function showMenuChnage() {
    setShowmenu(!showMenu);
  }

  function outSession(){
    jsCookie.remove("token")
    navigate("/")
  }

  return (
    <>
      <header className="main-hader w-full fixed z-10">
        <nav className="pt-4 pb-4 bg-oceanBlue">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <div className="flex items-center">
              <Link className="go-page-home" to="/inicio">
                <h3 className="text-white font-bold text-2xl mr-2">
                {
                dataUser.role == "admin" ?
                "Panel de administrador"
                :
                "Panel de estudiante"
                }
                  
                </h3>
              </Link>
                <h3 className="text-orangeLight text-2xl  font-bold">
                  BACHILLERATO GENERAL
                </h3>
            </div>
            <button
              onClick={showMenuChnage}
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className={`${showMenu ? "" : "hidden"} w-full`}>
              <ul className="flex flex-col mt-4 bg-oceanBlue text-white font-mono">
                <li>
                  <div className="flex items-center p-2 hover:bg-orangeLight">
                    <div className="w-12 h-12">
                      <img
                        className="rounded-full w-full h-full"
                        src={`http://localhost:3000/static/images/profiles/${dataUser.image}`}
                        alt={`image user ${dataUser.name}`}
                      />
                    </div>
                    <Link to={`/profile/${dataUser.id}`}>
                      <h3 className="inline ml-2">
                        {dataUser.name} {dataUser.lastName}
                      </h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 pl-3 pr-4 hover:bg-orangeLight"
                  >
                    Inicio
                  </Link>
                </li>
                {
                  dataUser.role == "admin" ? 
                  <li>
                    <Link
                      to={"/crendencial"}
                      className="block py-2 pl-3 pr-4 hover:bg-orangeLight"
                    >
                      Usuarios
                    </Link>
                  </li>
                  :
                  <></>
                }
                {
                  dataUser.role == "admin" ?
                  <li>
                    <Link
                      to={"/regularizaciones"}
                      className="block py-2 pl-3 pr-4 hover:bg-orangeLight"
                    >
                      Materias
                    </Link>
                  </li>
                  :
                  <></>
                }
                <li>
                  <Link
                    to={"/crendencial"}
                    className="block py-2 pl-3 pr-4 hover:bg-orangeLight"
                  >
                    Credencial
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/altasybajas"}
                    className="block py-2 pl-3 pr-4 hover:bg-orangeLight"
                  >
                    Altas y Bajas
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/regularizaciones"}
                    className="block py-2 pl-3 pr-4 hover:bg-orangeLight"
                  >
                    Regularizaciones
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/expediente"}
                    className="block py-2 pl-3 pr-4 hover:bg-orangeLight"
                  >
                    Expediente
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/publicaciones"}
                    className="block py-2 pl-3 pr-4 hover:bg-orangeLight"
                  >
                    Publicaciones
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/eventos"}
                    className="block py-2 pl-3 pr-4 hover:bg-orangeLight"
                  >
                    Eventos
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={outSession}
                    className="block w-full text-start py-2 pl-3 pr-4 hover:bg-orangeLight pointer">
                    Cerrar sesion
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
