import mongoose from 'mongoose'
const reviewSchema = mongoose.Schema(
    {
        note:{
            type: String,
            required: [true,' kr can not be empty'],                     
        },
        rating:{
            type: Number,
            min:1,
            max:5,
            required: [true,'rating can not be empty'],
        },
        firstname:{
            type: String,
            required: [true,'name required'],    
        },
        email:{
            type: String,
            required: [true,'name required'],    
        },
        // product:{
        //     type:mongoose.Schema.ObjectId,
        //     ref:'Product',
        //     required: [true,'product can not be empty'],
        // }

   

    },
    {
        timestamps: true,
    }
)

const Review = mongoose.models.Review || mongoose.model('Review',reviewSchema)
export default Review;