import { Layout } from "app/shared/Layout";
import { Filters } from "../components/Filters";
import { HotelList } from "../components/HotelList";

export function Hotel() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto flex flex-col py-10 gap-6 h-screen">
        <Filters />
        <HotelList />
      </div>
    </Layout>
  );
}
