import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../..";
import { Link } from "../../types/link";
import { error, success, warn } from "../../utils/logger";
import prisma from "../../utils/prisma";

app.get("/link/:slug", {
  handler: async(request: FastifyRequest<{ Params: Link }>, reply: FastifyReply) => {
    reply.status(200).send({
      message: "Correctly routed received request."
    });

    warn(`[GET] incrementing link with slug /${request.params.slug}.`);

    const link = await prisma.link.findUnique({
      where: {
        slug: request.params.slug
      }
    });

    if (!link) {
      reply.status(404).send({
        error: "Link not found"
      });

      error(`[404] Link with slug /${request.params.slug} not found.`);
      return;
    }

    await prisma.link.update({
      where: {
        slug: request.params.slug
      },
      data: {
        clicks: link.clicks + 1
      }
    });

    success(`[200] Link with slug /${request.params.slug} incremented by 1.`);
    return reply.status(200).send({
      message: "Link incremented successfully."
    });
  }
});