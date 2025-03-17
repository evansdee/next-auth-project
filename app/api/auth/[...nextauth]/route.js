import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from "@/config/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
// import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize({ email, password }) {
        try {
          await connectToDb();

          const user = await User.findOne({ email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks:{
    async signIn({user,account}){
        if(account?.provider == "credentials"){
            return true
        }
    },
    // async jwt({ token, user }) {
    //     if (user) {
    //       token.id = user.id;
    //       token.isAdmin = user.isAdmin;
    //     }
  
    //     return token;
    //   },
    //   async session({ session, token }) {
    //     if (token) {
    //       session.user.id = token.id;
    //       session.user.isAdmin = token.isAdmin;
    //     }
  
    //     return session;
    //   },
  }
};


export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}