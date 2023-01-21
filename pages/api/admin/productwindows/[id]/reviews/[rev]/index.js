import Product from "../../../../../../../model/Product";
import db from "../../../../../../../utils/db";
import { getSession } from 'next-auth/react';
const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session || (session && !session.user.isAdmin)) {
      return res.status(401).send('signin required');
    }
  
    const { user } = session;
    if (req.method === 'GET') {
      return getHandler(req, res, user);
    } 
    
    else if (req.method === 'DELETE') {
      return deleteHandler(req, res, user);
    } 
    else {
      return res.status(400).send({ message: 'Method not allowed' });
    }
  };
  const getHandler = async (req, res) =>{
    await db.connect();
    console.log(req.query.id);
    const productwin=await Product.findById(req.query.id);
    await db.disconnect()

    res.send(productwin.reviews)
  }
  
  const deleteHandler = async (req, res) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    console.log(req.query.id);
    console.log("rev"+req.query.rev)
   
    
    if (product) {
      await product.reviews.id(req.query.rev).remove();
      await product.save();
      await db.disconnect();
      res.send({ message: 'Product deleted successfully' });
    } else {
      await db.disconnect();
      res.status(404).send({ message: 'Product not found' });
    }
  };


 export default handler; 