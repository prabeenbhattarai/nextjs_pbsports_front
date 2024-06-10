
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
  
}


export default NextAuth(authOptions);


