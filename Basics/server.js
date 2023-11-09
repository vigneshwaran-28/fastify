const fastify = require("fastify")({ logger: true });

fastify.register(require("@fastify/swagger"));

fastify.register(require("@fastify/swagger-ui"), {
//   staticCSP: true,
  routePrefix: "/docs",
//   uiConfig: {
//     docExpansion: "list",
//     deepLinking: false,
//   },
});
fastify.register(require("./routes/route"));

// , {
//   swagger: {
//     info: {
//       title: "test service",
//       description: "test service",
//     },
//     consumes: ["application/json"],
//     produces: ["application/json"],
//   },
// }


// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
