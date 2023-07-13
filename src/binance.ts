import got from "got";

const BASE_API_URL = "https://www.binance.com/api/v3";

const TICKER_API_URL = `${BASE_API_URL}/ticker`;

interface SymbolPrice {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

const getBitcoinPrice = async (): Promise<SymbolPrice> => {
  const url = `${TICKER_API_URL}/bookTicker`;

  return got(url, {
    searchParams: {
      symbol: "BTCUSDT",
    },
  }).json<SymbolPrice>();
};

const BinanceAPI = {
  getBitcoinPrice,
};

export { BinanceAPI, type SymbolPrice };
