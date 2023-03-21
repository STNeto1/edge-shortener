import { init } from "@paralleldrive/cuid2";
import { z } from "zod";
import { shortLink } from "~/db/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const getCompleteUrl = (end: string) => {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost

  return `${base}/${end}`;
};

const createId = init({
  length: 10, // the length of the id
  fingerprint: "7hkh/BbZJW1vHmEfXpIHes/7kscZoiYJPfvhR9/c7gk=",
});

export const linkRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.string().url().nonempty())
    .mutation(async ({ input, ctx }) => {
      const slug = createId();
      await ctx.db.insert(shortLink).values({
        url: input,
        slug,
      });

      return getCompleteUrl(slug);
    }),
});
