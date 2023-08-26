// import fs from "fs";
// import path from "path";
// import https from "https";
import express from "express";
import { SiweMessage } from "siwe";

declare module "express-session" {
  export interface Session {
    nonce: string | null;
    siwe: SiweMessage | null;
    chainId?: 420 | 85431 | 999 | 919;
  }
}

export const server = express();

// https
//   .createServer(
//     {
//       key: fs.readFileSync(path.join(__dirname, "../cert/fastify.key")),
//       cert: fs.readFileSync(path.join(__dirname, "../cert/fastify.cert")),
//     },
//     server
//   )
//   .listen(3000);
