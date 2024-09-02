import { Schema, model } from "mongoose";
import { Carts } from "../interfaces/carts";

const cartsSchema: Schema = new Schema<Carts>({
  cartItems: [{
    product: { type: Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, default: 1 },
    price: Number
  }],
  totalPrice: Number,
  totalPriceAfterDiscount: Number,
  user: { type: Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true });

cartsSchema.pre<Carts>(/^find/, function (next) {
  this.populate({ path: 'cartItems.product', select: 'name cover' })
  next()
})

export default model<Carts>('carts', cartsSchema)