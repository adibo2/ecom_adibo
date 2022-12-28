// import Review from "../../../model/reviews"
// import db from "./../../../utils/db";

// export default async function handler(req, res) {
//     if(req.method !== 'POST'){
//         return;
//     }
//     const { firstname, rating, email,note } = req.body;

//     await db.connect();
//     const newReview = new Review({
//         firstname,
//         rating,
//         email,
//         note,
    
//       });

// //    const newreviews=await Review.create(req.body);

//    const review = await newReview.save();
//    await db.disconnect();

//    res.status(201).json({
//     status: "success",
//     // results:nreviews.length,
//     data:{
//         newReview
//     }

//    },
//    )
//   }