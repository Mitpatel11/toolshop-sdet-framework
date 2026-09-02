const { z } = require('zod');

const LoginSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
    expires_in: z.number(),
});


const RegisterSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string().nullable(),
    dob: z.iso.date(),
    email: z.string(),
    id: z.string(),
    created_at: z.string(),
    address: z.object({
        street: z.string().nullable(),
        house_number: z.string().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        country: z.string().nullable(),
        postal_code: z.string().nullable(),
    }),
});

const meSchema = z.object({
    id: z.string(),
    provider: z.string().nullable(),
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string().nullable(),
    dob: z.iso.date(),
    email: z.string(),
    totp_enabled: z.boolean(),
    created_at: z.string(),
    address: z.object({
        street: z.string(),
        house_number: z.string().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        country: z.string().nullable(),
        postal_code: z.string().nullable()
    }),

});



module.exports = { LoginSchema, RegisterSchema, meSchema };