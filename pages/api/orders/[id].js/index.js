import Order from "../../../../model/Order";
import { getSession } from "next-auth/react";
import db from "../../../../utils/db";

const handler = async (req, res) => {
    // const session = await getSession({ req });
    const session = await getSession({ req });
    const { user } = session;
    if (!session) {
      return res.status(401).send('signin required');
    }
  
    await db.connect();
  
    // const order = await Order.findById(req.query.id);
    const order = await Order.find({user:user._id})

    await db.disconnect();
    res.send(order);
  };
  
export default handler;
  