const currencyToLocale = {
  USD: "en-US",
  SGD: "en-SG",
  CNY: "zh-CN",
  KRW: "ko-KR",
};

function roundToNearestHundred(value: number) {
  return Math.round(value / 100) * 100;
}

export function getCurrencyFormatter(currency: string) {
  const locale =
    currencyToLocale[currency as keyof typeof currencyToLocale] ?? "en-US";

  switch (currency) {
    case "USD":
    case "SGD":
    case "CNY":
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0, // Rounds to the nearest dollar
      });
    case "KRW":
    case "JPY":
    case "IDR":
      const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      });
      return {
        format: (value: number) => {
          return formatter.format(roundToNearestHundred(value));
        },
      };
    default:
      // Default formatter, you can customize this as needed
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      });
  }
}
