// task.js
import {Task} from "../models/Task";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type Task {
    name: String
    description: String
    duration: String
    Status: Int
  }
  input TaskInput{
    name: String
    description: String
    duration: String
    Status: Int
  }
  extend type Query {
    taskSchemaAssert: String
    tasks: [Task]
    task(_id: ID!): Task
  }
  extend type Mutation {
    createTask(name: String!,description: String!): Boolean
    createTaskWithInput(input: TaskInput!): Task
    deleteTask(_id: ID!): Boolean
    updateTask(_id: ID!,input: TaskInput!): Task
  }
`;

export const resolvers = {
  Query: {
    taskSchemaAssert: async () => {
      return await Task.schema();
    },
    tasks: async () => {
      return await Task.find();
    },
    task: async (root, { _id }, context, info) => {
      return await Task.findById({_id});
    },
  },
  Mutation: {
    createTask: async (root, args, context, info) => {
      await Task.create(args);
      return Task.name;
    },
    createTaskWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return Task.create(input);
    },
    deleteTask: async (root, { _id }, context, info) => {
      return Task.remove({ _id });
    },
    updateTask: async (root, { _id, input }) => {
      return Task.findByIdAndUpdate(_id, input, { new: true });
    }
  },
};