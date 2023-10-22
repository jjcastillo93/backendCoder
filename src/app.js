import express from 'express';
import productsRouter from './router/products.js';
import cartsRouter from './router/carts.js';
import handlebars from 'express-handlebars';
import viewsRouter from './router/views.router.js';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';


const app = express();
const port = 8080;

const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded ({extended:true}));
app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set("view engine","handlebars");
app.set('views', __dirname + '/views');

app.use("/", viewsRouter);

app.use('/products',productsRouter);
app.use('/carts', cartsRouter);

app.get('/', (req, res) => {
  const products = productManager.getProducts();
  console.log(products);
  res.render('realTimeProducts', { products });
});


const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
  console.log(`cliente conectado ${socket.id}`)
  socket.on("disconnect", () => {console.log(`cliente desconectado ${socket.id}`)})
  
})
