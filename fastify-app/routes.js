
function routes(fastify,options,done){
    fastify.get("/", (request, reply) => {
      reply.send('hu');
      // return { hello: "world" };
    });
    // done();
}

module.exports=routes;

