const express = require("express");
const router = express.Router();

const cartRouter = require("./cartRouter");
router.use("/cart", cartRouter.router);

const categoryRouter = require("./categoryRouter");
router.use("/categories", categoryRouter.router);

module.exports = router;
