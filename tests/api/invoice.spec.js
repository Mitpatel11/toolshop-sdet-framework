const { test, expect } = require('@playwright/test');
const { InvoiceSchema, InvoiceDetailSchema } = require('../../schemas/invoice.schema');

test('GET /invoices returns valid invoice schema', async ({ request }) => {
    const loginResponse = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD,
        },
    });
    expect(loginResponse.status()).toBe(200);
    const { access_token } = await loginResponse.json();
    const invoicesResponse = await request.get('https://api.practicesoftwaretesting.com/invoices', {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    expect(invoicesResponse.status()).toBe(200);
    const invoiceBody = await invoicesResponse.json();
    const invoiceId = await invoiceBody.data[0].id;
    const getInvoice = await request.get(`https://api.practicesoftwaretesting.com/invoices/${invoiceId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    expect(getInvoice.status()).toBe(200);
    const getInvoiceBody = await getInvoice.json();
    const singleResult = InvoiceDetailSchema.safeParse(getInvoiceBody);
    console.log(JSON.stringify(singleResult.error?.issues, null, 2));
    expect(singleResult.success).toBe(true);


    //console.log(JSON.stringify(invoiceBody, null, 2));
    const result = InvoiceSchema.safeParse(invoiceBody.data[0]);
    expect(result.success).toBe(true);

});