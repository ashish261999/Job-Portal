import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// This is for  controller /business logic for the Registor --------------

export const register = async (req, res) => {
  try {
    //Lets call all the value here in variable---------

    const { fullName, email, phoneNumber, role, password } = req.body;

    // If any of the field is vacant/missing then ------

    if (!fullName || !email || !phoneNumber || !role || !password) {
      return res.status(400).json({
        message: "Something is missing !",
        success: false,
      });
    }

    //Lets check if User already exist---------
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this Email...",
        success: false,
      });
    }
    // Converting password in hash.....
    const hashPassword = await bcrypt.hash(password, 10);

    // Creating user ------
    await User.create({
      fullName,
      email,
      phoneNumber,
      role,
      password: hashPassword,
    });
    return res.status(201).json({
      message: "Account created sucessfulluy......",
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// This is for  controller /business logic for the Login --------------

export const logIn = async (req, res) => {
  try {
    //Fetch the required field needed for login

    const { email, password, role } = req.body;

    // If any of the field is vacant/missing then ------

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing !",
        success: false,
      });
    }

    //Lets check if User already exist---------

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email or Password.....",
        success: false,
      });
    }

    // Matching Password--------

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Incorrect Email or Password.....",
        success: false,
      });
    }

    //Checking Role is correct or not --------

    if (role != user.role) {
      return res.status(400).json({
        message: "Account does not exist with current Role.....",
        success: false,
      });
    }
    //Creating token for data------
    //storing  value of id in token
    const tokenData = {
      userId: user._id,
    };
    //Generating token-----
    const token = await jwt.sign(tokenData, process.env.SECRET_Key, {
      expiresIn: "1d",
    });

    //sending user details -----

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    //Storing token in cookies-----
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back $(user.fullName)`,
        user,
        sucess: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// This is for  controller /business logic for the Logout --------------

export const logOut = async (req, res) => {
  try {
    //Removing/deleting cooking -------
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out suceessfully...",
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// This is for  controller /business Update for the Logout --------------

export const updateProfile = async (req, res) => {
  try {
    //Lets call all the value here in variable---------

    const { fullName, email, phoneNumber, bio, skills } = req.body;

    // Now converting skills string to Array-------
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    //Fetching id for autheneication-------

    const userId = req.id;

   let user = await User.findById(userId);
   
  

    if (!user) {
      return res.status(400).json({
        message: "User not found...",
        success: false,
      });
    };

    //Updating Data----------------------

    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (bio) {
      user.profile.skills = skillsArray;
    }

    // Saving Data------------------------

    await user.save();

    //creating uer --------------------------

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile updated sucessfully!",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
