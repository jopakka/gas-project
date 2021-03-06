'use strict';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import {login} from '../utils/auth';
import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import {passwordValidator} from '../utils/validators';

export default {
  Query: {
    user: async (parent, {id}, {user}) => {
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      return User.findById(id || user._id);
    },
    login: async (parent, args, {req}) => {
      req.body = args;
      try {
        return await login(req);
      } catch (e) {
        throw new UserInputError('Username or password invalid')
      }
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      try {
        const pw = args.password
        const confPw = args.confirmPassword

        // Check does passwords match
        if(confPw !== pw) {
          return new UserInputError("Passwords does not match")
        }

        // Check is passwords strong
        if(!passwordValidator(pw)) {
          return new UserInputError(
              "Password must be minimum eight characters, " +
              "at least one uppercase letter, " +
              "one lowercase letter and one number")
        }

        // Hash users password
        const hash = await bcrypt.hash(args.password, 12);
        const userWithHash = {
          ...args,
          password: hash,
        };

        // Create new user to database
        const newUser = new User(userWithHash);
        const strippedUser = newUser.toObject();

        // Creates login token to user
        newUser.token = jwt.sign(strippedUser, process.env.TOKEN_SECRET);
        return await newUser.save();
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
  },
};