import { Layout } from "app/shared/Layout";
import { Filters } from "../components/Filters";
import { HotelList } from "../components/HotelList";
import { useFilterStore } from "../stores/filters";

export function Hotel() {
  const { lastVisitedHotels } = useFilterStore();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto flex flex-col py-10 gap-6 h-screen">
        <Filters />
        <ul>
          {lastVisitedHotels.map((v) => (
            <li key={v.id}>{v.name}</li>
          ))}
        </ul>
        <HotelList />
      </div>
    </Layout>
  );
}
