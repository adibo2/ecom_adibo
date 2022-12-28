import db from '../../../utils/db';
import Product from '../../../model/Product';
import Review from '../../../model/reviews';

const handler = async (req, res) => {
  await db.connect();
  const product = await Product.find();
  await db.disconnect();
  res.status(200).json({
    status: "success",
    // products:product.length,
    data:{
        product
    }

   });
  
}

export default handler;