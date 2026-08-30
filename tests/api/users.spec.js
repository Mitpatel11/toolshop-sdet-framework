const { test, expect } = require('@playwright/test');

test('customer token should not access GET /users (admin-only)', async ({ request }) => {
    const loginResponse = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD,
        },
    });
    const { access_token } = await loginResponse.json();

    const usersResponse = await request.get('https://api.practicesoftwaretesting.com/users', {
        headers: { Authorization: `Bearer ${access_token}` },
    });

    expect(usersResponse.status()).toBe(403);
});




