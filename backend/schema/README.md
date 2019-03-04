# GraphQL Schema

This directory contains the type definitions and resolvers for Amity's GraphQL schema. These are split into four core sections: authentication, time, analytics, and documentation.

## Organization

Each of the four parts has its own folder containing files for both the type definitions and the data resolvers. These are in `typedefs.graphql` and `resolvers.ts`, respectively.

All of these files are "stitched" together to create an overaching schema in `index.ts`. This root schema is used to create Amity's Apollo server.
