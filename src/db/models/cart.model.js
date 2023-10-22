import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    stock:{
        type: Number,
        default: 0,
    },
})
export const cartModel = model("cart", cartSchema);