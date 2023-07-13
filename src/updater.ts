import { BinanceAPI } from "./binance.js";
import { cache } from "./cache.js";

const updateBitcoinPrice = async (): Promise<void> => {
  const response = await BinanceAPI.getBitcoinPrice();

  console.debug("price update");

  await cache.set("bitcoinPrice", response);
};

const startUpdater = () => {
  setInterval(() => updateBitcoinPrice(), 10 * 1000);

  updateBitcoinPrice();
};

export { startUpdater };
