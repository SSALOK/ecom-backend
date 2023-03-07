const express = require("express");

const { addCategory } = require("../controllers/category");
const router = express.Router();

router.post("/category/create", addCategory);

module.exports = router;
