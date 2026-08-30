const { z } = require('zod');
const { ProductSchema } = require('./product.schema');

const InvoiceProductSchema = ProductSchema.pick({
    id: true,
    name: true,
    price: true,
    co2_rating: true,
    in_stock: true,
    is_eco_friendly: true,
    product_image: true,
});

const InvoiceLinesSchema = z.object({
    id: z.string(),
    invoice_id: z.string(),
    product_id: ProductSchema.shape.id,
    unit_price: z.number(),
    quantity: z.number(),
    discount_percentage: z.number().nullable(),
    discounted_price: z.number().nullable(),
    product: InvoiceProductSchema,
});

const InvoiceSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    invoice_number: z.string(),
    invoice_date: z.string(),
    status: z.string(),
    total: z.number(),
    subtotal: z.number().nullable(),
    billing_street: z.string(),
    billing_city: z.string(),
    billing_state: z.string(),
    billing_country: z.string(),
    billing_postal_code: z.string(),
    additional_discount_percentage: z.number().nullable(),
    additional_discount_amount: z.number().nullable(),
    invoicelines: z.array(InvoiceLinesSchema),
    payment: z.object({
        payment_method: z.string(),
    }),
}).strict();

// --- Single-invoice detail endpoint (GET /invoices/{id})  ---

const DetailProductImageSchema = z.object({
    id: z.string(),
    by_name: z.string(),
    by_url: z.string(),
});

const DetailCategorySchema = z.object({
    id: z.string(),
    name: z.string(),
});

const InvoiceDetailProductSchema = ProductSchema.pick({
    id: true,
    name: true,
    description: true,
    price: true,
    co2_rating: true,
    is_rental: true,
    in_stock: true,
    is_eco_friendly: true,
}).extend({
    product_image: DetailProductImageSchema,
    category: DetailCategorySchema,
    brand: ProductSchema.shape.brand,
});


const InvoiceDetailLinesSchema = z.object({
    id: z.string(),
    invoice_id: z.string(),
    product_id: z.string(),
    unit_price: z.number(),
    quantity: z.number(),
    discount_percentage: z.number().nullable(),
    discounted_price: z.number().nullable(),
    product: InvoiceDetailProductSchema,
});

const InvoiceDetailSchema = z.object({
    id: z.string(),
    invoice_date: z.string(),
    additional_discount_percentage: z.number().nullable(),
    additional_discount_amount: z.number().nullable(),
    eco_discount_percentage: z.number().nullable(),
    eco_discount_amount: z.number().nullable(),
    invoice_number: z.string(),
    billing_street: z.string(),
    billing_city: z.string(),
    billing_state: z.string(),
    billing_country: z.string(),
    billing_postal_code: z.string(),
    subtotal: z.number().nullable(),
    total: z.number(),
    status: z.string(),
    status_message: z.string().nullable(),
    created_at: z.string(),
    user_id: z.string(),
    invoicelines: z.array(InvoiceDetailLinesSchema),
    payment: z.object({
        payment_method: z.string(),
        payment_details: z.object({
            gift_card_number: z.string(),
            validation_code: z.string(),
        }).optional(),
    }),
}).strict();

module.exports = { InvoiceSchema, InvoiceDetailSchema };
