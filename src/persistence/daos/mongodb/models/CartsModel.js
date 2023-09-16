import mongoose, { Schema } from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {type: Number,},
      },
    ],
    default: [],
    require: true,
  },
});

cartsSchema.pre('find', function(){
  this.populate('products');
});



export const CartsModel = mongoose.model("carts", cartsSchema);
