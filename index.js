const express = require("express");
const app = express();
const PORT = 6969;
// this userData is mock of any real database interactions
const userData = require("./MOCK_DATA.json");

const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
//creating graphql server
const { graphqlHTTP } = require("express-graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
// object type that  represent  the query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // vs API routes
  // all your query goes here
  fields: {
    getAllUsers: {
      // means it's a list of usertype
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      // resolvers
      resolve(parent, args) {
        // here is where you would  return info from database
        return userData;
      },
    },
  },
});
// mutation is how you change/mutate data
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      // MOST IMPORTANT!!! must pass arguments
      // don't need to ask for ID
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        // DB logic goes here
        // example mySQL: db.query("INSERT")...etc
        // our mock db is just an array
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          passowrd: args.password,
        });
        return args;
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

// have to be at bottom of app or after everything
// single route for graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // this is for the GUI to test playground
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Server running");
});
