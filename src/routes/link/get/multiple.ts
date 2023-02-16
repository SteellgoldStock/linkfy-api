import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../..";
import prisma from "../../../utils/prisma";

app.get("/links/get/:type/:id", {
  handler: async(request: FastifyRequest<{ Params: { type: string, id: string } }>, reply: FastifyReply) => {
    const { type, id } = request.params;
    const link = await prisma.link.findMany({ where: { [type + "Id"]: id } });

    if (!link) {
      reply.status(404).send({ error: "Link not found" });
    } else {
      reply.status(200).send(link);
    }
  }
});