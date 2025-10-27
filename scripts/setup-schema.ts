import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/lib/db/schema";

async function setupDatabase() {
  const connectionString = "postgresql://neondb_owner:npg_KI59CvLicFPo@ep-lively-meadow-ah4avsi6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  
  const client = postgres(connectionString);
  const db = drizzle(client, { schema });

  try {
    console.log("Setting up database schema...");
    
    // Create tables manually
    await client`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" text PRIMARY KEY NOT NULL,
        "name" text NOT NULL,
        "email" text NOT NULL,
        "emailVerified" boolean DEFAULT false NOT NULL,
        "image" text,
        "role" varchar(20) DEFAULT 'BUYER' NOT NULL,
        "phone" text,
        "address" text,
        "createdAt" timestamp DEFAULT now() NOT NULL,
        "updatedAt" timestamp DEFAULT now() NOT NULL
      );
    `;
    
    await client`
      CREATE TABLE IF NOT EXISTS "account" (
        "id" text PRIMARY KEY NOT NULL,
        "userId" text NOT NULL,
        "accountId" text NOT NULL,
        "providerId" text NOT NULL,
        "accessToken" text,
        "refreshToken" text,
        "idToken" text,
        "accessTokenExpiresAt" timestamp,
        "refreshTokenExpiresAt" timestamp,
        "scope" text,
        "password" text,
        "createdAt" timestamp DEFAULT now() NOT NULL,
        "updatedAt" timestamp DEFAULT now() NOT NULL
      );
    `;
    
    await client`
      CREATE TABLE IF NOT EXISTS "session" (
        "id" text PRIMARY KEY NOT NULL,
        "expiresAt" timestamp NOT NULL,
        "token" text NOT NULL,
        "createdAt" timestamp DEFAULT now() NOT NULL,
        "updatedAt" timestamp DEFAULT now() NOT NULL,
        "ipAddress" text,
        "userAgent" text,
        "userId" text NOT NULL
      );
    `;
    
    await client`
      CREATE TABLE IF NOT EXISTS "verification" (
        "id" text PRIMARY KEY NOT NULL,
        "identifier" text NOT NULL,
        "value" text NOT NULL,
        "expiresAt" timestamp NOT NULL,
        "createdAt" timestamp DEFAULT now() NOT NULL,
        "updatedAt" timestamp DEFAULT now() NOT NULL
      );
    `;
    
    // Add unique constraints
    await client`ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");`;
    await client`ALTER TABLE "session" ADD CONSTRAINT "session_token_unique" UNIQUE("token");`;
    
    // Add foreign key constraints
    await client`ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;`;
    await client`ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;`;
    
    console.log("✅ Database schema created successfully!");
    console.log("Tables created: user, account, session, verification");
    
  } catch (error) {
    console.error("❌ Error setting up database:", error);
  } finally {
    await client.end();
  }
}

setupDatabase();

