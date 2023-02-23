import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../..";
import prisma from "../../../utils/prisma";

type RequestBody = {
  fetchIp: string;
  userAgent: string;
  referer: string | null;
}

app.put("/link/increment/:slug", {
  handler: async(request: FastifyRequest<{ Params: { slug: string }, Body: RequestBody }>, reply: FastifyReply) => {

    reply.status(200).send({ message: "Incremented" });

    const { slug } = request.params;
    const link = await prisma.link.findUnique({ where: { slug } });

    if (!link) {
      reply.status(404).send({ error: "Link not found" });
      return;
    }

    await prisma.link.update({
      where: { slug },
      data: {
        clicks: {
          increment: 1
        }
      }
    });
  }
});