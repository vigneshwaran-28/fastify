import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct } from "./product.service";
import { createProductInput } from "./product.schema";

export async function createProductHandler(request:FastifyRequest<{
    Body:createProductInput
}>){
    const product=await createProduct({
        ...request.body,
        ownerId:request.user.id
    });
    return product;
}  