/* eslint-env node */
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import * as schema from "../src/lib/db/schema";

async function initDatabase() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error("DATABASE_URL environment variable is required");
    process.exit(1);
  }

  const client = postgres(connectionString);
  const db = drizzle(client, { schema });

  try {
    console.log("Database connection successful!");
    console.log("You can now run: npm run db:push");
    // Test the database connection
    await db.execute(sql`SELECT 1`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initDatabase();
