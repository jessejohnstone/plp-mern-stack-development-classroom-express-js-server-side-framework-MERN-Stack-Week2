const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');
const { validateProduct } = require('../middleware/validate');

// Routes
router.get('/', productsController.listProducts);
router.get('/stats/categories', productsController.categoryStats);
router.get('/:id', productsController.getProductById);
router.post('/', auth, validateProduct, productsController.createProduct);
router.put('/:id', auth, validateProduct, productsController.updateProduct);
router.delete('/:id', auth, productsController.deleteProduct);

module.exports = router;
