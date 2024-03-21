import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter, MongoDBAdapterOptions } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { Adapter } from "next-auth/adapters";

const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing Client ID");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing Client Secret");
  }
  return { clientId, clientSecret };
};

const mongoOptions: MongoDBAdapterOptions = {
  databaseName: "Tasky",
  collections: {
    Accounts: "userAccounts",
    Sessions: "userSessions",
    Users: "createdUsers",
    VerificationTokens: "verificationTokens",
  },
};

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, mongoOptions) as Adapter,
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge : 24*60*60*30,
  },
  pages: {
    signIn: "/login",
    signOut : "/login",
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {

      if (account) {
        token.accessToken = account?.access_token
        token.providerId = profile?.sub as string
      }
      return token;
    },
    async session({ session, token }) {

      if (token) {
        session.user.providerId = token?.providerId;
        session.user.id = token?.sub;
        session.user.email = token?.email;
        session.user.name = token?.name;
        session.user.image = token?.picture;
      }
      return session;
    },
    redirect() {
      return "/dashboard/timeline";
    },
  },
};
