import mongoose from "mongoose";
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
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      },
  },

)

const productofficeSchema = new mongoose.Schema(
  {
    index: { type: String, required: true },
    name: { type: String, required: true },

    slug: { type: String, required: true, unique: true },
    // category: { type: String, required: true },
    img: { type: String, required: true },
    // desc:{ type: String, required: true },
    alt: { type: String, required: true },
    title:{ type: String, required: true },
    meta:{ type: String, required: true },
    stock:{ type: Number, required: true},

    price: { type: Number, required: true },
    notprice:{ type: Number, required: true },
    reviews:[reviewSchema]
    // rating: { type: Number, required: true, default: 0 },
    // numReviews: { type: Number, required: true, default: 0 },
    // countInStock: { type: Number, required: true, default: 0 },
    // description: { type: String, required: true },
    // isFeatured: { type: Boolean, default: false },
    // banner: String,
  },
  {
    timestamps: true,
  },

);


const Productoffice = mongoose.models.Productoffice || mongoose.model("Productoffice", productofficeSchema);
export default Productoffice;