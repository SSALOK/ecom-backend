// code by alok
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already exists",
      });
  });
  const { firstName, lastName, email, password } = req.body;
  const _user = new User({
    firstName,
    lastName,
    email,
    password,
    userName: Math.random().toString(),
  });
  _user.save((error, data) => {
    if (error) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }

    if (data) {
      return res.status(201).json({
        message: "user created successfully.",
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullname } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullname },
        });
      } else {
        return res.status(400).json({
          message: "invalid password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.requireSignin = (req, res, next) => {
  const token = req.header.authorization.split(" ")[1];
  const user = jwt.decode(token, process.JWT_SECRET);
  req.user = user;
  next();
};
