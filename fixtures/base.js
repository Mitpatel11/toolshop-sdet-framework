const base = require('@playwright/test');
const { PageManager } = require('../pages/PageManager');

const test = base.test.extend({
    pages: async ({ page }, use) => {
        const pages = new PageManager(page);
        await pages.productPage.goTo('/');
        await use(pages);
    },

});

module.exports = { test, expect: base.expect };