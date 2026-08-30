const { z } = require('zod');
const { ProductSchema } = require('./product.schema');

const AddItemToCartRequestSchema = z.object({
    product_id: ProductSchema.shape.id,
    quantity: z.number(),
});

const CartProductSchema = ProductSchema.pick({
    id: true,
    name: true,
    description: true,
    price: true,
    is_location_offer: true,
    is_rental: true,
    co2_rating: true,
    in_stock: true,
    is_eco_friendly: true,
});

const CartItemSchema = z.object({
    id: z.string(),
    quantity: z.number(),
    discount_percentage: z.number().nullable(),
    cart_id: z.string(),
    product_id: z.string(),
    product: CartProductSchema,
});

const CartSchema = z.object({
    id: z.string(),
    additional_discount_percentage: z.number().nullable(),
    lat: z.number().nullable(),
    lng: z.number().nullable(),
    cart_items: z.array(CartItemSchema),
});

module.exports = { AddItemToCartRequestSchema, CartSchema };
