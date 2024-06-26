import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Rating from "@mui/material/Rating";
import { THotel } from "../api/hotels";
import { useFilterStore } from "../stores/filters";

type THotelListItemProps = {
  hotel: THotel;
};

export function HotelListItem(props: THotelListItemProps) {
  const { hotel } = props;
  const navigate = useNavigate();
  const { updateLastVisitedHotel } = useFilterStore();

  return (
    <div
      className="p-6 bg-white rounded shadow flex gap-6"
      data-testid={`hotel-item-${hotel.id}`}
    >
      <div className="flex-none w-72 h-full">
        <img src={hotel.photo} alt={hotel.name} className="object-cover" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1
            className="font-bold text-2xl mb-0.5"
            onClick={() => {
              navigate(`/hotels/${hotel.id}`);
              updateLastVisitedHotel(hotel);
            }}
          >
            {hotel.name}
          </h1>
          <p className="text-sm text-gray-500 mb-1">{hotel.address}</p>
          <div className="overflow-hidden line-clamp-2 text-clip">
            {ReactHtmlParser(hotel.description)}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Rating className="mt-[-4px]" value={hotel.stars} readOnly />
            <span className="font-bold">{hotel.rating}/10</span>
          </div>
          <p
            className="bg-green-50 px-1.5 py-0.5 rounded text-green-500 font-medium"
            data-testid={`price`}
          >
            {hotel.price}
          </p>
        </div>
      </div>
    </div>
  );
}
