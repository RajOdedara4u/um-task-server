import User from "../models/user-model.js";
import bcrypt from "bcryptjs";

const home = async (req, res) => {
  try {
    res.status(200).send("It's home here....");
  } catch (error) {
    res.status(200).send(error);
  }
};

//SEND USER DATA LOGIC---------------------------------------------------------------------------------------------
const userVerify = async (req, res) => {
  try {
    const userData = req.user; // accessing the custom data from request
    return res.status(200).json(userData); // returning data when token is verified
  } catch (error) {
    res
      .status(401)
      .json({ message: "Error verifying user", error: error.message });
  }
};

//REGISTRATION LOGIC----------
const registration = async (req, res) => {
  try {
    const { name, email, password, address, pincode } = req.body;
    console.log(req.body);

    const userExsit = await User.findOne({ email });

    if (userExsit) {
      return res.status(400).json({ message: "User Already Exist!" });
    }

    const userCreated = await User.create({
      name,
      email,
      address,
      pincode,
      password,
    });

    // After registration generating token for user
    res.status(200).json({
      message: "Registration Success...",
      status: "Success",
      token: await userCreated.genrateToken(),
      userId: userCreated._id.toString(),
      email: userCreated.email,
      name: userCreated.name,
      address: userCreated.address,
      pincode: userCreated.pincode,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Sorry, something went wrong", error: error.message });
  }
};

//LOGIN LOGIC----------------------------------------------------------------------------------------------------------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExsit = await User.findOne({ email });

    if (!userExsit) {
      return res.status(400).json({ message: "Email not found" });
    } else {
      const userValid = await userExsit.checkPassword(password); // Check if password is valid

      if (userValid) {
        res.status(200).json({
          message: "Login Success...",
          token: await userExsit.genrateToken(),
          userId: userExsit._id.toString(),
          email: userExsit.email,
          name: userExsit.name,
          address: userExsit.address,
          pincode: userExsit.pincode,
        });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
};

// Logic For Update User Data

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in the request (e.g., from auth middleware)

    // Destructure the values from the request body
    const { name, email, address, pincode, password } = req.body;

    console.log("At update, received data:", req.body); // Log all the request data

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided in the request body
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (pincode) user.pincode = pincode;

    // If a password is provided, hash it and update the user password
    if (password) {
      try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      } catch (err) {
        console.error("Error hashing password:", err);
        return res
          .status(500)
          .json({ message: "Error hashing password", error: err.message });
      }
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Generate a new token for the updated user
    const newToken = await updatedUser.genrateToken(); // Assuming this method generates the token

    // Respond with the updated user details and new token
    res.status(200).json({
      message: "User updated successfully",
      token: newToken, // New token
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        pincode: updatedUser.pincode,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

export { registration, login, userVerify, home, updateUser };
