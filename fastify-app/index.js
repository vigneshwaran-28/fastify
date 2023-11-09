const fastify=require('fastify')({logger:true});
// import route from './routes'

fastify.register(require('./routes'));

const start=async()=>{
    try {
        await fastify.listen({port:4000});
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();
