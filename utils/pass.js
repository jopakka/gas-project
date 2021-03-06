'use strict';
import passport from 'passport';
import Strategy from 'passport-local';
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import dotenv from 'dotenv';
import {loginErrorMessage} from './messages';

dotenv.config();

passport.use('local', new Strategy({},
    async (username, password, done) => {
      const user = await User.findOne({username});
      // if user is undefined
      if (!user) {
        setTimeout(() => {
        }, Math.floor(Math.random() * 1000));
        return done(null, false, loginErrorMessage);
      }
      try {
        // if passwords dont match
        if (!await bcrypt.compare(password, user.password)) {
          return done(null, false, loginErrorMessage);
        }
      } catch (e) {
        return done(null, false, loginErrorMessage);
      }
      // if all is ok
      const strippedUser = user.toObject();
      delete strippedUser.password;
      return done(null, strippedUser);
    },
));

passport.use('jwt', new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    (payload, done) => {
      // console.log('jwt payload', payload);
      done(null, payload);
    }));

export default passport;
