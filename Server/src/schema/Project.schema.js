// project.js
import {Project} from "../models/Project";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type Project {
    _id: ID!
    name: String
    description: String
    tasks: [Task]
  }
  input ProjectInput{
    name: String
    description: String
  }
  extend type Query {
    projectSchemaAssert: String
    projects: [Project]
    project(_id: ID!): Project
  }
  extend type Mutation {
    createProject(name: String!,description: String!): Project
    createProjectWithInput(input: ProjectInput!): Project
    deleteProject(_id: ID!): Project
    updateProject(_id: ID!,input: ProjectInput!): Project
    addTaskToProject(_task: TaskInput!): Project
  }
`;

export const resolvers = {
  Query: {
    projectSchemaAssert: async () => {
      return Project.schema();
    },
    projects: async () => {
      return await Project.find().populate('task');
    },
    project: async (root, { _id }, context, info) => {
      return await Project.findById({_id});
    }
  },
  Mutation: {
    createProject: async (root, args, context, info) => {
      return await Project.create(args);
    },
    createProjectWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return await Project.create(input);
    },
    deleteProject: async (root, { _id }, context, info) => {
      return await Project.findByIdAndDelete({ _id });
       
    },
    updateProject: async (root, { _id, input }) => {
      return await Project.findByIdAndUpdate(_id, input, { new: true });
    },
    addTaskToProject: async (root, {_task}) => {
      await Project.tasks.push(_task);
      return Project;
    }
  },
};