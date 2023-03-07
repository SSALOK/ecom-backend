const express = require("express");

const { addCategory, getCategories } = require("../controllers/category");
const router = express.Router();

router.post("/category/create", addCategory);
router.get("/category/getcategories", getCategories);

module.exports = router;
