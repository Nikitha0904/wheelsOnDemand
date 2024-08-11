// app/api/auth/[...nextauth]/route.js (or [auth].js depending on your setup)

import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { login } from "@/app/api/login/route"; // Ensure this path is correct

export const authOptions = {
  pages: {
    signIn: "/login", // Ensure this path is correct
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          console.log("Credentials:", credentials);
          const user = await login(credentials); // Ensure this function is implemented and working
          console.log("User:", user);
          if (user) {
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Failed to login.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role_id = user.role_id;
        token.user_id = user.id;
        token.name = user.name;
        token.college_id = user.college_id;
      }
      console.log("Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role_id = token.role_id;
        session.user.id = token.user_id;
        session.user.name = token.name;
        session.user.college_id = token.college_id;
      }
      console.log("Session:", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
