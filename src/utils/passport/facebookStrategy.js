// passport/facebookStrategy.js
const FacebookStrategy = require("passport-facebook").Strategy;
const models = require("../../database/models");

module.exports = (passport) => {
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const callbackBaseURL=process.env.CALLBACK_BASE_URL
passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: `${callbackBaseURL}/api/auth/facebook/callback`,
        profileFields: ["id", "displayName", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
          const facebookId = profile.id;
          const user = await models.User.findOne({
            where: { oauthProvider: "facebook", oauthProviderId: facebookId },
          });
          if (user) {
            return done(null, user);
          }
          const existingUser = await models.User.findOne({
            where: { email: profile.emails[0].value },
          });
          if (existingUser) {
            if (existingUser.dataValues.user_type === "customer") {

            await existingUser.update({
              oauthProvider: 'facebook', // Indicate the provider
              oauthProviderId: facebookId,
              // oauthAccessToken: accessToken,
              // oauthRefreshToken:refreshToken,
              name: profile.displayName,
            });
            return done(null, existingUser);
          } else {
            return done({ message: "User Type Should be Customer" },null);
          }
          }
          const newUser = await models.User.create({
            oauthProvider: "facebook",
            oauthProviderId: facebookId,
            email: profile.emails[0]?.value || null,
            // oauthAccessToken: accessToken,
            // oauthRefreshToken:refreshToken,
            name: profile.displayName,
            user_type:"customer",
            is_verified:true

          });
          return done(null, newUser);
      },
    ),
  );
};
