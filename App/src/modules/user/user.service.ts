import prisma from "../../utils/prisma";
import { createUserSchema } from "./user.schema";
import { hashPassword } from "../../utils/hash";

export async function createUser(input:createUserSchema){
    const {password,...rest} = input;
    const {hash,salt}=hashPassword(password);
    const user=await prisma.users.create({
        data:{...rest,salt,password:hash}
    });
    return user;
}

export async function findUserByEmail(email:string){
    return prisma.users.findUnique({
        where:{
            email
        }
    })
}

export async function findUsers(){
    return prisma.users.findMany({
        select:{
            email:true,
            name:true,
            id:true
        }
    })
}


