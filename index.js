'use strict';

const Fastify = require('fastify');
const mercurius = require('mercurius');

const app = Fastify();

const schema = `
    type Query {
        hello: String
    }

`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
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
