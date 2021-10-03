const express = require("express");
const app = express();
const PORT = 6969;
// this userData is mock of any real database interactions
const userData = require("./MOCK_DATA.json");

app.listen(PORT, () => {
  console.log("Server running");
});
