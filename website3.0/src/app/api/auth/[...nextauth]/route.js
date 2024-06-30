import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";

const handler= NextAuth({
providers:[
    GoogleProvider({
        clientId:process.env.CLIENT_ID ,
        clientSecret:process.env.CLIENT_SECRET
      })
], callbacks: {
  async jwt({ token, account }) {
      if (account) {
          token.accessToken = account.access_token
      }
      return token
  },
  async session({ session, token }) {
      const customSession = session;
      customSession.accessToken = token.accessToken ;
      return customSession;
  }
}
})
export { handler as GET, handler as POST }
