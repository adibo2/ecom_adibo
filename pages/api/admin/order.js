import Order from "../../../model/Order";
import { getSession } from 'next-auth/react';
import db from "../../../utils/db";
const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session || (session && !session.user.isAdmin)) {
      return res.status(401).send('signin required');
    }
   if(req.method === 'GET'){
    await db.connect();
    // populate('firstname','lastname','email')
    // populate('user','firstname').populate('user','email')
    const orders=await Order.find({}).populate({
        path: 'user',
        select:'firstname lastname email',
    });
    console.log(orders);
    await db.disconnect()
    res.send(orders)
   }
   else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
  };
  
  export default handler;
