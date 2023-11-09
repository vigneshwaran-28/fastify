import {FastifyInstance} from "fastify";
import { createProductHandler } from "./product.controller";

async function productRoutes(server:FastifyInstance){
    server.post('/',{},createProductHandler)
}



