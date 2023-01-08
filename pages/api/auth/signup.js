import db from "./../../../utils/db";
import User from "../../../model/User";
// const twilio=require('twilio')(process.env.Account_SID, process.env.Auth_Token)


export default async function handler(req, res) {
    if(req.method !== 'POST'){
        return;
    }
    const { firstname, email } = req.body;
  if (
    !firstname ||
    !email ||
    !email.includes('@') 
    
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

    // res.status(200).json({ name: 'message send succesfully' })
    await db.connect();

    // const newUser = new User({
    //   firstname,
    //   lastname,
    //   email,
    //   repeatemail,
  
    // });
    const newUser = new User({
      firstname,
      email,
      isAdmin: false,
    });
    const user = await newUser.save();
    await db.disconnect();
  
     res.status(201).send({
    
      message: 'Created user!',
      _id: user._id,
      firstname: user.firstname,
      email: user.email,
      isAdmin: user.isAdmin,
  
    });
  }



  