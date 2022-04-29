'use strict';
import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID): User
    login(username: String!, password: String!): UserWithToken
  }
  
  extend type Mutation {
    registerUser(
      username: String!,
      password: String!,
      confirmPassword: String!
    ): UserWithToken
  }
  
  interface UserBase {
    id: ID
    username: String
  }
  
  type User implements UserBase {
    id: ID
    username: String
  }
  
  type UserWithToken implements UserBase {
    id: ID
    username: String
    token: String
  }
`;