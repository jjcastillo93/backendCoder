import { Router } from "express"; 
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", (req, res) => {
    const products = productManager.getProducts();
    res.render("realTimeProducts", { products });
});

router.get("/createproduct", (req, res) => {
    res.render('createProducts');
});

export default router;
