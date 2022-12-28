import db from "./../../../utils/db";
import Admin from "../../../model/admin";
import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export default NextAuth({
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async jwt({ token, admin }) {
        if (admin?._id) token._id = admin._id;
        // if (user?.isAdmin) token.isAdmin = user.isAdmin;
        return token;
      },
      async session({ session, token }) {
        if (token?._id) session.admin._id = token._id;
        // if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
        return session;
      },
    },
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          await db.connect();
          const admin = await Admin.findOne({
            name: credentials.name,
          });
          console.log("sd,kls,dksjndjksdhjksdnsjkdjsnjdj")
          await db.disconnect();
          console.log("sd,kls,dksjndjksdhjksdnsjkdjsnjdj")
          if (admin && bcryptjs.compareSync(credentials.password, admin.password)) {
            console.log("cksdkopsdksmdksldslkdmks");
            return {
              _id: admin._id,
              name: admin.name,
           
            };
          }
          throw new Error('Invalid email or password');
        },
      }),
    ],
  });