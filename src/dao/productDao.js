const Product = require('../models/Product');

const productDao = {
    getAllProducts: async () => {
        return await Product.find({}).sort({ expiryDate: 1 }); // Sort by expiry date ascending
    },
    getProductById: async (id) => {
        return await Product.findById(id);
    },
    createProduct: async (productData) => {
        const product = new Product(productData);
        return await product.save();
    },
    updateProduct: async (id, productData) => {
        return await Product.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
    },
    deleteProduct: async (id) => {
        return await Product.findByIdAndDelete(id);
    }
};

module.exports = productDao;
