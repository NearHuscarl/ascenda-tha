import ReactHtmlParser from "react-html-parser";
import { Link, useLoaderData } from "react-router-dom";
import { THotel } from "../hotel/api/hotels";

export function HotelDetail() {
  const { name, address, description } = useLoaderData() as THotel;

  return (
    <div className="max-w-6xl mx-auto p-3">
      <Link to="/">Back</Link>
      <h1 className="font-bold text-2xl mb-0.5">{name}</h1>
      <p className="text-sm text-gray-500 mb-1">{address}</p>
      <div className="overflow-hidden line-clamp-2 text-clip">
        {ReactHtmlParser(description)}
      </div>
    </div>
  );
}
