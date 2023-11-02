const express = require("express");
const router = express.Router();

const cartRouter = require("./cartRouter");
const categoryRouter = require("./categoryRouter");
const userRouter = require("./userRouter");
const subscriptionRouter = require("./subscriptionRouter");
const productRouter = require("./productRouter");

router.use("/cart", cartRouter.router);
router.use("/categories", categoryRouter.router);
router.use("/users", userRouter.router);
router.use("/subscription", subscriptionRouter.router);
router.use("/products", productRouter.router);

module.exports = router;
