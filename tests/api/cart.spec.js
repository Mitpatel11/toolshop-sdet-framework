const { test, expect } = require('@playwright/test');
const { CartSchema } = require('../../schemas/cart.schema');

test('POST then GET /carts/{cartId} returns valid cart schema', async ({ request }) => {
    const productResponse = await request.get('https://api.practicesoftwaretesting.com/products');
    const productBody = await productResponse.json();
    const product_id = productBody.data[0].id;

    const createResponse = await request.post("https://api.practicesoftwaretesting.com/carts", {
        data: {},
    });
    expect(createResponse.status()).toBe(201);
    const { id: cartId } = await createResponse.json();

    const addItemResponse = await request.post(`https://api.practicesoftwaretesting.com/carts/${cartId}`, {
        data: { product_id: product_id, quantity: 1 }
    });

    const getResponse = await request.get(`https://api.practicesoftwaretesting.com/carts/${cartId}`);
    expect(getResponse.status()).toBe(200);

    const body = await getResponse.json();
    console.log(JSON.stringify(body, null, 2));

    const result = CartSchema.safeParse(body);
    expect(result.success).toBe(true);

});