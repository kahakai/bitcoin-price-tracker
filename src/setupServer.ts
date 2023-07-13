import Fastify from "fastify";

import { setupRoutes } from "./routes";

const fastify = Fastify({
  logger: true,
});

fastify.register(setupRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export { start };
