
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
    maxAge: 24 * 60 * 60, // 1 day in seconds
    updateAge: 12 * 60 * 60, // 12 hours in seconds
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
    },
  },
};


export default NextAuth(authOptions);


