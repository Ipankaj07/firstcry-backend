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

router.post('/signup', async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                message: 'Email or password is incorrect'
            });

        }

        const isPasswordMatch = await user.password === req.body.password;
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: 'Email or password is incorrect'
            });
        }
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

//add - cart
router.patch('/cart/add', async (req, res) => {
    console.log(req.body);
    try {

        const data = await User.findByIdAndUpdate(req.body.userId,
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
router.patch('/cart/remove', async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.body.userId,
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

//shortlist-----------------

router.patch('/sortlist/add', async (req, res) => {
    try {

        const data = await User.findByIdAndUpdate(req.body.userId,
            {
                $push: { sortlist: [req.body.productId] }
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

//remove from sortlist
router.patch('/sortlist/remove', async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.body.userId,
            {
                $pull: { sortlist: req.body.productId }
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

router.get("/:id", async (req, rse) => {
    try {
        const user = await User.findById(req.params.id);
        rse.status(200).json({
            user
        });
    }
    catch (err) {
        rse.status(500).json({
            message: err.message
        });
    }
})

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