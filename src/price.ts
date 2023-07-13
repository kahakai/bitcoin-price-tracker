import { type Dinero, dinero, multiply, add, toDecimal } from "dinero.js";
import { USD } from "@dinero.js/currencies";

import { type SymbolPrice } from "./binance.js";
import { config } from "./config.js";

interface MidPrice {
  bidPrice: string;
  bidPriceCommission: string;
  totalBidPrice: string;
  askPrice: string;
  askPriceCommission: string;
  totalAskPrice: string;
  commission: string;
  midPrice: string;
}

const createDinero = (amount: string): Dinero<number> => {
  const { base, exponent } = USD;
  const multiplier = (base as number) ** exponent;

  const priceAmount = Number(amount) * multiplier;

  return dinero({ amount: priceAmount, currency: USD });
};

const calculateCommission = (price: Dinero<number>): Dinero<number> => {
  const commission = config.serviceCommission * 100;
  return multiply(price, { amount: commission, scale: 2 });
};

const calculateTotal = (
  price: Dinero<number>,
  commission: Dinero<number>,
): Dinero<number> => {
  return add(price, commission);
};

const calculateMidPrice = (
  bidPrice: Dinero<number>,
  askPrice: Dinero<number>,
): Dinero<number> => {
  const sum = add(bidPrice, askPrice);
  return multiply(sum, { amount: 5, scale: 1 });
};

const calculatePrice = (symbolPrice: SymbolPrice): MidPrice => {
  const bidPrice = createDinero(symbolPrice.bidPrice);
  const bidPriceCommission = calculateCommission(bidPrice);
  const totalBidPrice = calculateTotal(bidPrice, bidPriceCommission);

  const askPrice = createDinero(symbolPrice.askPrice);
  const askPriceCommission = calculateCommission(askPrice);
  const totalAskPrice = calculateTotal(askPrice, askPriceCommission);

  const midPrice = calculateMidPrice(totalBidPrice, totalAskPrice);

  return {
    bidPrice: toDecimal(bidPrice),
    bidPriceCommission: toDecimal(bidPriceCommission),
    totalBidPrice: toDecimal(totalBidPrice),
    askPrice: toDecimal(askPrice),
    askPriceCommission: toDecimal(askPriceCommission),
    totalAskPrice: toDecimal(totalAskPrice),
    commission: String(config.serviceCommission),
    midPrice: toDecimal(midPrice),
  };
};

export { type MidPrice, calculatePrice };
