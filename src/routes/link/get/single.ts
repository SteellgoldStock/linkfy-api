import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../..";
import prisma from "../../../utils/prisma";

app.get("/link/get/:slug", {
  handler: async(request: FastifyRequest<{ Params: { slug: string } }>, reply: FastifyReply) => {
    const { slug } = request.params;
    const link = await prisma.link.findUnique({ where: { slug } });

    if (!link) {
      reply.status(404).send({ error: "Link not found" });
    } else {
      reply.status(200).send(link);
    }
  }
});

app.get("/link/get/:slug/:select", {
  handler: async(request: FastifyRequest<{ Params: { slug: string, select: string } }>, reply: FastifyReply) => {
    const { slug, select } = request.params;

    const selectArray = select.split(",");
    const selectObject = selectArray.reduce((acc, cur) => ({ ...acc, [cur]: true }), {});

    const link = await prisma.link.findUnique({ where: { slug }, select: selectObject });

    if (!link) {
      reply.status(404).send({ error: "Link not found" });
    } else {
      reply.status(200).send(link);
    }
  }
});