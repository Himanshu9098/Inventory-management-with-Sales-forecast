import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

//Route for gettin all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Route for registering a new user
router.post("/register", async (request, response) => {
  try {
    const { email, password, location } = request.body;

    if (!email || !password||!location) {
      return response.status(400).send({
        message: "Email and password are required fields.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(400).send({
        message: "User with this email already exists.",
      });
    }

    const newUser = {
      email,
      password, // Password hashing is handled in the model's pre-save hook
      location,
    };

    const user = await User.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: "Internal server error." });
  }
});

// Route for authenticating a user
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    if (
      password === process.env.AdminPass&&email === process.env.AdminMail
    ) {
      return response
        .status(200)
        .send({ message: "Admin Login",role:'admin' });
    }
    else{
    const user = await User.findOne({ email });
    
    if (!email || !password) {
      return response.status(400).send({
        message: "Email and password are required fields.",
      });
    }
    if (!user) {
      return response.status(401).send({
        message: "User not found. Please register first.",
        id: "",
      });
    }


      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return response.status(401).send({
          message: "Invalid password. Please try again.",
        });
      }
      return response
        .status(200)
        .send({ message: "Login successful",role:'user',id:user._id });
    }
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: "Internal server error." });
  }
});

// Route for updating user information
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { email, password, location } = request.body;

    if (!email) {
      return response.status(400).send({
        message: "Email is a required field for updating user information.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findByIdAndUpdate(id, {
      email,
      password:hashedPassword,
      location,
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    return response
      .status(200)
      .send({ message: "User information updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: "Internal server error." });
  }
});

// Route for getting user details by ID
router.get("/:id", async (request, response) => {
  try {
    const  id = request.params.id;
    const user = await User.findById(id);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: "Internal server error." });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: "Internal server error." });
  }
});

export default router;
