const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/:categoryId", categoryController.categoryInfo);

module.exports = { router };
