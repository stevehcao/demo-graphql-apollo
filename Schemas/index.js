const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

// this userData is mock of any real database interactions
const userData = require("../MOCK_DATA.json");

const UserType = require("./TypeDefs/UserType");

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

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
