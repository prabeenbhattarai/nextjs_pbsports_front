
import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { getServerSession } from 'next-auth';
import clientPromise from "@/lib/mongodb";
export const  authOptions = 
{
  providers: [
    // OAuth authentication providers...
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_SECRET
    }),
   
 
  ],
  session: {
    // Use server-side sessions
    jwt: false,
    // Set the session duration (in seconds)
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update the session every 24 hours
  },
  callbacks: {
    async session(session, user) {
      // Optionally, you can attach additional information to the session here
      session.user = user
      return session
    },
  },
  // Use database sessions
  database: process.env.MONGODB_URI,
}


export default NextAuth(authOptions);


