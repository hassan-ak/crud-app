const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    cruds: [Crud]!
  }
  type Crud {
    id: ID!
    text: String!
  }
  type Mutation {
    addCrud(text: String!): Crud
  }
`;

const cruds = {};
let crudIndex = 0;
const resolvers = {
  Query: {
    cruds: () => {
      return Object.values(cruds);
    },
  },
  Mutation: {
    addCrud: (_, { text }) => {
      crudIndex++;
      const id = `key-${crudIndex}`;
      cruds[id] = { id, text, done: false };
      return cruds[id];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
