import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../..";
import prisma from "../../../utils/prisma";
import * as argon2 from "argon2";

app.get("/link/:slug/password/verify/:password", {
  handler: async(request: FastifyRequest<{ Params: { slug: string, password: string } }>, reply: FastifyReply) => {
    const { slug, password } = request.params;
    const link = await prisma.link.findUnique({ where: { slug }, select: {
      password: true
    } });

    if (!link) {
      reply.status(404).send({ error: "Link not found" });
    } else {
      const passwordMatch = await argon2.verify(link.password, password);

      if (passwordMatch) {
        reply.status(200).send({ passwordMatch: true });
      } else {
        reply.status(200).send({ passwordMatch: false });
      }
    }
  }
});