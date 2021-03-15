const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

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
    deleteCrud(id: String!): Crud
  }
`;
const resolvers = {
  Query: {
    cruds: async (parent, args, { user }) => {
      if (!user) {
        return [];
      } else {
        const results = await client.query(
          q.Paginate(q.Match(q.Index("cruds_by_user"), user))
        );
        return results.data.map(([ref, text]) => ({
          id: ref.id,
          text,
        }));
      }
    },
  },
  Mutation: {
    addCrud: async (_, { text }, { user }) => {
      if (!user) {
        throw new Error("Must be authenticated to insert todos");
      }
      const results = await client.query(
        q.Create(q.Collection("cruds"), {
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
    deleteCrud: async (_, { id }, { user }) => {
      if (!user) {
        throw new Error("Must be authenticated to delete todos");
      }
      const results = await client.query(
        q.Delete(q.Ref(q.Collection("cruds"), id))
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
