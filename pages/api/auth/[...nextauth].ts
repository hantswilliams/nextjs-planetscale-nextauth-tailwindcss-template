import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from 'next-auth/providers/github';
// import InstagramProvider from 'next-auth/providers/instagram';
// import FacebookProvider from "next-auth/providers/facebook";
// import LinkedInProvider from "next-auth/providers/linkedin";
// import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"

const thirtyMinutes = 60 * 30;
const fiveMinutes = 60 * 5;

export const authOptions: NextAuthOptions = {
  secret: "super-secret",
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: thirtyMinutes,
    updateAge: fiveMinutes,
  },

  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),

    // InstagramProvider({
    //   clientId: process.env.INSTAGRAM_CLIENT_ID as string,
    //   clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
    // }),

    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID as string,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    // }),

    // TwitterProvider({
    //   clientId: process.env.TWITTER_CLIENT_ID as string,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    // }),

    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID as string,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    // }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        //@ts-expect-error
        if (credentials.username === 'admin' && credentials.password === 'admin') {
          const user = { id: "1", name: "Admin User", email: "admin@example.com", isAdmin: true, image: "https://i.pravatar.cc/150?img=3" }
          return user
        } else {
          return null
        }
      }
    })

  ],
};

export default NextAuth(authOptions);
