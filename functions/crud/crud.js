const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;

var client = new faunadb.Client({ secret: process.env.FAUNA });

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
    cruds: async (parent, args, { user }) => {
      if (!user) {
        return [];
      } else {
        const results = await client.query(
          q.Paginate(q.Match(q.Index("curds_by_user"), user))
        );
        return results.data.map(([ref, text]) => ({
          id: ref.id,
          text,
        }));
      }
    },
  },
  Mutation: {
    addCurd: async (_, { text }, { user }) => {
      if (!user) {
        throw new Error("Must be authenticated to insert todos");
      }
      const results = await client.query(
        q.Create(q.Collection("curds"), {
          data: {
            text,
            owner: user,
          },
        })
      );
      return {
        ...results.data,
        id: results.ref.id,
      };
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
