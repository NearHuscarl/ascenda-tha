# Hotel Results & Currencies task

## Introduction

To write the application you should use JS and any frontend framework that may help you to achieve the display. It should work in the web browser. There should be no/ minimal server side rendering here.

Please push to github and please make sure the code is correct and it has adequate information to run the application.

## Background & Requirements

Whenever you make a search in any hotel site, you get some information about the hotels given your search parameters for display purposes. Typical details included in the hotel are:

- Name
- Address
- Thumbnail
- Star & Review rating
- Description

As we're dealing with a global customer base, customers should be able to view the hotel prices in their own currency. This means allowing the customer to select their preferred currency for search.

The task is to write a simplified version of a hotel result display upon getting the data after a RESTful API call to the backend. You are free to display in the information as you deem fit (most hotel booking sites you give you a good idea of how to display it in a decently nice manner; we don't wish you to spend too much time here for something fanciful as the multi-currency support is the key part of the exercise).

On top of doing up the display of the search results, this task entails a function of allowing us to switch the currency of the results. As a site with a global user base, we have to enable customers to view results in their preferred currency.

It needs to work in a following way:

1. Provide a toggle to select the currency to display in
2. Make the API call to retrieve the relevant prices in it's selected currency
3. Re-render the same results in that currency

Here're some important behaviours to expect when designing this function:

1. When I do not have prices returned for the currency, that means the rates are unavailable for that hotel
1. If the hotel details exist but not the prices, then show that hotel result has having "Rates unavailable" and push that result to the bottom of the list
1. If the hotel details do not exist, but prices do, do not display that hotel
1. When I refresh the page, the results should show in the last currency selected
1. Default the currency searched to USD if no currency was last selected
1. Hotel prices in the results page are typically rounded
1. Currencies like USD, SGD, CNY are rounded to their nearest dollar. E.g. USD 100.21 is displayed as USD 100
1. Currencies like KRW, JPY, IDR are rounded to their nearest 100-dollars. E.g. KRW 300123.22 is displayed as KRW 300,100

### API Response Format

The hotels data endpoint returns data in the following format.

```
[
  {
    "id": 1,
    "name": "Shinagawa Prince Hotel",
    "rating": 7.7,
    "stars": 4,
    "address": "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
    "photo": "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
    "description": "<p>Boasting 15 food and beverage options, 2 swimming pools, and its own aquarium, Prince Hotel is right next to JR Shinagawa Train Station, from where Haneda Airport is only a 25-minute train ride away. This 39-storey hotel offers beautiful Tokyo views and free WiFi throughout the entire hotel.</p> <br> <p>The air-conditioned rooms at Shinagawa Prince Hotel have a fridge and an en suite bathroom with a bathtub and shower booth. Free toiletries and a hairdryer are provided. Guests will also find a personal locker in the room.</p> <br> <p>By train, Shibuya is 5 stops away and Shinjuku is a 16-minute ride. Tokyo Station is an 11-minute train ride away. Direct buses to and from Narita Airport stop at the hotel.</p> <br> <p>A city within a city, the hotel has its own movie theatre, bowling alley and tennis courts. Guests can enjoy a visit to the karaoke bar. The hotel also features a 24-hour front desk, indoor and outdoor pools, a sauna facility and massage services. Currency exchange service is available. Guests will find drink vending machines and a cash machine on site.</p> <br> <p>The 39th-floor Dining & Bar Table 9 Tokyo offers one of Tokyo’s best views. Restaurants serves unique Western cuisine, grill and steaks, while the bar lounge offers fusion tapas and drinks including whiskey, cocktails, sake and champagne. </p> <br> <p>Minato is a great choice for travellers interested in clean streets, friendly locals and culture.</p>"
  },
  ...
]
```

The data in endpoints for each currency looks as follows:

```
[
  {
    "id": 1,
    "price": 100
  },
  ...
]
```

For displaying the results, you'll need to collate the data upon matching the prices response to the static hotel information.

### Resources

- The endpoints to use are:
  - Static data: https://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/tokyo
  - Prices:
    - USD: http://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/tokyo/1/USD
    - SGD: http://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/tokyo/1/SGD
    - CNY: http://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/tokyo/1/CNY
    - KRW: http://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/tokyo/1/KRW
- Please note that for the simplification and ease of testing this is a static urls, they always return the same values, but you cannot treat them as static content (i.e. I may elect to test by modifying the hotel data

## Bonus

We emphasise on having tests to ensure our code is reliable. You should write specs for the logic in your codebase essential to this feature here.

## Questions?

If you have any question, don't worry, just send me an email or Skype me, I'll respond as quickly as I can

Good luck!
