const { test, expect } = require('../../fixtures/base');

const address = {
    country: 'Ireland',
    postalCode: 'D01X000',
    houseNumber: '130',
    street: 'IFSC',
    city: 'Dublin',
    state: 'Leinster',
};

const baseDetails = {
    firstName: 'Customer',
    lastName: 'Test',
    dateOfBirth: '2001-11-11',
    address: address,
    phone: '1287543212',
    email: process.env.REGISTER_EMAIL,
    password: process.env.REGISTER_PASSWORD,
};

function uniqueEmail() {
    return `testuser+${Date.now()}@test.com`;
}


function makeDetails(overrides = {}) {
    return { ...baseDetails, email: uniqueEmail(), ...overrides };
}

test.describe('Register - Validation', () => {
    test.beforeEach(async ({ pages }) => {
        await pages.basePage.goToRegister();
    });

    test.describe('Required Fields', () => {
        test('shows all required-field errors when form is submitted blank', async ({ pages }) => {
            await pages.registerPage.blankRegister();

            for (const errorLocator of pages.registerPage.requiredFieldErrors) {
                await expect.soft(errorLocator).toBeVisible();
            }
        });
    });

    test.describe('Email Field Validations', () => {
        test('Invalid Email Format', async ({ pages }) => {
            const invalidEmail = 'xyzgmail.com';
            await pages.registerPage.invalidEmail(invalidEmail);
            await expect(pages.registerPage.emailInvalidFormatError).toBeVisible();
        });

        test('Email already in use', async ({ pages, page }) => {
            const details = makeDetails();

            await pages.registerPage.registerAccount(details);
            // wait for the first registration to actually complete before attempting
            // the duplicate — otherwise this navigation can race the pending request
            await expect(page).toHaveURL(/auth\/login/);

            await pages.basePage.goToRegister();
            await pages.registerPage.registerAccount(details);

            await expect(pages.registerPage.emailAlreadyInUseError).toBeVisible();
        });
    });

    test.describe('Password Field Validations', () => {
        test('Password used in Data Leak', async ({ pages }) => {
            const details = makeDetails({ password: 'Welcome@12' });

            await pages.registerPage.registerAccount(details);
            await expect(pages.registerPage.passwordDataLeak).toBeVisible();
        });

        test('Weak Password', async ({ pages }) => {
            const details = makeDetails({ password: '123' });

            await pages.registerPage.registerAccount(details);
            await expect(pages.registerPage.passwordInvalidChars).toBeVisible();
        });
    });

    test.describe('Date of Birth field validations', () => {
        test('Invalid Date of Birth format', async ({ pages }) => {
            const details = makeDetails({ dateOfBirth: '11-11-2001' });

            await pages.registerPage.registerAccount(details);
            await expect(pages.registerPage.dobInvalidFormatError).toBeVisible();
        });

        test('Customer must be 18 years of old', async ({ pages }) => {
            const fiveYearsAgo = new Date();
            fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
            const details = makeDetails({ dateOfBirth: fiveYearsAgo.toISOString().split('T')[0] });

            await pages.registerPage.registerAccount(details);
            await expect(pages.registerPage.dobUnder18Error).toBeVisible();
        });

        test('Customer must be younger than 75 years old', async ({ pages }) => {
            const hundredYearsAgo = new Date();
            hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);
            const details = makeDetails({ dateOfBirth: hundredYearsAgo.toISOString().split('T')[0] });

            await pages.registerPage.registerAccount(details);
            await expect(pages.registerPage.dobOver75Error).toBeVisible();
        });
    });

    test.describe('Phone Number field validation', () => {
        test('Only numbers are allowed', async ({ pages }) => {
            const details = makeDetails({ phone: 'abc123!!' });

            await pages.registerPage.registerAccount(details);
            await expect(pages.registerPage.phoneInvalidCharsError).toBeVisible();
        });
    });
});
