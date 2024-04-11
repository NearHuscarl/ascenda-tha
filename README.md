# Take Home Assignment

## Getting Started

```
yarn
yarn dev
```

## Testing

```
yarn test
```

## What have you done so far?

- [x] ([Code](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/api/hotels.ts#L64)|[Test](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/routes/Hotel.test.tsx#L164-L169)) When I do not have prices returned for the currency, that means the rates are unavailable for that hotel
- [x] ([Code](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/api/hotels.ts#L68)|[Test](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/routes/Hotel.test.tsx#L171-L184)) If the hotel details exist but not the prices, then show that hotel result has having "Rates unavailable" and push that result to the bottom of the list
- [x] ([Code](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/api/hotels.ts#L59-L68)|[Test](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/routes/Hotel.test.tsx#L187-L191)) If the hotel details do not exist, but prices do, do not display that hotel
- [x] ([Code](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/stores/filters.ts#L10-L18)) When I refresh the page, the results should show in the last currency selected
- [x] ([Code](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/stores/filters.ts#L12)|[Test](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/routes/Hotel.test.tsx#L194-L207)) Default the currency searched to USD if no currency was last selected
- [x] Hotel prices in the results page are typically rounded
  - [x] ([Code](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/helpers/currency.ts#L17-L24)|[Test](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/routes/Hotel.test.tsx#L209-L224)) Currencies like USD, SGD, CNY are rounded to their nearest dollar. E.g. USD 100.21 is displayed as USD 100
  - [x] ([Code](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/helpers/currency.ts#L25-L37)|[Test](https://github.com/NearHuscarl/ascenda-tha/blob/91f929f6c8ccb83a9220b97c2267e5c0e3b8914c/src/app/modules/hotel/routes/Hotel.test.tsx#L226-L233)) Currencies like KRW, JPY, IDR are rounded to their nearest 100-dollars. E.g. KRW 300123.22 is displayed as KRW 300,100

## What would you have done if you had more time?

- [ ] Responsive layout?
- [ ] Setup basic CI/CD workflow

## How many hours you actually spent finishing the assignment?

- ~4-5 hours
