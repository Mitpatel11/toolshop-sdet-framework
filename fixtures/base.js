const base = require('@playwright/test');
const { expect } = base;
const { PageManager } = require('../pages/PageManager');

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

});

module.exports = { test, expect: base.expect };