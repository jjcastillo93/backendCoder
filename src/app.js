import express from 'express';
import productsRouter from './router/products.js';
import cartsRouter from './router/carts.js';

const app = express();
const port = 8080;


app.use(express.json());

app.use('/products',productsRouter);
app.use('/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
