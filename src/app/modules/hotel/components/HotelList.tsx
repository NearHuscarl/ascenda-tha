import { useHotels } from "../api/hotels";
import { useFilterStore } from "../stores/filters";
import { HotelListItem } from "./HotelListItem";

export function HotelList() {
  const currency = useFilterStore((state) => state.currency);
  const { data: hotels = [] } = useHotels({ currency });

  if (!hotels.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-auto flex flex-col gap-4">
      {hotels.map((hotel) => (
        <HotelListItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
