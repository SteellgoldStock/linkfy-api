import { fastify } from "fastify";

export const app = fastify();

async function server(): Promise<void> {
  import("./routes/link/increment");

  try {
    await app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
      console.log("Server listening on 0.0.0.0:3000");
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

server();