import { generateNonce, SiweMessage } from "siwe";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function userController(fastify: FastifyInstance) {
  // Returns the current user by checking the session returning 200 if the user is logged in and 401 if not
  fastify.get("/nonce", async function (req: FastifyRequest, reply: FastifyReply) {
    req.session.nonce = generateNonce();
    reply.send({ nonce: req.session.nonce });
  });

  // Returns the current user by checking the session returning 200 if the user is logged in and 401 if not
  fastify.post("/login", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as { message: string; signature: string };

    try {
      if (!body.message || !body.signature || !req.session.nonce) {
        return reply.status(400).send({ error: "Missing message, signature, or nonce" });
      }

      const SIWEObject = new SiweMessage(body.message);
      const { data: message } = await SIWEObject.verify({ signature: body.signature, nonce: req.session.nonce });

      req.session.siwe = message;
      if (message.expirationTime) {
        req.session.cookie.expires = new Date(message.expirationTime);
      }

      req.session.save(() => reply.status(200).send(true));
    } catch (error) {
      req.session.siwe = null;
      req.session.nonce = null;

      const _error = error as Error;
      console.error(_error);

      return reply.status(400).send({ error: _error.message });
    }
  });

  fastify.post("/logout", async function (req: FastifyRequest, reply: FastifyReply) {
    req.session.siwe = null;
    req.session.nonce = null;

    req.session.destroy();

    reply.send(true);
  });
}
