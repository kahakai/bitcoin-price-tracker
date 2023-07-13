import { caching } from "cache-manager";
import { config } from "./config.js";

const cache = await caching("memory", {
  ttl: config.updateFrequency * 30 * 1000,
  max: 500,
});

export { cache };
