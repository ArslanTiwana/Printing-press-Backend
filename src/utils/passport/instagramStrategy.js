// passport/instagramStrategy.js
const InstagramStrategy = require("passport-instagram").Strategy;
const models = require("../../database/models");

module.exports = (passport) => {
  const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
const callbackBaseURL=process.env.CALLBACK_BASE_URL

  passport.use(
    new InstagramStrategy(
      {
        clientID: INSTAGRAM_CLIENT_ID,
        clientSecret: INSTAGRAM_CLIENT_SECRET,
        callbackURL: `${callbackBaseURL}/api/auth/instagram/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
          const instagramId = profile.id;
          const user = await models.User.findOne({
            where: { oauthProvider: "instagram", oauthProviderId: instagramId },
          });

          if (user) {
            return done(null, user);
          }

          

          const existingUser = await models.User.findOne({
            where: { email: profile.emails[0].value },
          });
      
          if (existingUser) {
            await existingUser.update({
              oauthProvider: 'instagram', // Indicate the provider
              oauthProviderId: profile.id,
              // oauthAccessToken: accessToken,
              // oauthRefreshToken:refreshToken,
              name: profile.displayName,
            });
      
            return done(null, existingUser);
          }



          const newUser = await models.User.create({
            oauthProvider: "instagram",
            oauthProviderId: instagramId,
            email: profile.emails[0]?.value || null,
            name: profile.displayName,
          });
          return done(null, newUser);
      },
    ),
  );
};
