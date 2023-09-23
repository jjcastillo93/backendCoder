import express from 'express';
import fs from 'fs/promises';
import ProductManager from '../ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
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

router.get('/:pid', async (req, res) => {
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
  
  router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const product = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
      status: true,
    };
    try {
      const newProduct = await productManager.addProduct(product);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto' });
    }
  });
  
  router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;
    try {
      await productManager.updateProduct(parseInt(pid), updatedFields);
      res.json({ message: 'Producto actualizado con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });
  
  router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
      await productManager.deleteProduct(parseInt(pid));
      res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });

export default router;
