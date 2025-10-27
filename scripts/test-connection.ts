import postgres from "postgres";

async function testConnection() {
  const connectionString = "postgresql://neondb_owner:npg_KI59CvLicFPo@ep-lively-meadow-ah4avsi6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  
  const client = postgres(connectionString);

  try {
    console.log("Testing database connection...");
    const result = await client`SELECT version()`;
    console.log("✅ Database connection successful!");
    console.log("PostgreSQL version:", result[0].version);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await client.end();
  }
}

testConnection();

