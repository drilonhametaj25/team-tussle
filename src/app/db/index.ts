import { drizzle } from "drizzle-orm/libsql";
;
import * as schema from "./schema";
import { Client, createClient } from "@libsql/client";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Client | undefined;
};

const conn = globalForDb.conn ?? createClient({ url: 'DATABASE_URL', authToken: 'DATABASE_AUTH_TOKEN' });
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });