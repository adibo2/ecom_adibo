import Order from "../../../model/Order";
import User from "../../../model/User";
import Product from "../../../model/Product";
import Productoffice from "../../../model/Productoffice";
import { getSession } from 'next-auth/react';
import db from "../../../utils/db";


const handler=async (req,res)=>{
    const session = await getSession({ req });
    console.log(session);
    if (!session || (session && !session.user.isAdmin)) {
      return res.status(401).send('signin admin required');
    }
    await db.connect();
    const orderCount=await Order.countDocuments();
    const Productwindows=await Product.countDocuments();
    const ProductOffice=await Productoffice.countDocuments();
    const userCount=await User.countDocuments();
    const orderPriceGroup=await Order.aggregate([
        {
            $group: {
              _id: null,
              sales: { $sum: '$totalPrice' },
            },
          },
    ])
    console.log(orderPriceGroup);
    const orderPrice = orderPriceGroup.length > 0 ? orderPriceGroup[0].sales : 0;
    await db.disconnect()
    res.send({orderCount,Productwindows,ProductOffice,userCount,orderPrice});

}
export default handler