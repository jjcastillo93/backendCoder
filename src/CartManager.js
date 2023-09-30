class CartManager {
    constructor() {
      this.carts = [];
      this.autoIncrementId = 1;
    }
  
    addCart() {
      const cart = {
        id: this.autoIncrementId++,
        products: [],
      };
      this.carts.push(cart);
      return cart;
    }
  
    getCartById(cartId) {
      return this.carts.find(cart => cart.id === cartId);
    }
  
    addProductToCart(cartId, productId, quantity) {
      const cart = this.getCartById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
  
      const existingProduct = cart.products.find(product => product.product === productId);
  
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }
  
    deleteCart(cartId) {
      const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
      if (cartIndex !== -1) {
        this.carts.splice(cartIndex, 1);
      }
    }
  }
  
  export default CartManager;
  