import express from 'express';
import { getProducts, addProduct, deleteProduct, updateProduct } from "../controller/products.controller.js";

const router = express.Router();

router.get('/', getProducts)
router.post('/', addProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', updateProduct);

export default router;