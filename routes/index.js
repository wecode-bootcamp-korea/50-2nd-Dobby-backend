const express = require('express');
const router = express.Router(); 

const productRouter = require("./productRouter")
const cartRouter = require("./cartRouter");
const categoryRouter = require("./categoryRouter");

router.use('/products', productRouter.productRouter)
router.use("/cart", cartRouter.router);
router.use("/categories", categoryRouter.router);

module.exports = router;

