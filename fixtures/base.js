const base = require('@playwright/test');
const { expect } = base;
const { PageManager } = require('../pages/PageManager');
const fs = require('fs');
const path = require('path');
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

const test = base.test.extend({
    pages: async ({ page }, use) => {
        const pages = new PageManager(page);
        await pages.productPage.goTo('/');

        // before use(pages) we can write SETUP : Runs before the test
        await use(pages);
        //TEARDOWN: runs after the test finishes (pass or fail)
        console.log('Teardown: test finished, pages fixture cleaning up');
    },

    loggedInPages: async ({ pages, page }, use) => {
        const email = process.env.USER_EMAIL;
        const password = process.env.USER_PASSWORD;
        await pages.basePage.goToSignin();
        await pages.loginPage.login(email, password);
        await expect(page).toHaveURL(/account/);
        await pages.basePage.goToHome();
        await use(pages);
    },
    sessionPages: async ({ browser }, use) => {
        if (!fs.existsSync(authFile)) {
            const context = await browser.newContext();
            const page = await context.newPage();
            const pages = new PageManager(page);

            await pages.productPage.goTo('/');
            await pages.basePage.goToSignin();
            await pages.loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
            await expect(page).toHaveURL(/account/);

            await context.storageState({ path: authFile });
            await context.close();
        }

        const context = await browser.newContext({ storageState: authFile });
        const page = await context.newPage();
        const pages = new PageManager(page);
        await pages.productPage.goTo('/');

        await use(pages);

        await context.close();
    },
    apiLoginPages: async ({ browser, request }, use) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD,
        },
    });
    const body = await response.json();
    const token = body.access_token;

    const context = await browser.newContext();
    await context.addInitScript((token) => {
        localStorage.setItem('auth-token', token);
    }, token);

    const page = await context.newPage();
    const pages = new PageManager(page);
    await pages.productPage.goTo('/');

    await use(pages);

    await context.close();
},
    

});

module.exports = { test, expect: base.expect };