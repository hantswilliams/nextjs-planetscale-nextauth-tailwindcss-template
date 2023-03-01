import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
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

    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

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
