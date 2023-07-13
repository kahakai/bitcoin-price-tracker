import Fastify from "fastify";

import { config } from "./config.js";
import { setupRoutes } from "./routes.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(setupRoutes);

const start = async () => {
  try {
    await fastify.listen({
      port: config.port,
      host: "0.0.0.0",
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export { start };
