const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const {secret} = require('./info');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy((email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, { msg: 'Incorrect data:' });
            bcrypt.compare(password, user.password, (error, res) => {
                if (res) {
                    return done(null, user);
                }
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