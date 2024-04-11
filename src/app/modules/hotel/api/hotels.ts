import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { TCurrency } from "./currencies";
import { getCurrencyFormatter } from "app/helpers/currency";

export type THotelDto = {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
};

export const getHotelListings = async () => {
  const res = await fetch(`${BASE_URL}/hotels/tokyo`);
  const json = await res.json();

  return json as THotelDto[];
};

export type TPriceDto = {
  id: number;
  price: number;
  competitors?: Record<string, number>;
};

export const getPrices = async (currency: TCurrency) => {
  const res = await fetch(`${BASE_URL}/hotels/tokyo/1/${currency}`);
  const json = await res.json();

  return json as TPriceDto[];
};

export type THotel = {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
  price: string;
};

const sortSymbol = Symbol("sort");

export const getHotels = async (currency: TCurrency) => {
  const [hotels, prices] = await Promise.all([
    getHotelListings(),
    getPrices(currency),
  ]);
  const priceLookup = Object.fromEntries(
    prices.map((price) => [price.id, price])
  );
  const formatter = getCurrencyFormatter(currency);

  return hotels
    .map((hotel) => {
      const price = priceLookup[hotel.id]?.price ?? -1;
      return {
        ...hotel,
        price: price > -1 ? formatter.format(price) : "Rates unavailable",
        [sortSymbol]: price > -1 ? 0 : 1,
      };
    })
    .sort((a, b) => a[sortSymbol] - b[sortSymbol]) as THotel[];
};

type TUseHotelOptions = {
  currency?: TCurrency;
};

export const useHotels = ({ currency }: TUseHotelOptions = {}) => {
  return useQuery({
    queryKey: ["hotels", currency ?? "USD"],
    queryFn: (context) => getHotels(context.queryKey[1]),
  });
};
