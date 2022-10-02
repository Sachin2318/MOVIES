import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          if (email !== "shubham@difx.io" || password !== "12345") {
            return null;
          }
          return {
            id: "1234",
            email: email,
            name: "Shubham",
            role: "admin",
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  secret: "supersecret",
  jwt: {
    secret: "supersecret",
    expiresIn: "1d",
  },
};

export default NextAuth(authOptions);
