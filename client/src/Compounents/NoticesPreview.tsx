import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../helpers/getCookie";
import NoticesIn from "../Interfaces/noticesIn";
import LoadingSection from "./LoadingSection";
import NoticeCard from "./NoticeCard";

export default function NoticesPreview() {

  const [listNotices, setListNotices] = useState<NoticesIn[]>([
    {
      id: 0,
      title: "",
      image: "",
      description: "",
    },
  ]);
  const [loadLostNotices, setLoadLostNotices] = useState(false);
  const token = getCookie("token");

  useEffect(() => {
    async function getNotices() {
      try {
        const reqNotices = await axios.get("http://localhost:3000/notices", {
          headers: {
            token,
          },
        });
        setListNotices(reqNotices.data);
        setLoadLostNotices(true);
      } catch (e) {
        alert(e);
      }
    }

    getNotices();
  }, []);

  return (
    <div className="w-full">
      <div className="p-4">
          <h1 className="text-orangeLight text-4xl font-Anton ml-24 text-bold">Avisos</h1>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-y-6 gap-x-20">
        {loadLostNotices ? (
          listNotices.slice(0, 6).map((n) => {
            return (
              <NoticeCard
                key={n.id}
                title={n.title}
                image={n.image}
                description={n.description}
                url={"/"}
              />
            );
          })
        ) : (
          <LoadingSection />
        )}
        </div>
        <div className="w-full p-6 text-orangeLight">
            <Link to={"/avisos"} className="block border-transparent border-2 border-b-orangeLight ml-24 w-24 p-2 text-base font-bold">
              Ver todos
            </Link>
        </div>
    </div>
  );
}


