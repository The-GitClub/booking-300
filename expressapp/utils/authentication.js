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
      creation_dt: Date.now(),
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

//#region LoginUser
const userLogin = async (userCreds, role, res) => {
  console.log("USER LOGIN METHOD BEGAN");
  console.log("USER CREDNETAILS IN LOGIN METHOD",userCreds);  
  let { email, password } = userCreds;
  console.log("EMAIL" , email); 
  // First Check if the username is in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found in the login method? Invalid login credentials.",
      success: false,
    });
  }

  // That means user is existing and trying to sign in from the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      //credentials we pass into the token
      {
        user_id: user._id,
        role: user.role,
        email: user.email,
      },
      SECRET,
      //token is valid for 7 days
      { expiresIn: "7 days" }
    );

    let result = {
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168, // (hours)
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false,
    });
  }
};
//#endregion LoginUser

//Validate userName
const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

//#region validateEmail
const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};
//#endregion validateEmail

//#region SerializeResponse
//prevents the displaying of passwords and emails in the response
const serializeUser = (user) => {
  return {
    username: user.username,
    _id: user._id,
    role: user.role
  };
};
//#endregion SerializeResponse
//#region SerializeResponse
//prevents the displaying of passwords and emails in the response
    const serializeUserForId = (user) => {
      return {
        _id: user._id,
      };
    };
//#endregion SerializeResponse

/* #region  Find User Role For Login */
  const findMyRole = async (email, err) => {
    let user = await User.findOne({ email });
    if (!user) {
      return err;
    } else {
      console.log("ROLE IN UTILS FILE", user.role);
      return user.role;
    }
  };
/* #endregion Find User Role For Login  */

//Passport middleware
const userAuth = passport.authenticate("jwt", { session: false });

//#region ExportFunctions
//functions have to exported to be used in the users.js routing file
module.exports = {
  userRegister,
  userLogin,
  findMyRole,
  userAuth,
  serializeUser,
  serializeUserForId,
  //checkRole,
};
//#endregion ExportFunctions
