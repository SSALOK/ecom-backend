const express = require("express");
const { signup, signin } = require("../controllers/auth");
const {
  validateSignupRequest,
  isReuestValidated,
  validateSigninRequest,
} = require("../Validators/auth");
const router = express.Router();

router.post("/signup", validateSignupRequest, isReuestValidated, signup);
router.post("/signin", validateSigninRequest, isReuestValidated, signin);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
module.exports = router;
