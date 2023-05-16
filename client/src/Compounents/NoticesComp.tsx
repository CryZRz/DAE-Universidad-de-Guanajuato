import axios from 'axios';
import { ArrowRight, ArrowLeft } from 'iconoir-react';
import { useEffect, useState } from 'react'
import { getCookie } from '../helpers/getCookie';
import NoticesIn from '../Interfaces/noticesIn';
import LoadingSection from './LoadingSection';
import NoticeCard from './NoticeCard';


export default function NoticesComp() {

    const [listNotices, setListNotices] = useState<NoticesIn[]>([
        {
          id: 0,
          title: "",
          image: "",
          description: "",
        },
      ]);
      const [loadLostNotices, setLoadLostNotices] = useState(false);
      const [indexStart, setIndexStart] = useState(0)
      const [indexEnd, setIndexEnd] = useState(6)
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

      function changeIndexStart(){
        setIndexStart(indexStart-6)
        setIndexEnd(indexEnd-6)
      }

      function changeIndexEnd(){
        setIndexStart(indexStart+6)
        setIndexEnd(indexEnd+6)
      }

  return (
    <div className='w-full'>
        <div className='w-11/12 my-6 mx-auto flex items-center justify-center flex-wrap gap-y-6 gap-x-20'>
        <div className="w-full text-center">
            <h1 className="text-orangeLight text-4xl font-bold">Avisos</h1>
        </div>
            {
                loadLostNotices ? 
                    listNotices.slice(indexStart, indexEnd).map(n => {
                        return <NoticeCard
                            key={n.id}
                            title={n.title}
                            image={n.image}
                            description={n.description}
                            url={"/"}
                        />
                    })
                :
                <LoadingSection/>
            }
            <div className='w-full flex justify-center'>
                {
                    indexStart <= 0 ?
                    <button className='p-4 bg-zinc-500 m-2'>
                        <ArrowLeft width={20} height={20} color={"#ffff"} />
                    </button>
                    :
                    <button onClick={changeIndexStart} className='p-4 bg-orangeLight m-2'>
                        <ArrowLeft width={20} height={20} color={"#ffff"} />
                    </button>
                }
                {
                    indexEnd >= listNotices.length ?
                    <button  className='p-4 bg-zinc-500 m-2'>
                        <ArrowRight width={20} height={20} color={"#ffff"} />
                    </button>
                    :
                    <button onClick={changeIndexEnd} className='p-4 bg-orangeLight m-2'>
                        <ArrowRight width={20} height={20} color={"#ffff"} />
                    </button>
                }
            </div>
        </div>
    </div>
  )
}
