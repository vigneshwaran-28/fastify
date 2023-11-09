import prisma from "../../utils/prisma"
import { createProductInput } from "./product.schema"

export async function createProduct(data:createProductInput&{ownerId:number}){
    return prisma.product.create({
        data,
    });
}

export function getProducts(){
    return prisma.product.findMany();
}


