import * as argon2d from "argon2";
import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../..";

app.post("/link/create", {
  handler: async(request: FastifyRequest<{ Body: string }>, reply: FastifyReply) => {
    return reply.send({ message: "Hello World!" });
  }
});