import db from "./../../../utils/db";
import Admin from "../../../model/admin";
import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import User from "../../../model/User";
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async jwt({token,user}) {
        if (user?._id) token._id = user._id;
        if (user?.isAdmin) token.isAdmin = user.isAdmin;

        // if (user?.isAdmin) token.isAdmin = user.isAdmin;
        return token;
      },
      async session({ session, token}) {
        // if (tokenadmin?._id) session.admin._id = token._id;
        if (token?._id) session.user._id = token._id;

         if (token?.isAdmin) session.user.isAdmin = token.isAdmin;

        return session;
      },
    },
    // secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          await db.connect();
          console.log("created credentials"+credentials.email)
          const user = await User.findOne({
            email: credentials.email,
          });

          console.log("sd,kls,dksjndjksdhjksdnsjkdjsnjdj")
          await db.disconnect();
          console.log(user);

          console.log("sd,kls,dksjndjksdhjksdnsjkdjsnjdj")
          if(user.isAdmin){
            return {
              _id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              repeatemail: user.repeatemail,
              isAdmin: user.isAdmin,

            

            };
          }
   

          if (user) {
            return {
              _id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              repeatemail: user.repeatemail,
              isAdmin: user.isAdmin,


            };
          }
          else {
            return null;
          }
       
          // throw new Error('Invalid email');
        },
      }),
    ],
    // secret: process.env.SECRET,



  });


  



  
