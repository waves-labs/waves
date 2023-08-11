import { FastifyInstance } from "fastify";

import identityController from "./controllers/identity";

export async function router(fastify: FastifyInstance) {
  fastify.register(identityController, { prefix: "/identity" });
}
