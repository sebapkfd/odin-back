const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('./models/user');
const {facebookKey, secret, facebookClientSecret} = require('./info');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy((email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) {
                console.log('err on passport');
                return done(err)};
            if (!user) {
                console.log('No user Found')
                return done(null, false, { msg: 'Incorrect data:' });
            }
            bcrypt.compare(password, user.password, (error, res) => {
                if (res) {
                    console.log('Succes');
                    return done(null, user);
                }
                console.log('Incorrect');
                return done(null, false, { msg: 'Incorrect data' });
            });
        });
    })
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        },

        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.use(new FacebookStrategy({
    clientID: facebookKey,
    clientSecret: facebookClientSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ email: profile.emails[0].value})
    //.populate("friends")
    .exec((err, user) => {
        console.log('XDDDDDDDDDDD');
      if (user) {
        return cb(err, user);
      } else {
        User.create(
          {
            email: profile.emails[0].value,
            facebookID: profile.id,
            firstName: profile.firstName,
            lastName: profile.lastName
          },
          (err, user) => {
            return cb(err, user);
          }
        );
      }
    });
  }
));

// passport.use(new FacebookStrategy(
//       {
//         clientID: process.env.FACEBOOK_APP_ID,
//         clientSecret: process.env.FACEBOOK_APP_SECRET,
//         callbackURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/auth/facebook/callback' : 'https://fcloneodin.herokuapp.com/auth/facebook/callback',
//         //passReqToCallback: true,
//         profileFields: ['displayName', 'photos', 'email']
//       },
//       (accessToken, refreshToken, profile, cb) => {
//         User.findOne({ email: profile.emails[0].value})
//         //.populate("friends")
//         .exec((err, user) => {
//           if (user) {
//             return cb(err, user);
//           } else {
//             User.create(
//               {
//                 email: profile.emails[0].value,
//                 profile_photo: profile.photos[0].value,
//                 facebookID: profile.id,
//                 display_name: profile.displayName,
//               },
//               (err, user) => {
//                 return cb(err, user);
//               }
//             );
//           }
//         });
//       }
//     )
//   );