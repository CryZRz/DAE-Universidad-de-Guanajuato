import { useState, useEffect } from "react";
import axios from "axios";
import { ListEventsIn } from "../Interfaces/Home";
import { getCookie } from "../helpers/getCookie";
import LoadingSection from "./LoadingSection";
import CardEvent from "./CardEvent";
import { ArrowLeft, ArrowRight } from "iconoir-react";

export default function EventsComp() {
  const [loadListEvents, setLoadListEvents] = useState(false);
  const [listEvents, setListEvents] = useState<ListEventsIn[]>([
    {
      title: "",
      description: "",
      image: "",
    },
  ]);
  const [indexStart, setIndexStart] = useState(0);
  const [indexEnd, setIndexEnd] = useState(6);

  useEffect(() => {
    const getToken = getCookie("token");
    async function getEventsSchool() {
      try {
        const reqEvents = await axios.get(
          "http://localhost:3000/eventsschool",
          {
            headers: {
              token: getToken,
            },
          }
        );
        console.log(reqEvents);
        setListEvents(reqEvents.data);
        setLoadListEvents(true);
      } catch (e) {
        console.log(e);
      }
    }

    getEventsSchool();
  }, []);

  function changeIndexStart() {
    setIndexStart(indexStart - 6);
    setIndexEnd(indexEnd - 6);
  }

  function changeIndexEnd() {
    setIndexStart(indexStart + 6);
    setIndexEnd(indexEnd + 6);
  }

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto my-4 flex justify-center items-center flex-wrap">
        <div className="w-full text-center">
            <h1 className="text-orangeLight text-4xl font-bold">Eventos</h1>
        </div>
        {loadListEvents ? (
          listEvents.slice(indexStart, indexEnd).map((e, i) => {
            return (
              <CardEvent
                key={i}
                title={e.title}
                image={e.image}
                description={e.description}
                url={"/"}
              />
            );
          })
        ) : (
          <LoadingSection />
        )}
        <div className="w-full flex justify-center">
          {indexStart <= 0 ? (
            <button className="p-4 bg-zinc-500 m-2">
              <ArrowLeft width={20} height={20} color={"#ffff"} />
            </button>
          ) : (
            <button
              onClick={changeIndexStart}
              className="p-4 bg-orangeLight m-2"
            >
              <ArrowLeft width={20} height={20} color={"#ffff"} />
            </button>
          )}
          {indexEnd >= listEvents.length ? (
            <button className="p-4 bg-zinc-500 m-2">
              <ArrowRight width={20} height={20} color={"#ffff"} />
            </button>
          ) : (
            <button onClick={changeIndexEnd} className="p-4 bg-orangeLight m-2">
              <ArrowRight width={20} height={20} color={"#ffff"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
