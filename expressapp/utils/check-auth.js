const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //extract the JWT from the authorization header of the request
    const token = req.headers.authorization.split(" ")[1];//bearer will be expected, so we need to split the header
    //use the JWT verify method to verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);//pass the token and the secret string
    //creating a new field that does not yet exist (JavaScript Object containing the email and the UserId)
    req.userData = { email: decodedToken.email, userId: decodedToken.userId }; //creating this object means that any middleware that runs after this middleware can access this Object (but not those that run before)
    next();
  }
  catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};
