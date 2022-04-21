const express = require('express');

const productController = require("./controllers/product.controller");
const userController = require("./controllers/user.controller");

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/products', productController);
app.use('/users', userController);

module.exports = app;