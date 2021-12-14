export const getCurrSymbol = (curr) => {
  switch (curr) {
    case "GBP":
      return "£";
    case "USD":
      return "$";
    case "RUB":
      return "₽";
    case "AUD":
      return "$";
    case "JPY":
      return "¥";
    default:
      break;
  }
};

const selectPrice = (prices, currency) => {
  const price = prices.find((price) => price.currency === currency);
  const currSymbol = getCurrSymbol(price.currency);
  return {
    amount: price.amount,
    currSymbol,
  };
};

export default selectPrice;
