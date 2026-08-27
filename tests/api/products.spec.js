const { test, expect } = require('@playwright/test');
const { ProductSchema } = require('../../schemas/product.schema');


test('GET /products as 200 , valid product structure', async ({ request }) => {
    const response = await request.get("https://api.practicesoftwaretesting.com/products");
    expect(response.status()).toBe(200);

    const body = await response.json();
    const firstProduct = body.data[0];
    const result = ProductSchema.safeParse(firstProduct);
    expect(result.success).toBe(true);
    console.log(firstProduct);

});