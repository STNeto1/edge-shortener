import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

// WORKS
const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

// DOES NOT WOTK
// const connection = connect({
//   host: env.DATABASE_HOST,
//   username: env.DATABASE_USERNAME,
//   password: env.DATABASE_PASSWORD,
// });

export const db = drizzle(connection, {
  logger: true,
});
