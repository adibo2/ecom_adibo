import Review from "../../../model/reviews"
import db from "./../../../utils/db";


export default async function handler(req, res) {
    // if(req.method !== 'POST'){
    //     return;
    // }
    await db.connect();

   const reviews=await Review.find();
   res.status(200).json({
    status: "success",
    message: 'Created user!',
    results:reviews.length,
    data:{
        reviews
    }

   },
   )
   await db.disconnect();
  }