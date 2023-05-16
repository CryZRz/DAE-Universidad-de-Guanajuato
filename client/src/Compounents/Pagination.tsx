import { ArrowLeft, ArrowRight } from "iconoir-react";
import { useState } from "react";

export default function Pagination({
  fetchingData,
  start,
  end,
  isLoading
}: {
  fetchingData: (s: number, e: number) => void;
  start: number;
  end: number;
  isLoading : boolean
}) {
  const [indexStart, setIndexStart] = useState(start);
  const [indexEnd, setIndexEnd] = useState(end);

  function changeIndexStart() {
    setIndexStart(indexStart - end);
    setIndexEnd(indexEnd - end);

    fetchingData(indexStart - end, indexEnd - end)
  }

  function changeIndexEnd() {
    setIndexStart(indexStart + end);
    setIndexEnd(indexEnd + end);

    fetchingData(indexStart + end, indexEnd + end)
  }

  return (
    <div className="w-full flex justify-center">
      {indexStart <= 0 || isLoading ? (
        <button className="p-4 bg-zinc-500 m-2">
          <ArrowLeft width={20} height={20} color={"#ffff"} />
        </button>
      ) : (
        <button onClick={changeIndexStart} className="p-4 bg-orangeLight m-2">
          <ArrowLeft width={20} height={20} color={"#ffff"} />
        </button>
      )}
      {
        isLoading ?
        <button className="p-4 bg-zinc-500 m-2">
          <ArrowRight width={20} height={20} color={"#ffff"} />
        </button>
        :
        <button onClick={changeIndexEnd} className="p-4 bg-orangeLight m-2">
            <ArrowRight width={20} height={20} color={"#ffff"} />
        </button>
      }
    </div>
  );
}
