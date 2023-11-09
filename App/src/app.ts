import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fJwt from "@fastify/jwt";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
export const server = Fastify();
import { productSchemas } from "./modules/product/product.schema";

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module "@fastify/jwt"{
    export interface FastifyJWT{
        user:{
            id:number;
            email:string;
            name:string  
        } 
    }
}
server.register(fJwt, { secret: 'fhfjjhahhakjdhhaajadnja' });
server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (error) {
        return reply.send(error);
    }
});

server.get('/health', async (req, res) => {
    return { status: "ok" };
});

async function main() {

    for (const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema);
    }
    server.register(userRoutes, { prefix: 'api/users' });
    try {
        await server.listen(3000, "0.0.0.0");
        console.log("hii");
    } catch (error) {
        console.log("error ocuured", error);
        process.exit(1);
    }
}

main();