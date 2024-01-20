// config.js
const passport = require("passport");
require("./localStrategy")(passport);
require("./googleStrategy")(passport);
require("./facebookStrategy")(passport);
require("./instagramStrategy")(passport);


function generateJwtToken(user) {
  const payload = {
    sub: user.userId,
    // Add other claims as needed
  };
  return jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
}

module.exports = { passport,generateJwtToken };
