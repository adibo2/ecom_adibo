import db from "./../../../utils/db";
import User from "../../../model/User";
// const twilio=require('twilio')(process.env.Account_SID, process.env.Auth_Token)


export default async function handler(req, res) {
    if(req.method !== 'POST'){
        return;
    }
    const { firstname, lastname, email,repeatemail } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !email.includes('@') ||
    !repeatemail 
    
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

    await db.connect();
    // User.dropIndex( { email: 1 }, { unique: true } )

    const newUser = new User({
      firstname,
      lastname,
      email,
      repeatemail,
  
    });
    const user = await newUser.save();
    await db.disconnect();
  
    res.status(201).send({
      message: 'Created user!',
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      repeatemail: user.repeatemail,
  
    });
  }



  