import NextAuth from "next-auth";
import { MongoDBAdapter, MongoDBAdapterOptions } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";

import GoogleProvider from "next-auth/providers/google";

import clientPromise from "@/lib/mongodb";

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/oauth
const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing Client ID")
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing Client Secret")
  }
  return {clientId,clientSecret}
}

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise, ) as Adapter,
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
    
  },
  pages : {
    signIn : '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      const client = await clientPromise
      const database = await client.db("Tasky")
      const users = database.collection("Users")
      const dbUser = await users.findOne({email:token.email}) as User | null
      if (!dbUser) {
        token.id = user!.id
        return token
      }
      return  {
        id : dbUser.id,
        name : dbUser.name,
        email : dbUser.email,
        image : dbUser.image,
      }
      
      
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.picture
      }
      return session
      
    },
    redirect() {
      return '/dashboard'
    }
  },
  
});

