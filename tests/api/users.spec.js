const { test, expect } = require('@playwright/test');
const { LoginSchema, RegisterSchema, meSchema } = require('../../schemas/user.schema');
const { API_utils } = require('../../utils/API_utils');

const loginPayload = { email: process.env.USER_EMAIL, password: process.env.USER_PASSWORD };

const baseRegisterPayload = {
    first_name: "Customer",
    last_name: "Test",
    phone: "0987654321",
    dob: "2001-01-01",
    email: process.env.REGISTER_EMAIL,
    password: process.env.REGISTER_PASSWORD,
    address: {
        street: "Street Name",
        house_number: "130",
        city: "Dublin",
        state: "Dublin",
        country: "Ireland",
        postal_code: "D01Y000"
    }
};
function uniqueEmail() {
    return `testuser+${Date.now()}@test.com`;
}
function makeDetails(overrides = {}) {
    return { ...baseRegisterPayload, email: uniqueEmail(), ...overrides };
}


test.describe('Users API - Validation', () => {

    test.describe('Login', () => {
        test('Valid Login', async ({ request }) => {
            const apiUtils = new API_utils(request);
            const postLoginResponse = await apiUtils.postLoginResponse(loginPayload);
            expect(postLoginResponse.status()).toBe(200);
            const postLoginResponseBody = await postLoginResponse.json();
            const result = LoginSchema.safeParse(postLoginResponseBody);
            expect(result.success).toBe(true);
        });
        test('Wrong Email', async ({ request }) => {
            const wrongEmailPayload = { email: "testuser123gmail.com", password: process.env.USER_PASSWORD };
            const apiUtils = new API_utils(request);
            const wrongEmailResponse = await apiUtils.postLoginResponse(wrongEmailPayload);
            expect(wrongEmailResponse.status()).toBe(401);

        });
        test('Wrong Password', async ({ request }) => {
            const wrongPasswordPayload = { email: process.env.USER_EMAIL, password: "124234124" };
            const apiUtils = new API_utils(request);
            const wrongPasswordResponse = await apiUtils.postLoginResponse(wrongPasswordPayload);
            expect(wrongPasswordResponse.status()).toBe(401);
        });
    });
    test.describe('Register', () => {
        test('Valid Register', async ({ request }) => {
            const apiUtils = new API_utils(request);
            const postRegisterResponse = await apiUtils.postRegisterResponse(makeDetails());
            expect(postRegisterResponse.status()).toBe(201);
            const postRegisterResponseBody = await postRegisterResponse.json();
            const schemaResult = RegisterSchema.safeParse(postRegisterResponseBody);
            expect(schemaResult.success).toBe(true);
        });
        test('Re-used Email', async ({ request }) => {
            const apiUtils = new API_utils(request);
            const postRegisterResponse = await apiUtils.postRegisterResponse(baseRegisterPayload);
            expect(postRegisterResponse.status()).toBe(409);

        });
        test('Blank Register', async ({ request }) => {
            const apiUtils = new API_utils(request);
            const postRegisterResponse = await apiUtils.postRegisterResponse({});
            expect(postRegisterResponse.status()).toBe(422);
            const postRegisterResponseBody = await postRegisterResponse.json();
            expect(postRegisterResponseBody.first_name).toContain('The first name field is required.');
            expect(postRegisterResponseBody.last_name).toContain('The last name field is required.');
            expect(postRegisterResponseBody.email).toContain('The email field is required.');
            expect(postRegisterResponseBody.password).toContain('The password field is required.');
        });
    });
    test.describe('GET /users/me', () => {
        test('GET /users/me with no token', async ({ request }) => {
            const meResponse = await request.get('https://api.practicesoftwaretesting.com/users/me');
            expect(meResponse.status()).toBe(401);
        });
        test('GET /users/me invlaid token', async ({ request }) => {
            const access_token = "1A2B3C";
            const meResponse = await request.get('https://api.practicesoftwaretesting.com/users/me', {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            expect(meResponse.status()).toBe(401);
        });
        test('GET /users/me Valid Token', async ({ request }) => {
            const apiUtils = new API_utils(request);
            const loginResponse = await apiUtils.postLoginResponse(loginPayload);
            const { access_token } = await loginResponse.json();

            const meResponse = await request.get('https://api.practicesoftwaretesting.com/users/me', {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            expect(meResponse.status()).toBe(200);
            const meResponseBody = await meResponse.json();
            const schemaResult = meSchema.safeParse(meResponseBody);
            expect(schemaResult.success).toBe(true);
        });

    });

});


