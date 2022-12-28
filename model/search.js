import mongoose from "mongoose";

const fetchSchema = new mongoose.Schema(
  {
    index: { type: String, required: true },
    name: { type: String, required: true },

    slug: { type: String, required: true, unique: true },
    // category: { type: String, required: true },
    img: { type: String, required: true },

    alt: { type: String, required: true },
    title:{ type: String, required: true },
    meta:{ type: String, required: true },
    stock:{ type: Number, required: true},

    price: { type: Number, required: true },
    notprice:{ type: Number, required: true },
    // rating: { type: Number, required: true, default: 0 },
    // numReviews: { type: Number, required: true, default: 0 },
    // countInStock: { type: Number, required: true, default: 0 },
    // description: { type: String, required: true },
    // isFeatured: { type: Boolean, default: false },
    // banner: String,
  },
  {
    timestamps: true,
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true }
  // }
);

const Fetch = mongoose.models.Fetch || mongoose.model("Fetch", fetchSchema);
export default Fetch;