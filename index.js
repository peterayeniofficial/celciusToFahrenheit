'use strict';

const Fastify = require('fastify');
const mercurius = require('mercurius');

const app = Fastify();

const schema = `
    type Query {
        hello: String
    }
    type Mutation {
        celciusToFahrenheit(celcius: Float!): Float
    }

`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
  Mutation: {
    celciusToFahrenheit: (root, args) => {
      return (args.celcius * 9) / 5 + 32;
    },
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

app.get('/', async function (req, reply) {
  const query = '{ hello }';
  return reply.graphql(query);
});

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
