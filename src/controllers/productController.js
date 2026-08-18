const productService = require('../services/productService');

const productController = {
    getAll: async (req, res) => {
        try {
            const products = await productService.getProducts();
            res.status(200).json({ success: true, count: products.length, data: products });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },
    getById: async (req, res) => {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            res.status(200).json({ success: true, data: product });
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },
    create: async (req, res) => {
        try {
            const newProduct = await productService.addProduct(req.body);
            res.status(201).json({ success: true, data: newProduct });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(400).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const updatedProduct = await productService.updateProduct(req.params.id, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            res.status(200).json({ success: true, data: updatedProduct });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(400).json({ success: false, message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const deletedProduct = await productService.deleteProduct(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            res.status(200).json({ success: true, data: {} });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
};

module.exports = productController;
