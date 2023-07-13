import { FastifyPluginAsync } from "fastify";

const setupRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async () => {
    return { hello: "world" };
  });
};

export { setupRoutes };
