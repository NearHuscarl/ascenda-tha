import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { QueryProvider } from "app/providers/QueryProvider";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { BASE_URL } from "../config";
import { Hotel } from "./Hotel";
import { useFilterStore } from "../stores/filters";

const handlers = [
  http.get(`${BASE_URL}/hotels/tokyo`, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Test Hotel 1",
        rating: 8.5,
        stars: 4,
        address: "123 Test Street",
        photo: "test-photo-1.jpg",
        description: "A great place to stay",
      },
      {
        id: 2,
        name: "Test Hotel 2",
        rating: 9.2,
        stars: 5,
        address: "456 Another Street",
        photo: "test-photo-2.jpg",
        description: "Luxurious and comfortable",
      },
      {
        id: 3,
        name: "Test Hotel 3",
        rating: 7.5,
        stars: 3,
        address: "789 Different Street",
        photo: "test-photo-3.jpg",
        description: "A budget-friendly option",
      },
    ]);
  }),
  http.get(`${BASE_URL}/hotels/tokyo/1/USD`, () => {
    return HttpResponse.json([
      {
        id: 1,
        price: 100.49,
      },
      {
        id: 3,
        price: 200.3444,
      },
      {
        id: 4,
        price: 500,
      },
    ]);
  }),
  http.get(`${BASE_URL}/hotels/tokyo/1/SGD`, () => {
    return HttpResponse.json([
      {
        id: 1,
        price: 120.05,
      },
      {
        id: 3,
        price: 240.5,
      },
      {
        id: 4,
        price: 550,
      },
    ]);
  }),
  http.get(`${BASE_URL}/hotels/tokyo/1/CNY`, () => {
    return HttpResponse.json([
      {
        id: 1,
        price: 800229991.356,
      },
      {
        id: 3,
        price: 4701.2002,
      },
      {
        id: 4,
        price: 3000,
      },
    ]);
  }),
  http.get(`${BASE_URL}/hotels/tokyo/1/KRW`, () => {
    return HttpResponse.json([
      {
        id: 1,
        price: 134434.8,
      },
      {
        id: 2,
        price: 942163.89,
      },
      {
        id: 3,
        price: 173644.95,
      },
    ]);
  }),
];
const server = setupServer(...handlers);

describe("Hotel", () => {
  const initialStoreState = useFilterStore.getState();

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    useFilterStore.setState(initialStoreState, true);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  const renderApp = async () => {
    const res = render(
      <QueryProvider>
        <Hotel />
      </QueryProvider>
    );
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());

    return res;
  };

  const getPrice = (hotelId: number) => {
    const hotelEl = screen.getByTestId(`hotel-item-${hotelId}`);
    return within(hotelEl).getByTestId("price");
  };

  const selectCurrency = async (currency: string) => {
    const select = await screen.findByRole("combobox");
    await userEvent.click(select);

    const listbox = await screen.findByRole("listbox");
    await waitFor(() => userEvent.click(within(listbox).getByText(currency)));
  };

  test("renders hotel list correctly", async () => {
    await renderApp();

    expect(screen.getByText("A great place to stay")).toBeInTheDocument();
    expect(screen.getByText("123 Test Street")).toBeInTheDocument();
    expect(screen.getByAltText("Test Hotel 1").getAttribute("src")).toBe(
      "test-photo-1.jpg"
    );
  });

  describe("currency not available", () => {
    test("displays `Rates unavailable` if the hotel details exist", async () => {
      await renderApp();

      expect(getPrice(1)).toHaveTextContent("$100");
      expect(getPrice(2)).toHaveTextContent("Rates unavailable");
    });

    test("hotels without rate are at the bottom", async () => {
      await renderApp();

      const hotelItems = screen.getAllByTestId(
        (_, element) =>
          element?.getAttribute("data-testid")?.startsWith("hotel-item-") ??
          false
      );
      const ids = hotelItems.map((item) =>
        Number(item.getAttribute("data-testid")?.replace("hotel-item-", ""))
      );

      expect(ids).toEqual([1, 3, 2]);
    });
  });

  test("if the hotel details do not exist, but prices do, do not display that hotel", async () => {
    await renderApp();

    expect(screen.queryByTestId(`hotel-item-${4}`)).not.toBeInTheDocument();
  });

  describe("currency", async () => {
    test("default currency is USD", async () => {
      await renderApp();

      const select = await screen.findByDisplayValue("USD");
      expect(select).toBeInTheDocument();

      expect(getPrice(1)).toHaveTextContent("$100");
      expect(getPrice(3)).toHaveTextContent("$200");

      await selectCurrency("USD");

      expect(getPrice(1)).toHaveTextContent("$100");
      expect(getPrice(3)).toHaveTextContent("$200");
    });

    test("currencies like USD, SGD, CNY are rounded to their nearest dollar", async () => {
      await renderApp();

      expect(getPrice(1)).toHaveTextContent("$100");
      expect(getPrice(3)).toHaveTextContent("$200");

      await selectCurrency("SGD");

      expect(getPrice(1)).toHaveTextContent("$120");
      expect(getPrice(3)).toHaveTextContent("$241");

      await selectCurrency("CNY");

      expect(getPrice(1)).toHaveTextContent("¥800,229,991");
      expect(getPrice(3)).toHaveTextContent("¥4,701");
    });

    test("currencies like KRW, JPY, IDR are rounded to their nearest hundred", async () => {
      await renderApp();
      await selectCurrency("KRW");

      expect(getPrice(1)).toHaveTextContent("₩134,400");
      expect(getPrice(2)).toHaveTextContent("₩942,200");
      expect(getPrice(3)).toHaveTextContent("₩173,600");
    });
  });
});
