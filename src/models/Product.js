const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    upcCode: { type: String, required: false },
    batchNumber: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    quantity: { type: Number, required: true, min: 0 },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
