import { BinanceAPI } from "./binance.js";
import { cache } from "./cache.js";
import { config } from "./config.js";

const updateBitcoinPrice = async (): Promise<void> => {
  const response = await BinanceAPI.getBitcoinPrice();

  await cache.set("bitcoinPrice", response);
};

const startUpdater = () => {
  setInterval(() => {
    return updateBitcoinPrice();
  }, config.updateFrequency * 1000);

  updateBitcoinPrice();
};

export { startUpdater };
