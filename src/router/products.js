import { Router } from 'express';
import { productManager } from '../db/managers/ProductManager.js';

const router = Router();

router.post("/", async (req, res) => {
  const {title, price, stock, description} = req.body
  if (!title || price || !stock || !description){
    return res.status(400).json({message: 'All data is required'})
  }
  try {
    const createdProduct = await productManager.createOne(req.body)
    res.status(200).json({message: 'Product created',product:createdProduct})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
});

export default router;
