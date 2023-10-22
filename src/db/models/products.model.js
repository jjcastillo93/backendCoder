import { Schema, model } from "mongoose";

const productSchema = new Schema({
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
    description:{
        type: String,
        required: true,
    },
})
export const productsModel = model("Products", productSchema);