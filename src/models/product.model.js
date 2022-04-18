const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    age: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    gender: { type: String, required: true },
    color: { type: String, required: true },
    material: { type: String, required: true },
    subCategory: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);