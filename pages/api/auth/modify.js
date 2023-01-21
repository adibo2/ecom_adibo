import db from "./../../../utils/db";
import User from "../../../model/User";
import { getSession } from 'next-auth/react';
// const twilio=require('twilio')(process.env.Account_SID, process.env.Auth_Token)


export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ message: 'signin required' });
      }
      const {user}=session
      const {firstname,lastname,email,repeatemail}=req.body
      if (
        !firstname ||
        !lastname ||
        !email ||
        !email.includes('@') 
      ) {
        res.status(422).json({
          message: 'Validation error',
        });
        return;
      }
      
  await db.connect();
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.firstname = firstname;
  toUpdateUser.lastname = lastname;
  toUpdateUser.email = email;
  toUpdateUser.repeatemail = repeatemail;
  
  await toUpdateUser.save();
  await db.disconnect();
  res.send({
    message: 'User updated',
  });

   
  }