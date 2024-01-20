// passport/googleStrategy.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const models = require("../../database/models");
const { createAccessToken } = require('../../middlewares/jwt')

module.exports = (passport) => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const callbackBaseURL = process.env.CALLBACK_BASE_URL
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${callbackBaseURL}/api/user/google/callback`,
        scope: ['profile', 'email'] // Include 'profile' and 'email' scopes
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("reachedhere   sdsdfas")
        const googleId = profile.id;
        const user = await models.User.findOne({
          where: { oauth_provider: "google", oauth_providerId: googleId },
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
              oauth_provider: 'google', // Indicate the provider
              oauth_providerId: profile.id,
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
          oauth_provider: "google",
          oauth_providerId: googleId,
          // oauthAccessToken:accessToken,
          // oauthRefreshToken:refreshToken,
          email: profile.emails[0].value,
          name: profile.displayName,
          user_type: "customer",
          is_verified:true

        });
        return done(null, newUser);
      },
    ),
  );
};
