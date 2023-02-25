import { fastify } from "fastify";
import cors from "@fastify/cors";

export const app = fastify();

async function server() : Promise<void> {
  await app.register(cors, {
    origin: "*" // TODO: Change this to a whitelist of domains
    // THIS IS NOT SECURE: ONLY USE FOR DEVELOPMENT
  });

  import("./routes/link/create/single");
  import("./routes/link/get/single");
  import("./routes/link/get/multiple");
  import("./routes/link/put/increment");

  import("./routes/link/password/verify");

  app.listen({ port: 3000, host: "0.0.0.0" }, err => {
    if (err) throw err;
    console.log("Server listening at http://0.0.0.0:3000");
  });
}

server();