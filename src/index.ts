import { fastify } from "fastify";
import cors from "@fastify/cors";

export const app = fastify();

async function server() : Promise<void> {
  await app.register(cors, {
    origin: "*"
  });

  app.listen({ port: 3000, host: "0.0.0.0" }, err => {
    if (err) throw err;
    console.info("Server listening at http://0.0.0.0:3000");
  });
}

server();