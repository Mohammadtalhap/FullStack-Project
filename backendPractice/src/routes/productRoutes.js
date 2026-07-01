import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from '../middlewares/upload.js';

const router = Router();

router.post('/products', upload.single('image'), authMiddleware, createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', upload.single('image'), authMiddleware, updateProduct);
router.delete('/products/:id', authMiddleware, deleteProduct);

export default router;