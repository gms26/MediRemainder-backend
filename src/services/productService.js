const productDao = require('../dao/productDao');

const productService = {
    getProducts: async () => {
        return await productDao.getAllProducts();
    },
    getProductById: async (id) => {
        return await productDao.getProductById(id);
    },
    addProduct: async (productData) => {
        return await productDao.createProduct(productData);
    },
    updateProduct: async (id, productData) => {
        return await productDao.updateProduct(id, productData);
    },
    deleteProduct: async (id) => {
        return await productDao.deleteProduct(id);
    }
};

module.exports = productService;
