const items = require("../items");

// Declare a route

const getItems = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id:{type:"number"},
            name: { type: "string" },
          },
        },
      },
    },
  },
  handler: async (request, reply) => {
    reply.send(items);
  },
};

let routeFunction = (fastify, options, done) => {
  fastify.get("/", getItems);
  done();
};

module.exports = routeFunction;
