import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
    // theme: {
  //   logo: '/logo-main-white.svg',
  //   brandColor: '#F13287',
  //   colorScheme:'auto',
  // },
    pages: {
        signIn:"/auth/signin",
  },
   callbacks: {
     async session({ session, token, user }) {
      //  usernameの生成
        session.user.username = session.user.name.split(" ").join("").toLocaleLowerCase();
        //uidの生成
        session.user.uid = token.sub;
        return session;
      },
  },
})
