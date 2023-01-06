import Order from "../../../model/Order";
import db from "../../../utils/db";
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
    const session = await getSession({ req });
    console.log("dsdksmkdmsld"+session);

    
  
    const { user } = session;

    await db.connect();
    const newOrder = new Order({
      ...req.body,
      user: user._id,
    });
  
    const order = await newOrder.save();
    res.status(201).send(order);
  };
  export default handler;