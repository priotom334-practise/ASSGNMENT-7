import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

type AuthGlobals = typeof globalThis & {
  mongoClient?: MongoClient;
  authInstance?: ReturnType<typeof createAuth>;
};

function createAuth() {
  const mongodbUrl = process.env.MONGODB_URL;
  if (!mongodbUrl) {
    throw new Error("Missing required environment variable: MONGODB_URL");
  }

  const globals = globalThis as AuthGlobals;
  const client = globals.mongoClient ?? new MongoClient(mongodbUrl);
  globals.mongoClient = client;
  const db = client.db("Bazar_Dor");

  const socialProviders: Record<string, unknown> = {};

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    socialProviders.google = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    };
  }

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    socialProviders.github = {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    };
  }

  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
    },
    socialProviders,
    database: mongodbAdapter(db, {
      client,
    }),
  });
}

export function getAuth() {
  const globals = globalThis as AuthGlobals;
  globals.authInstance ??= createAuth();
  return globals.authInstance;
}