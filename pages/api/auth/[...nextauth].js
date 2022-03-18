import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials";
import CredentialsProvider from 'next-auth/providers/credentials'
// import EmailProvider from "next-auth/providers/email"
// import { app } from "../../../firebase"
// import { FirebaseAdapter } from "@next-auth/firebase-adapter"

// import firebase from "firebase/app"
// import "firebase/firestore"

// const firestore = (
//   firebase.apps[0] ?? firebase.initializeApp(app)
// ).firestore()



const options = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // 表示名 ('Sign in with ...' に表示される)
      name: "Email",
      // credentials は、ログインページで適切なフォームを生成するために使用されます。
      // 送信するフィールドを指定できます。（今回は メールアドレス と パスワード）
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      // 認証の関数
      authorize: async credentials => {
        const user = findUserByCredentials(credentials)
        if (user) {
          // 返されたオブジェクトはすべてJWTの`user`プロパティに保存される
          return Promise.resolve(user)
        } else {
          // nullまたはfalseを返すと、認証を拒否する
          return Promise.resolve(null)

          // ErrorオブジェクトやリダイレクトURLを指定してコールバックをリジェクトすることもできます。
          // return Promise.reject(new Error('error message')) // エラーページにリダイレクト
          // return Promise.reject('/path/to/redirect')        // URL にリダイレクト
        }
      },
    }),
    // ...add more providers here
  ],
  // adapter: FirebaseAdapter(firestore),
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
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
};

export default (req, res) => NextAuth(req, res, options)


