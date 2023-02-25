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
  // String because, when i sent a request, the body is a string and not an object (JSON.stringify())
  handler: async(request: FastifyRequest<{ Body: string }>, reply: FastifyReply) => {
    // Body is "{"url":"https://google.com","slug":"google","password":"password","userId":"1","visitorId":"1"}"
    // Convert body to object JSON, but JSON.parse() is not working
    const body: BodyRequest = JSON.parse(request.body);

    const schema = z.object({
      url: z.string().url(),
      slug: z.string().min(2).max(50),
      password: z.string().default("none"),
      userId: z.string().optional(),
      visitorId: z.string()
    }).safeParse(body);

    if (!schema.success) {
      return reply.status(400).send({ error: "Invalid body" });
    }

    const { url, slug, password, userId, visitorId } = schema.data;

    let passwordHash = "";
    if (password !== "none") {
      passwordHash = await argon2d.hash(password);
    }

    const link = await prisma.link.create({
      data: {
        url: schema.data.url,
        slug: schema.data.slug,
        password: passwordHash,
        userId: schema.data.userId,
        visitorId: schema.data.visitorId
      }
    });

    if (!link) {
      return reply.status(500).send({ error: "Internal server error" });
    }

    return reply.status(200).send(link);
  }
});