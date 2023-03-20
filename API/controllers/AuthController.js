const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorResponse, successResponse } = require("../Utils/HttpAPI");
const { registerValidation, loginValidation } = require("../validations.js");

let controller = {};

controller.UserRegister = async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error)
    return errorResponse(res, {
      error: error.details[0].message,
    });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return errorResponse(res, {
      error: "Este email ya se encuentra registrado!",
    });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const user = User({
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    return successResponse(res, { user: newUser._id });
  } catch (error) {
    console.log("Error registering user: ", error);
    return serverErrorResponse(res, { error: error.toString() });
  }
};

controller.UserLogin = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const registeredUser = await User.findOne({ email: req.body.email });
  if (!registeredUser)
    return errorResponse(res, {
      error: "Email/password erroneo!",
    });

  const passwordMatch = bcrypt.compareSync(
    req.body.password,
    registeredUser.password
  );
  if (!passwordMatch)
    return errorResponse(res, {
      error: "Email/password erroneo!",
    });

  const token = jwt.sign({ _id: registeredUser._id, email: registeredUser.email,}, process.env.JWT_SECRET);
  res.header("auth-token", token).json({token});
};

module.exports = { AuthController: controller };
