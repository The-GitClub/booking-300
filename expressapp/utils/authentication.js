//used for password hashing
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
//import secret string from the .env file for the JWT
const { SECRET } = require("../config/database");

//To Register the User (Manager, Staff, User)
//#region RegisterUser
const userRegister = async (userDetails, role, res) => {
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDetails.username);
    if (!usernameNotTaken) {
      // not-not-taken means it is taken because it is a double negative
      return res.status(400).json({
        //bad request
        message: `Username unavailable.`,
        success: false,
      });
    }

    // Validate the email
    let emailNotRegistered = await validateEmail(userDetails.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `This email is already associated with a registered account.`,
        success: false,
      });
    }

    // Get the hashed / encrypted password
    const password = await bcrypt.hash(userDetails.password, 12); //12 rounds of hashing

    // Create a New User
    const newUser = new User({
      ...userDetails,
      password,
      role,
    });

    //save the newly created user
    await newUser.save();

    return res.status(201).json({
      message: "Success! You have successfully registered. Login to continue.",
      success: true,
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false,
    });
  }
};
//#endregion RegisterUser

//#region ExportFunctions
//functions have to exported to be used in the users.js routing file
module.exports = {
    // userAuth,
    // checkRole,
    // userLogin,
    userRegister,
    //serializeUser,
  };
  //#endregion ExportFunctions
  