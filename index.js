require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  debug: true,
  context: ({ req }) => ({ req }),
});
const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"));

server.listen(port, () => console.log("Server started *:" + port));
