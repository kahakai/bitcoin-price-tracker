import { FastifyPluginAsync } from "fastify";

import { BinanceAPI } from "./binance.js";
import { cache } from "./cache.js";
import { MidPrice, calculatePrice } from "./price.js";
import { startUpdater } from "./updater.js";

const setupRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/price", async (): Promise<MidPrice> => {
    const response = await cache.wrap("bitcoinPrice", () => {
      return BinanceAPI.getBitcoinPrice();
    });

    return calculatePrice(response);
  });

  startUpdater();
};

export { setupRoutes };
