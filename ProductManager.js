class ProductManager {
  constructor() {
    this.products = [];
    this.autoIncrementId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios.");
      return;
    }
    if (this.products.some(product => product.code === code)) {
      console.log("Ya existe un producto con el mismo código.");
      return;
    }
    const product = {
      id: this.autoIncrementId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
    console.log("Producto agregado con éxito.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado.");
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      console.log("Producto no encontrado.");
      return;
    }

    const updatedProduct = { ...this.products[productIndex], ...updatedFields };
    this.products[productIndex] = updatedProduct;

    console.log("Producto actualizado con éxito.");
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      console.log("Producto no encontrado.");
      return;
    }

    this.products.splice(productIndex, 1);
    console.log("Producto eliminado con éxito.");
  }
}

export default ProductManager;
