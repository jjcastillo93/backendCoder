import { cartModel } from "../models/cart.model"; 
import BasicManager from "./basicManager";

class CartManager extends BasicManager {
  constructor(){
    super(cartModel)
  }
}

export const cartManager = new CartManager();