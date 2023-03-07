const express = require("express");

const { addCategory, getCategories } = require("../controllers/category");
const router = express.Router();

router.post("/category/create", addCategory);
<<<<<<< Updated upstream
router.get("/category/get", getCategories);
=======
router.get("/category/getcategory", getCategories);
>>>>>>> Stashed changes

module.exports = router;
