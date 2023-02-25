import * as argon2d from "argon2";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { app } from "../../..";
import prisma from "../../../utils/prisma";

type BodyRequest = {
  url: string,
  slug: string,
  password: string,
  userId?: string,
  visitorId: string
}

app.post("/link/create", {
  handler: async(request: FastifyRequest<{ Body: string }>, reply: FastifyReply) => {
    const body: BodyRequest = JSON.parse(request.body);
    const schema = z.object({
      url: z.string().url(),
      slug: z.string().min(2).max(50),
      password: z.string().nullable(),
      userId: z.string().nullable(),
      visitorId: z.string()
    }).safeParse(body);

    if (!schema.success) return reply.status(400).send({ error: "Invalid body" });

    const { url, slug, password, userId, visitorId } = schema.data;

    let passwordHash = "none";
    if (password !== null) passwordHash = await argon2d.hash(password);

    const link = await prisma.link.create({
      data: {
        url: url,
        slug: slug,
        password: passwordHash,
        userId: userId,
        visitorId: visitorId
      }
    });

    if (!link) return reply.status(500).send({ error: "Internal server error" });
    return reply.status(200).send(link);
  }
});