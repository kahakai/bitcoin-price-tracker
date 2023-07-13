import { FastifyPluginAsync } from "fastify";
import got from "got";

const setupRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/price", async () => {
    const url = "https://www.binance.com/api/v3/ticker/bookTicker";

    const response = await got(url, {
      searchParams: {
        symbol: "BTCUSDT",
      },
    }).json();

    return response;
  });
};

export { setupRoutes };
