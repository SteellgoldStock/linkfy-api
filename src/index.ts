import { fastify } from "fastify";

export const app = fastify();

async function server() : Promise<void> {
  import("./routes/link/get/single");
  import("./routes/link/get/multiple");

  app.listen({ port: 3000, host: "localhost" }, err => {
    if (err) throw err;
    console.log("Server listening at http://localhost:3000");
  });
}

server();