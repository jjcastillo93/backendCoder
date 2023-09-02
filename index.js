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
}
const productManager = new ProductManager();
productManager.addProduct("Zapato", "Zapato nike talla 40", 50.000, "thumbnailEjemplo1.jpg", "crx1", 10);
productManager.addProduct("Camisa", "Camisa maga corta", 10.000, "thumbnailEjemplo2.jpg", "crx2", 5);
const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);
const productById = productManager.getProductById(2);
console.log("Producto por ID:", productById);
const nonExistentProduct = productManager.getProductById(3);
