import * as z from 'zod'

export const createProductSchema = z.object({
    name:z.string().min(1,"Name required"),
    price:z.coerce.number().positive("Price should be positive"),
    description:z.string().optional(),
    image:z.string().optional(),
    stock:z.coerce.number().positive(),
    category:z.string().optional()
})

export const updateProductSchema=z.object({
    name:z.string().optional(),
    price:z.coerce.number().positive().optional(),
    description:z.string().optional(),
    image:z.string().optional(),
    stock:z.coerce.number().positive().optional(),
    category:z.string().optional()
})