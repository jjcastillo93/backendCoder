import express from 'express';
import CartManager from '../CartManager.js'; 

const router = express.Router();
const cartManager = new CartManager();


router.get('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = cartManager.getCartById(parseInt(cid));
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    cartManager.addProductToCart(parseInt(cid), pid, quantity);

    res.status(201).json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

export default router;
