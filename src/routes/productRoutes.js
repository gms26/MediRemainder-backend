const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// TODO: Add auth middleware if products should be protected

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products from the database, sorted by expiry date.
 *     responses:
 *       200:
 *         description: A list of products.
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product entry in the system.
 *     responses:
 *       201:
 *         description: Product created successfully.
 */
router.post('/', productController.create);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *   put:
 *     summary: Update a product by ID
 *   delete:
 *     summary: Delete a product by ID
 */
router.get('/:id', productController.getById);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
