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
    cruds: (parent, args, { user }) => {
      if (!user) {
        return [];
      } else {
        return Object.values(cruds);
      }
    },
  },
  Mutation: {
    addCrud: (_, { text }) => {
      console.log("adding");
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
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    } else {
      return {};
    }
  },
});

const handler = server.createHandler();

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
