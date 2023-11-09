import {z} from "zod";
import {buildJsonSchemas} from "fastify-zod"

const productInput = {
    title: z.string(),
    price: z.number(),
    content: z.string().optional()
};

const productGenerated = {
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
};
const createProductSchema=z.object({
    ...productInput,
});


const productResponseSchema=z.object({
    ...productInput,
    ...productGenerated
});


const productsResponseSchema=z.array(productResponseSchema);

export type createProductInput=z.infer<typeof createProductSchema>

export const {schemas:productSchemas,$ref}=buildJsonSchemas({createProductSchema,productsResponseSchema,productResponseSchema});

