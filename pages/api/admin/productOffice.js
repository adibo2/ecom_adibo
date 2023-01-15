import Productoffice from "../../../model/Productoffice";
import Order from "../../../model/Product";
import { getSession } from 'next-auth/react';
import db from "../../../utils/db";

const handler=async (req,res)=>{
    const session = await getSession({ req });
    console.log(session);
    if(req.method === 'GET'){
        return getProduct(req,res)
    }
    else if(req.method === 'POST'){
        return postProduct(req,res);
    }
    else{
        return res.status(400).send({ message: 'Method not allowed' });

    }
    
    
}
const getProduct=async(req,res)=>{
    await db.connect();
    const office=await Productoffice.find({});
    await db.disconnect();
    res.send(office);
 }

const postProduct=async(req,res)=>{
    return res.status(201).send({ message: 'Method not allowed' });
    
    
}


 export default handler;