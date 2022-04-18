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
        let color = req.color ? req.color.split(',') : [];
        let material = req.material ? req.material.split(',') : [];
        let subCategory = req.subCategory ? req.subCategory.split(',') : [];

        price = price.map(item => {
            return parseInt(item);
        });

        const query = {}

        if (name) {
            query.name = { $regex: name, $options: 'i' }
        }

        if (price.length > 0) {
            query.price = { $in: [...price] }
        }

        if (discount.length > 0) {
            query.discount = { $in: discount }
        }

        if (brand.length > 0) {
            query.brand = { $in: brand }
        }

        if (age.length > 0) {
            query.age = {
                $in: age.map(age => {
                    return { $gte: age.split('-')[0] * 12, $lte: age.split('-')[1] * 12 }
                })
            }
        }

        if (color.length > 0) {
            query.color = { $in: color }
        }

        if (material.length > 0) {
            query.material = { $in: material }
        }

        if (subCategory.length > 0) {
            query.subCategory = { $in: subCategory }
        }

        const productData = await Product.find(query);
        return res.status(200).json({
            productData
        });

        // const totalPage = Math.ceil(productData.length / 10);

        // res.status(200).json({
        //     productData,
        //     totalPage
        // });

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