import Order from "../../../model/Order";
import db from "../../../utils/db";
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
    const session = await getSession({ req });
    console.log("dsdksmkdmsld"+session);

    
  
    const { user } = session;
    console.log("sld"+user.email)

    await db.connect();
    const existingOrder = await Order.findOne({ user: user._id });
    // if (!existingOrder) {
    //   const newOrder = new Order({
    //     ...req.body,
    //     user: user._id,
    //   });
    // if (!existingOrder) {
    //   const newOrder = new Order({
    //     ...req.body,
    //     user: user._id,
    //   });
    
    //   const order = await newOrder.save();
    // res.status(201).send(order);
    // } else {
    //   existingOrder.orderItems = [...req.body.orderItems];
    //   existingOrder.totalPrice = [...req.body.totalPrice];


    //   const updatedOrder = await existingOrder.save();
    //   res.status(200).send(updatedOrder);
    // }

if (existingOrder) {
  existingOrder.orderItems = req.body.orderItems;
  existingOrder.totalPrice = req.body.totalPrice;

  const updatedOrder = await existingOrder.save();
  res.status(200).send(updatedOrder);
  return;
}

const newOrder = new Order({
  ...req.body,
  user: user._id,
});

const order = await newOrder.save();
res.status(201).send(order);
    
    

  
    
  };
  export default handler;