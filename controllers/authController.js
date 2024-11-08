const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const signUp = async (req, res) => {
  console.log("signup in authCon", req.body);
  const { email, password, nickName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
      nickName,
    });
    
    await newUser.save();
    console.log("new user saved", newUser);
    console.log("JWT_SECRET = ", process.env.JWT_SECRET);
    console.log(newUser.uid,  newUser.email );
    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    console.log("Singup user = ", newUser);
    res
      .status(200)
      .json({
        token,
        _id: newUser._id,
        nickName: newUser.nickName,
        email: newUser.email,
        message: "User created successfully",
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signIn = async (req, res) => {
  console.log("signin in authCon", req.body);
  const { email, password } = req.body;

  console.log("Signin in auth email, pass ", email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("no user");
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    console.log("Signin auth user = ", user);
    res.status(200).json({ token, user: user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signOut = (req, res) => {
  // Handle sign-out if necessary, usually done on the client side
  res.status(200).json({ message: "Sign-out handled on client side" });
};

module.exports = { signUp, signIn, signOut };
