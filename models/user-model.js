import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Fixed typo
  },
  email: {
    type: String,
    required: true, // Fixed typo
    unique: true, // Ensure unique emails
  },
  password: {
    type: String,
    required: true, // Fixed typo
  },
  address: {
    type: String,
    required: true, // Fixed typo
  },
  pincode: {
    type: String,
    required: true, // Fixed typo
  },
});

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip if password is not modified
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// JWT token generator
userSchema.methods.genrateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

// Password comparison method
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
