import { FastifyPluginAsync } from "fastify";
import got from "got";
import { type Dinero, dinero, multiply, add, toDecimal } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

interface SymbolPrice {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

interface MidPrice {
  bidPrice: string;
  bidPriceComission: string;
  totalBidPrice: string;
  askPrice: string;
  askPriceComission: string;
  totalAskPrice: string;
  comission: string;
  midPrice: string;
}

const createDinero = (amount: string): Dinero<number> => {
  const { base, exponent } = USD;
  const multiplier = (base as number) ** exponent;

  const priceAmount = Number(amount) * multiplier;

  return dinero({ amount: priceAmount, currency: USD });
};

const calculateComission = (price: Dinero<number>): Dinero<number> => {
  const comission = multiply(price, { amount: 1, scale: 2 });
  return comission;
};

const calculateTotal = (price: Dinero<number>, comission: Dinero<number>): Dinero<number> => {
  return add(price, comission);
};

const calculateMidPrice = (bidPrice: Dinero<number>, askPrice: Dinero<number>): Dinero<number> => {
  const sum = add(bidPrice, askPrice);
  return multiply(sum, { amount: 5, scale: 1 });
}

const setupRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/price", async (): Promise<MidPrice> => {
    const url = "https://www.binance.com/api/v3/ticker/bookTicker";

    const response = await got(url, {
      searchParams: {
        symbol: "BTCUSDT",
      },
    }).json<SymbolPrice>();

    const bidPrice = createDinero(response.bidPrice);
    const bidPriceComission = calculateComission(bidPrice);
    const totalBidPrice = calculateTotal(bidPrice, bidPriceComission);

    const askPrice = createDinero(response.askPrice);
    const askPriceComission = calculateComission(askPrice);
    const totalAskPrice = calculateTotal(askPrice, askPriceComission);

    const midPrice = calculateMidPrice(totalBidPrice, totalAskPrice);

    return {
      bidPrice: toDecimal(bidPrice),
      bidPriceComission: toDecimal(bidPriceComission),
      totalBidPrice: toDecimal(totalBidPrice),
      askPrice: toDecimal(askPrice),
      askPriceComission: toDecimal(askPriceComission),
      totalAskPrice: toDecimal(totalAskPrice),
      comission: "0.01",
      midPrice: toDecimal(midPrice),
    };
  });
};

export { setupRoutes };
