import { ArrowRight } from "iconoir-react";
import { Link } from "react-router-dom"

export default function NoticeCard({
  image,
  title,
  description,
  url,
}: {
  image: string;
  title: string;
  description: string;
  url: string;
}) {
  return (
    <div className="max-w-sm w-80 bg-white shadow-3xl rounded-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-orangeLight">
      <Link to={url}>
        <img
          className="rounded w-full h-36"
          src={`http://localhost:3000/static/images/notices/${image}`}
          alt=""
        />
      </Link>
      <div className="p-5">
        <Link to={url}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-mono text-gray-700 dark:text-gray-400">
          {description.slice(0, 100)}
        </p>
        <Link
          to={url}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-orangeLight rounded-lg"
        >
          <span className="text-white">Leer mas</span>
          <ArrowRight width={20} height={20} color={"#ffff"} />
        </Link>
      </div>
    </div>
  );
}
