import { type InferModel } from "drizzle-orm/mysql-core/table";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { type shortLink } from "~/db/schema";

const middleware = async (req: NextRequest, _: NextFetchEvent) => {
  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname === "/"
  ) {
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();
  if (!slug || typeof slug !== "string") {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const fetchSlug = await fetch(`${req.nextUrl.origin}/api/get-link/${slug}`);
  if (fetchSlug.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const data = (await fetchSlug.json()) as InferModel<typeof shortLink>;
  return NextResponse.redirect(data.url);
};

export default middleware;

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
