import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { DEFAULT_USER_ROLE, isRegistrationRole } from "@/lib/roles";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
const db = client.db("mywedding");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  ...(googleClientId && googleClientSecret
    ? {
        socialProviders: {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        },
      }
    : {}),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: DEFAULT_USER_ROLE,
        // Never accepted from request bodies, so `/update-user` cannot
        // escalate an account. Only the create hook below can set it.
        input: false,
      },
      requestedRole: {
        type: "string",
        required: false,
        input: true,
        returned: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // The public form sends `requestedRole`; only `user` and `vendor` are
        // honoured. Admins must be promoted directly in MongoDB.
        before: async (user) => ({
          data: {
            ...user,
            role: isRegistrationRole(user.requestedRole)
              ? user.requestedRole
              : DEFAULT_USER_ROLE,
          },
        }),
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
