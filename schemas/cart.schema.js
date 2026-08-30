const { z } = require('zod');
const { ProductSchema } = require('./product.schema');

const AddItemToCartRequestSchema = z.object({
    product_id: ProductSchema.id,
    quantity: z.number(),
});


const CartSchema = z.object({
    id: z.string(),
});
module.exports = { AddItemToCartRequestSchema, CartSchema };