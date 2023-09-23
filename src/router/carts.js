import express from 'express';

const router = express.Router();
const carts = [];

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await getCartById(cid);
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
    const cart = await getCartById(cid);

    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
    }

    const existingProduct = cart.products.find(product => product.product === pid);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    res.status(201).json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

async function getCartById(cid) {
  return new Promise((resolve, reject) => {
    const cart = carts.find(cart => cart.id === cid);
    if (cart) {
      resolve(cart);
    } else {
      reject(new Error('Carrito no encontrado'));
    }
  });
}

export default router;
