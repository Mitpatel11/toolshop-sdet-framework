const { z } = require('zod');

const ProductImageSchema = z.object({
    id: z.string(),
    by_name: z.string(),
    by_url: z.string(),
    source_name: z.string(),
    source_url: z.string(),
    file_name: z.string(),
    title: z.string(),
});

const CategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
});
const BrandSchema = z.object({
    id: z.string(),
    name: z.string(),
});

const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    is_location_offer: z.boolean(),
    is_rental: z.boolean(),
    co2_rating: z.string(),
    in_stock: z.boolean(),
    is_eco_friendly: z.boolean(),
    product_image: ProductImageSchema,
    category: CategorySchema,
    brand: BrandSchema,
});



module.exports = { ProductSchema };