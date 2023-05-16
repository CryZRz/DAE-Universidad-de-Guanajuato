import { Cancel } from "iconoir-react";
import { ReactNode } from "react";

export default function Modal({
  setShowModal,
  showModal,
  title,
  children,
  actionModal,
  zindex,
  width,
}: {
  setShowModal: (p: boolean) => void;
  showModal: boolean;
  title: string;
  children: ReactNode;
  actionModal: () => void;
  zindex: string;
  width: null | string;
}) {
  return (
    <>
      {showModal ? (
        <div
          className={`fixed bg-oceanBlueLight top-0 left-0 right-0 z-${zindex} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal h-screen`}
        >
          <div
            className={`relative w-full h-full mx-auto ${
              width != null ? width : "max-w-2xl"
            } md:h-auto`}
          >
            <div className="relative bg-white rounded-lg dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={(e) => {
                    setShowModal(false);
                  }}
                >
                  <Cancel width={30} height={30} />
                </button>
              </div>
              <div className="p-6 space-y-6">{children}</div>
              <div className="mt-2 p-2 border-t">
                <button
                  className="bg-orangeLight m-2 text-white font-bold px-5 py-2.5 font-medium text-sm rounded-lg"
                  onClick={(e) => {
                    setShowModal(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={actionModal}
                  className="text-white bg-blue-700 m-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
