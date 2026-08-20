const { test, expect } = require('@playwright/test');
const { PageManager } = require('../../pages/PageManager');

test.describe('Search A Product', () => {
    test('Search product and assert', async ({ page }) => {
        let pages;
        pages = new PageManager(page);
        await pages.productPage.goTo();
        const item = 'Hammer';
         await pages.productPage.searchItem(item);
        const product = pages.productPage.filterProduct(item);
        await expect(product).toHaveCount(1);
        await product.click();
    });
});