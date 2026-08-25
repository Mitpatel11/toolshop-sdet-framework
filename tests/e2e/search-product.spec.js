const { test, expect } = require('../../fixtures/base');


test.describe('Search A Product', () => {
    test('Search product and assert', async ({ pages, page }) => {
        pages = new PageManager(page);
        await pages.productPage.goTo();
        const item = 'Hammer';
        await pages.productPage.searchItem(item);
        const product = pages.productPage.filterProduct(item);
        await expect(product).toHaveCount(1);
        await product.click();
    });
});