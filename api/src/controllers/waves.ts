import { generateNonce, SiweMessage } from "siwe";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function userController(fastify: FastifyInstance) {
  fastify.post("/claim", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as { synth: string; waveID: number };

    // Verify that user owns synth
    // Verify that wave is not claimed
    // Verify that wave can be claimed
    // Make on-chain attestaion

    // Wait for the waves resolver to mint the NFT

    reply.send({ success: true });
  });
}
