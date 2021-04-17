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
                console.log('err on token funct 1')
                return done(null, token.user);
            } catch (err) {
                console.log('err on token funct')
                done(err);
            }
        }
    )
);