const express = require("express");
const { signup, signin } = require("../../controllers/admin/auth");
const {
  validateSignupRequest,
  isReuestValidated,
  validateSigninRequest,
} = require("../../Validators/auth");
const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isReuestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isReuestValidated, signin);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
module.exports = router;
