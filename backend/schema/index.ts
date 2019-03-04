import fs from 'fs';
import path from 'path';
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import authResolvers from './authentication/resolvers';
import projectResolvers from './project/resolvers';
import financialResolvers from './financial/resolvers';
import cacheResolvers from './cache/resolvers';
import sprintResolvers from './sprint/resolvers';

const schemas: GraphQLSchema[] = [];
const authTypeDefs = fs.readFileSync(path.join(__dirname, './authentication/typedefs.graphql'), 'utf-8');
const projectTypeDefs = fs.readFileSync(path.join(__dirname, './project/typedefs.graphql'), 'utf-8');
const financialTypeDefs = fs.readFileSync(path.join(__dirname, './financial/typedefs.graphql'), 'utf-8');
const cacheTypeDefs = fs.readFileSync(path.join(__dirname, './cache/typedefs.graphql'), 'utf-8');
const sprintTypeDefs = fs.readFileSync(path.join(__dirname, './sprint/typedefs.graphql'), 'utf-8');

const typeDefs = [
  authTypeDefs,
  projectTypeDefs,
  financialTypeDefs,
  cacheTypeDefs,
  sprintTypeDefs,
];

const resolvers = [
  authResolvers,
  projectResolvers,
  financialResolvers,
  cacheResolvers,
  sprintResolvers,
];

typeDefs.forEach((typeDefs, i) => {
  // @ts-ignore
  schemas.push(makeExecutableSchema({
    typeDefs: typeDefs,
    // @ts-ignore
    resolvers: resolvers[i],
  }));
});

export default mergeSchemas({ schemas });
