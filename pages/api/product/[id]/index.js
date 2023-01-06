import db from "../../../../utils/db";
import Product from "../../../../model/Product";

export default async function handler(req, res) {
    if(req.method === 'POST'){
        const { firstname, rating, email,note } = req.body;
        await db.connect();
        const product = await Product.findById(req.query.id);
        // res.send(product);
        const review = {
            
            firstname,
            rating,
            email,
            note
        
          } 
          product.reviews.unshift(review);
        //   let reviewProduct=[review,...product.reviews]
          product.numReviews = product.reviews.length

          await product.save()
          await db.disconnect();

          res.status(201).json({
           status: "success",
           // results:nreviews.length,
           data:{
            product
           }
       
          },
          )
    }
    if(req.method === 'GET'){
        await db.connect();
        const product = await Product.findById(req.query.id);
        await db.disconnect();
        res.send(product);

    }


    // const review = {
    //     firstname: req.user.name,
    //     rating: Number(rating),
    //     comment,
    //     user: req.user._id,
    //   }
    // const newReview = new Review({
    //     firstname,
    //     rating,
    //     email,
    //     note,
    
    //   });

//    const newreviews=await Review.create(req.body);

//    const review = await newReview.save();

  }