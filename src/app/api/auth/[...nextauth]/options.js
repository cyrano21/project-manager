import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";

const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "email", 
          placeholder: "Email" 
        },
        password: { 
          label: "Password", 
          type: "password", 
          placeholder: "Password" 
        }
      },
      async authorize(credentials) {
        // Supprimez le code suivant sur la ligne 13 qui semble être une erreur de syntaxe
        // email: { label: "Email", type: "email", placeholder: "Email" }, {  

        if (!credentials || !credentials.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (!user) return null;
        
        const isPasswordValid = await bcrypt.compare(
          credentials.password, 
          user.password
        );

        return isPasswordValid ? user : null;
      }
    })
  ],
  session: { 
    strategy: "jwt" 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authConfig);

export const { GET, POST } = handler;