const express = require("express");
const app = express();
const PORT = 6969;
const schema = require("./Schemas/index");
const cors = require("cors");

//creating graphql server
const { graphqlHTTP } = require("express-graphql");

app.use(cors());
app.use(express.json());
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
