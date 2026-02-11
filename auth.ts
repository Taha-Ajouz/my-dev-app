import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './lib/mongodb-adapter';
import connectDB from './lib/mongodb';
import User from './models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      await connectDB();
      const dbUser = await User.findOne({ email: user.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});
