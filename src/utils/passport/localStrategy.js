const models = require("../../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await models.User.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }
          // const passwordMatch = await bcrypt.compare(password, user.password);
          const passwordMatch = password==user.password?true:false;
          if (!passwordMatch) {
            return done(null, false, { message: "Invalid email or password" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};
