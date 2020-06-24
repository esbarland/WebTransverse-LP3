import { ApolloServer, gql } from "apollo-server";
import { schema } from "./src/schema";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//Pass the schema to ApolloServer
const server = new ApolloServer({ schema })

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true });

//Launch the server
server.listen().then(({ url }) => {
  console.log(`==> 🚀  Server ready at ${url} `);
});