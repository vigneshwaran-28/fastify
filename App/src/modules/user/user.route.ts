import { FastifyInstance } from "fastify";
import { getUsersHandler, registerUserController } from "./user.controller";
import { $ref } from "./user.schema";
import { loginHandler } from "./user.controller";

async function userRoutes(server: FastifyInstance) {
    server.post('/', {
        schema: {
            body: $ref("createUserSchema"),
            response: {
                201: $ref('responseSchema')
            }
        }
    }, registerUserController);

    server.post('/login', {
        schema: {
            body: $ref('loginSchema'),
            response: {
                201: $ref('loginResponseSchema')
            }
        }
    }, loginHandler);

    server.get('/', { preHandler: [server.authenticate] }, getUsersHandler);
}

export default userRoutes;