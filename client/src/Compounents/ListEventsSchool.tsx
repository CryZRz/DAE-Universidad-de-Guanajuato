import { useEffect, useState } from "react";
import axios from "axios";

import { getCookie } from "../helpers/getCookie";
import { ListEventsIn } from "../Interfaces/Home";
import LoadingSection from "./LoadingSection";
import { Link } from "react-router-dom";

export default function ListEventsSchool() {

  const [loadListEvents, setLoadListEvents] = useState(false)
  const [listEvents, setListEvents] = useState<ListEventsIn[]>([
    {
      title : "",
      description : "",
      image : ""
    }
  ])

  useEffect(() => {
    const getToken = getCookie("token");
    async function getEventsSchool(){
      try {
        const reqEvents = await axios.get("http://localhost:3000/eventsschool",{
        headers: {
          token: getToken
        }
      })
      console.log(reqEvents)
      setListEvents(reqEvents.data)
      setLoadListEvents(true)
      } catch (e) {
        console.log(e)
      }
    }

    getEventsSchool();

  }, [])

  return (
    <div className="list-events-school-container pb-6 pt-6">
      <div className="list-events-cards-title-content">
        <h1 className="list-events-cards-title text-orangeLight font-Anton text-4xl ml-6">
          Eventos Ug
        </h1>
      </div>
      <div className="list-events-cards flex justify-center items-center flex-wrap">
        {
          loadListEvents ? 
          listEvents.slice(0,6).map(e => {
            return <Link to={"/"} className="flex shadow-2xl m-4 flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={e.image} alt=""/>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight  text-orangeLight">{e.title}</h5>
                <p className="mb-3 font-normal font-mono text-gray-700 dark:text-gray-400">{e.description.slice(0, 100)}{e.description.length >= 100 ? "..." : ""}</p>
            </div>
        </Link>
          })
          :
          <LoadingSection/>
        }
        <div className="w-full p-6 text-orangeLight">
            <Link to={"/eventos"} className="border-transparent border-2 border-b-orangeLight ml-24 w-56 p-2 text-base font-bold">
              Ver todos
            </Link>
        </div>
      </div>
    </div>
  )
}
