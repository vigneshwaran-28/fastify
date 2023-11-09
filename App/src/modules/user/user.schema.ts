import {z} from "zod";
import {buildJsonSchemas} from "fastify-zod"

const userSchema={
    email: z.string({ required_error: "email required!" }).email(),
    name: z.string(),
};

const createUserSchema=z.object({
  ...userSchema,
    password: z.string({ required_error: "password required!" })
});

const responseSchema=z.object({
    id: z.number(),
...userSchema
});

const loginSchema=z.object({
    email: z.string({ required_error: "email required!" }).email(),
    password:z.string()
});

const loginResponseSchema=z.object({
    accessToken:z.string()
});

export type createUserSchema =z.infer<typeof createUserSchema>;
export type loginInput = z.infer<typeof loginSchema>;

export const {schemas:userSchemas,$ref}=buildJsonSchemas({loginResponseSchema,createUserSchema,responseSchema,loginSchema})
