import { Router } from 'express';

import * as productController from '../controllers/product.controller';

const router = Router();

router.post('/products', productController.addProduct);
router.get('/products', productController.getProducts);
router.patch('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

export default router;
