import Product from "../../../../../model/Product";
import db from "../../../../../utils/db";
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
    else if (req.method === 'PUT') {
      return putHandler(req, res);
    } 
    // else if (req.method === 'DELETE') {
    //   return deleteHandler(req, res, user);
    // } 
    else {
      return res.status(400).send({ message: 'Method not allowed' });
    }
  };
  const getHandler = async (req, res) =>{
    await db.connect();
    const productwin=await Product.findById(req.query.id);
    await db.disconnect()
    console.log(productwin)
    res.send(productwin)
  }
  const putHandler = async (req, res) =>{
    await db.connect();
    const productwin=await Product.findById(req.query.id);
    if(productwin){
      productwin.name=req.body.name;
      productwin.slug=req.body.slug;
      productwin.price=req.body.price;
      productwin.notprice=req.body.notprice;
      productwin.meta=req.body.meta;
      productwin.stock=req.body.Stock;
      productwin.title=req.body.title;
      productwin.alt=req.body.alt;
      productwin.description=req.body.desc;
      await productwin.save();
      await db.disconnect();
      res.send({ message: 'Product updated successfully' });

    }
    else {
      await db.disconnect();
      res.status(404).send({ message: 'Product not found' });
    }

  }


 export default handler; 