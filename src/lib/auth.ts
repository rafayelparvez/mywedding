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
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Only `user` and `vendor` can be self-assigned. Admins are promoted
        // directly in the database and can never be created by the public form.
        before: async (user) => ({
          data: {
            ...user,
            role: isRegistrationRole(user.role)
              ? user.role
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
