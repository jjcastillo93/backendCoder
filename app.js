import express from 'express';
import fs from 'fs/promises';
import ProductManager from './ProductManager';

const app = express();
const port = 3000;

const productManager = new ProductManager();

app.use(express.json());

app.get('/products', async (req, res) => {
  const { limit } = req.query;

  try {
    const allProducts = await fs.readFile('productos.json', 'utf8');
    const parsedProducts = JSON.parse(allProducts);

    if (limit) {
      res.json(parsedProducts.slice(0, parseInt(limit)));
    } else {
      res.json(parsedProducts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;

  try {
    const allProducts = await fs.readFile('productos.json', 'utf8');
    const parsedProducts = JSON.parse(allProducts);
    const product = parsedProducts.find(product => product.id === parseInt(pid));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
