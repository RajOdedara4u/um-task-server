import express from "express";
const Userrouter = express.Router();
import validate from "../middlewares/validate-middleware.js";
import {
  login,
  registration,
  userVerify,
} from "../controllers/userControllers.js";
import { loginSchema, registerSchema } from "../validator/user-validator.js";
import middleware from "../middlewares/middleware.js";
import { updateUser } from "../controllers/userControllers.js";
import { updateprofileschema } from "../validator/user-validator.js";
Userrouter.route("/users/userVerify").get(middleware, userVerify);
Userrouter.route("/users/login").post(validate(loginSchema), login);
Userrouter.route("/users/registration").post(
  validate(registerSchema),
  registration
);
Userrouter.route("/users/updateuser").put(
  middleware,
  validate(updateprofileschema),
  updateUser
);

export default Userrouter;
