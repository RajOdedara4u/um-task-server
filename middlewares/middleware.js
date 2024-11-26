import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
const middleware = async (req, res, next) => {
  console.log("at middleware", req.body);

  const token = req.header("Authorization"); // get token from header
  const jwttoken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwttoken, process.env.JWT_SECRET_KEY); // Verify the token

    // Find user and include password
    const userExsit = await User.findOne({
      email: isVerified.email,
    });

    if (!userExsit) {
      return res.status(404).send({ message: "User not found" });
    }

    // Add custom data to the request
    req.user = userExsit;
    req.token = jwttoken;
    req.userId = userExsit._id;

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    return res.status(401).send({ message: "Invalid Token" });
  }
};

export default middleware;
