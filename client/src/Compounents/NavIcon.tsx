import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function NavIcon({icon, text, style, route} : {icon : ReactNode, text : string, style: string, route : string}) {
  return (
    <Link to={route}>
        <div className={`${style} p-4 rounded-xl text-center`}>
            <div>
              <div>
                  {icon}
              </div>
              <div>
                <h3 className='text-white  font-bold'>{text}</h3>
              </div>
            </div>
        </div>
    </Link>
  )
}
