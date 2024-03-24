import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter, MongoDBAdapterOptions } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { Adapter } from "next-auth/adapters";
import { NextRequest } from "next/server";

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
      console.log("This is jwt")
      console.log(token)
      console.log(account)
      console.log(profile)
      console.log(user)
      if (account) {
        token.accessToken = account?.access_token
        token.providerId = account?.providerAccountId as string
        token.id = user.id
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log('This is sesssion')
      console.log("token", token)
      console.log("token", user)
      if (token) {
        session.user.id = token?.id;
        session.user.providerId = token?.providerId
        session.user.email = token?.email;
        session.user.name = token?.name;
        session.user.image = token?.picture;
      }
      return session;
    },
    async signIn({account,user,profile,credentials}) {
      console.log("This is sign in call back")
      console.log('user',user)
      console.log('acoount',account)
      console.log('profile',profile)
      return true;
      if (account?.provider === 'google') {
        try {
          const userid = user.id
          console.log(userid)
          const res = await fetch('http://localhost:3000/api/users/CreateUser/',{
            method : "POST",
            headers : {
              "Content-Type":"application/json"
            },
            body : JSON.stringify({userid : userid})
          })

          if (res.ok) {
            console.log("Auth success")
            return true;
          } else if(res.status === 300) {
            console.log("User was already present there Continuing with auth")
            return false;
          } else {
            console.log('Auth un - success')
            return false;
          }
        } catch (error) {

          console.log(error)
        }
      }

    },
    redirect() {
      return "/dashboard/timeline";
    },
  },
};
