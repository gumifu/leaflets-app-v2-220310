import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"
// import { app } from "../../../firebase"
// import { FirebaseAdapter } from "@next-auth/firebase-adapter"

// import firebase from "firebase/app"
// import "firebase/firestore"

// const firestore = (
//   firebase.apps[0] ?? firebase.initializeApp(app)
// ).firestore()


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  //   EmailProvider({
  //   server: {
  //     host: process.env.EMAIL_SERVER_HOST,
  //     port: process.env.EMAIL_SERVER_PORT,
  //     auth: {
  //       user: process.env.EMAIL_SERVER_USER,
  //       pass: process.env.EMAIL_SERVER_PASSWORD
  //     }
  //   },
  //   from: process.env.EMAIL_FROM
  // }),
    // ...add more providers here
  ],
  // adapter: FirebaseAdapter(firestore),
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
