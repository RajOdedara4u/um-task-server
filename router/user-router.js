import express from "express"; // Importing express
const Userrouter = express.Router(); // Creating a new router instance
import validate from "../middlewares/validate-middleware.js";
import {
  login,
  registration,
  userVerify,
} from "../controllers/userControllers.js";
import { loginSchema, registerSchema } from "../validator/auth-validator.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { updateUser } from "../controllers/userControllers.js";
import { updateprofileschema } from "../validator/auth-validator.js";
Userrouter.route("/userVerify").get(authMiddleware, userVerify);

Userrouter.route("/login").post(validate(loginSchema), login);

Userrouter.route("/registration").post(validate(registerSchema), registration);

Userrouter.route("/updateuser").put(
  authMiddleware,
  validate(updateprofileschema),
  updateUser
);

export default Userrouter; // Exporting the router using ES6 syntax
