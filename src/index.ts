import { fastify } from "fastify";

export const app = fastify();

async function server() : Promise<void> {
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