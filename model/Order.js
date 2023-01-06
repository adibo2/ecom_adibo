import mongoose from "mongoose";
const OrderSchema= new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        orderItems: [
            {
              name: { type: String, required: true },
              amount: { type: Number, required: false },
              img: { type: String, required: false },
              price: { type: Number, required: false },
            },
          ],
          totalPrice: { type: Number, required: true },
          isPaid: { type: Boolean, required: true, default: false },
          isDelivered: { type: Boolean, required: true, default: false },
          paidAt: { type: Date },
          deliveredAt: { type: Date },

    },
    { timestamps: true }
)
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;