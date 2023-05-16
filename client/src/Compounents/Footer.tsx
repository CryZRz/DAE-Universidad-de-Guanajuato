import { Link } from "react-router-dom";
import ugEscudoSm from "../assets/images/escudo-ug-small-gold.png"

export default function Footer() {
  return (
    <footer className="p-4 bg-oceanBlue shadow md:px-6 md:py-8 dark:bg-gray-900">
      <div className="flex items-center h-38 justify-between">
        <Link
          to={"/inicio"}
          className="flex items-center mb-4 sm:mb-0"
        >
          <img
            src={ugEscudoSm}
            className="h-12 mr-3"
            alt="logo ug"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            SIIA
          </span>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-orangeLight">
            UG
          </span>
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <Link
                to={"/"}
                className="mr-4 md:mr-6 ">
              Inicio
            </Link>
          </li>
          <li>
            <Link
                to={"/"}
                className="mr-4 md:mr-6">
              Eventos
            </Link>
          </li>
          <li>
            <Link
                to={"/"}
                className="mr-4 md:mr-6">
              Kardex
            </Link>
          </li>
          <li>
            <Link
                to={"/"}
                className="mr-4  md:mr-6">
              Avisos
            </Link>
          </li>
          <li>
            <Link
                to={"/"}
                className="mr-4  md:mr-6">
              Contacto
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-orangeLight sm:mx-auto lg:my-8" />
      <span className="block font-Lobster text-xl text-gray-500 sm:text-center text-white">
        © Designed by CryZRz.
      </span>
    </footer>
  );
}
