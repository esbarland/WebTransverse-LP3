// user.js
import {User} from "../models/User";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];

export const typeDef = `
  type User {
    _id: ID!
    pseudo: String
    password: String
  }
  input UserInput{
    pseudo: String
    password: String
  }
  extend type Query {
    userSchemaAssert: String
    users: [User]
    user(_id: ID!): User
  }
  extend type Mutation {
    createUser(pseudo: String!,password: String!): User
    createUserWithInput(input: UserInput!): User
    deleteUser(_id: ID!): Boolean
    updateUser(_id: ID!,input: UserInput!): User
  }
`;

export const resolvers = {
  Query: {
    // Get all users
    userSchemaAssert: async () => {
      return "Hello world, from User schema";
    },
    // Get all users
    users: async () => {
      return await User.find();
    },
    // Get user by ID
    user: async (root, { _id }, context, info) => {
      return await User.findOne({ _id });
    },
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      return await User.create(args);
    },
    createUserWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return User.create(input);
    },
    deleteUser: async (root, { _id }, context, info) => {
      User.remove({ _id });
      return true;
    },
    updateUser: async (root, { _id, input }) => {
      return User.findByIdAndUpdate(_id, input, { new: true });
    }
  }
};