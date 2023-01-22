import Product from "../../../../../model/Product";
import Order from "../../../../../model/Order";
import db from "../../../../../utils/db";
import { getSession } from 'next-auth/react';
const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session || (session && !session.user.isAdmin)) {
      return res.status(401).send('signin required');
    }
  
    const { user } = session;

     if (req.method === 'DELETE') {
      return deleteHandler(req, res, user);
    } 
    else {
      return res.status(400).send({ message: 'Method not allowed' });
    }
  };


  const deleteHandler = async (req, res) => {
    await db.connect();
    const Orderdel = await Order.findById(req.query.id);
    if (Orderdel) {
      await Orderdel.remove();
      await db.disconnect();
      res.send({ message: 'Product deleted successfully' });
    } else {
      await db.disconnect();
      res.status(404).send({ message: 'Product not found' });
    }
  };


 export default handler; 