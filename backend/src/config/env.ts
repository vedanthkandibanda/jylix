import "dotenv/config";

const port = Number(process.env.PORT) || 5000;

const databaseUrl = process.env.DATABASE_URL;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

if (!accessTokenSecret) {
  throw new Error("ACCESS_TOKEN_SECRET is not configured");
}

if (!refreshTokenSecret) {
  throw new Error("REFRESH_TOKEN_SECRET is not configured");
}

export const env = {
  port,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl,
  accessTokenSecret,
  refreshTokenSecret,
};