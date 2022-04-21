const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');

router.get('/', async (req, res) => {
    try {
        const product = await Product.find();
        return res.status(200).json({
            product
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.get("/filters", async (req, res) => {
    try {
        let name = req.query.name ? req.query.name : '';
        let price = req.query.price ? req.query.price.split(',') : [];
        let discount = req.query.discount ? req.query.discount.split(',') : [];
        let brand = req.query.brand ? req.query.brand.split(',') : [];
        let age = req.query.age ? req.query.age.split(',') : [];
        let color = req.query.color ? req.query.color.split(',') : [];
        let material = req.query.material ? req.query.material.split(',') : [];
        let subCategory = req.query.subCategory ? req.query.subCategory.split(',') : [];
        let gender = req.query.gender ? req.query.gender : '';

        // price = price.map(item => {
        //     return parseInt(item);
        // });

        const query = {}

        if (name) {
            query.name = { $regex: name, $options: 'i' }
        }

        if (gender) {
            query.gender = { $in: gender }
        }

        if (price.length > 0) {
            // query.price = { $in: [...price] }
            query.price = { $lte: +price }
        }

        if (discount.length > 0) {
            query.discount = { $lte: +discount }
        }

        if (brand.length > 0) {
            query.brand = { $in: [...brand] }
        }

        if (age.length > 0) {
            age = age.join('-');
            query.age = { $in: age }
        }

        if (color.length > 0) {
            query.color = { $in: [...color] }
        }

        if (material.length > 0) {
            query.material = { $in: [...material] }
        }

        if (subCategory.length > 0) {
            query.subCategory = { $in: [...subCategory] }
        }

        const productData = await Product.find(query);
        return res.status(200).json(
            productData
        );

    }

    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}
)


router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean().exec();
        res.status(200).send(product);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(
            product
        );
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            product
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            product
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;
