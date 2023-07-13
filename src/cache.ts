import { caching } from "cache-manager";

const cache = await caching("memory", {
  ttl: 1 * 60 * 1000,
  max: 500,
});

export { cache };
