import { FastifyInstance } from "fastify";

import identityController from "./controllers/identity";
import wavesController from "./controllers/waves";

export async function router(fastify: FastifyInstance) {
  fastify.register(identityController, { prefix: "/identity" });
  fastify.register(wavesController, { prefix: "/waves" });
}
