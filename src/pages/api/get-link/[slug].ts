import { eq } from "drizzle-orm/expressions";
import { type NextApiRequest, type NextApiResponse } from "next";

import { db } from "~/db/db";
import { shortLink } from "~/db/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    return res.status(404).json({ message: "please provide a slug" });
  }

  const [data] = await db
    .select()
    .from(shortLink)
    .where(eq(shortLink.slug, slug))
    .limit(1);

  if (!data) {
    return res.status(404).json({ message: "short link not found" });
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");
  return res.json(data);
};

export default handler;
