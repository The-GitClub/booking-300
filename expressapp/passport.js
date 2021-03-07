//import the the data model
const User = require("./models/user");

//import Strategy function and ExtractJwt (they extract the JWT from the request object)
const { Strategy, ExtractJwt } = require("passport-jwt");
 
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passport => {
  passport.use(
    new Strategy(options, async (payload, done) => { //JSON web token extracted from payload
      console.log("PAYLOAD IN THE PASSPORT METHOD:", payload); 
      await User.findById(payload.user_id)//find the user from the payload by ID
        .then(user => {
          if (user) {
            return done(null, user);//Append the user to the request object
          }
          return done(null, false);//if the user is not found, automatic unauthenticated request
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};
 