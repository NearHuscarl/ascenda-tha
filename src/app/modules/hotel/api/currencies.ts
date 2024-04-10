import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { delay } from "app/helpers/delay";
import { randomBetween } from "app/helpers/lang";

export type TCurrency = string;

export const getCurrencies = async () => {
  await delay(randomBetween(50, 400));

  return ["USD", "SGD", "CNY", "KRW"] as TCurrency[];
};

type TUseCurrencyOptions = {
  config?: UseQueryOptions<TCurrency[]>;
};

export const useCurrencies = ({ config }: TUseCurrencyOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });
};
