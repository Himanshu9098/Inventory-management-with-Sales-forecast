import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the Location schema
const locationSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  mainBranchLocation: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    location: locationSchema, // Embed the location schema as a subdocument
  },
  {
    timestamps: true,
  }
);

// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
