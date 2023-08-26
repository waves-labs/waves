import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import Session from "express-session";

dotenv.config();

import { server } from "./server";
import { wavesRouter } from "./routes/waves";
import { identityRouter } from "./routes/identity";

const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;
const host = IS_GOOGLE_CLOUD_RUN ? "0.0.0.0" : undefined;
const port = Number(process.env.PORT) || 3000;

// Middleware
server.use(require("express").json());
server.use(cors({})); // Adjust the "origin" option as needed
server.use(helmet({}));
// server.register(require("@fastify/sensible"));
// server.register(require("@fastify/cookie"));
server.use(
  Session({
    name: "waves_cookie",
    secret: `${process.env.SESSION_SECRET ?? "issa a secret with minimum length of 32 characters"}}`,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000, // 1 day
      httpOnly: true,
      secure: false,
      sameSite: true,
    },
  })
);

// Router
server.use("/waves", wavesRouter);
server.use("/identity", identityRouter);

server.get("/status", async function (_req, reply) {
  reply.send({ status: "ok" });
});

server.listen({ port, host });

export default server;

console.log(`🚀  WAVES API server running at http://localhost:${port}/status`);
