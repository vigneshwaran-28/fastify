import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { createUserSchema, loginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";

async function registerUserController(request:FastifyRequest<{Body:createUserSchema}>,reply:FastifyReply){
    const body=request.body;
    try {
        const user=await createUser(body);
        return reply.code(201).send(user);

    } catch (error) {
        console.log(error);
        return reply.code(500).send(error);
        
    }
}

export async function loginHandler(request:FastifyRequest<{Body:loginInput}>,reply:FastifyReply){
    const body=request.body;
    const user=await findUserByEmail(body.email);
    if(!user){
        return reply.code(401).send({message:'Invalid data or email!'})
    }
    const correctPassword = verifyPassword({ userPass:body.password, salt:user.salt, hash:user.password })
    if(correctPassword){
        const {password,salt,...rest}=user;
        return {accessToken:server.jwt.sign(rest)}
    }

    return reply.code(401).send({
        message:'Invalid email or password!'
    });
}

export async function getUsersHandler(){
    const users=await findUsers();
    return users;
}


export {registerUserController}
