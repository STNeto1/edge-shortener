import {
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core/columns";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

export const shortLink = mysqlTable("short_links", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  slug: varchar("slug", {
    length: 20,
  }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
