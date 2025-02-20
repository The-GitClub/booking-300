const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //extract the JWT from the authorization header of the request
    const token = req.headers.authorization.split(" ")[1];//bearer will be expected, so we need to split the header
    //use the JWT verify method to verify the token
    const decodedToken = jwt.verify(token, process.env.SECRET);//pass the token and the secret string
    //creating a new field that does not yet exist (JavaScript Object containing the email and the UserId)
    req.userData = { userId: decodedToken.user_id, role: decodedToken.role }; //creating this object means that any middleware that runs after this middleware can access this Object (but not those that run before)
    console.log("ROLE" , req.userData.role); 
    next();
  }
  catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};
