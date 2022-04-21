/* 

const userSchema = new monogose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
        {
            type: monogose.Schema.Types.ObjectId,
            ref: 'Product', required: false
        }
    ],
    sortlist: [
        {
            type: monogose.Schema.Types.ObjectId,
            ref: 'Product', required: false
        }
    ],
},
*/

const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json({
            user
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(200).json({
            user
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            user
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

//add to cart
router.patch('/:id/add-cart', async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id,
            {
                $push: { cart: [req.body.productId] }
            },
            { new: true });
        res.status(200).json({
            data
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

//remove from cart
router.patch('/:id/remove-cart', async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id,
            {
                $pull: { cart: req.body.productId }
            },
            { new: true });
        res.status(200).json({
            data
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            user
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;