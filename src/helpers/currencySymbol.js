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
