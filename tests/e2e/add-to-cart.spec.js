const { test, expect } = require('../../fixtures/base');

test('should add a searched product to the cart', async ({ loggedInPages, pages }) => {
    const item = 'Hammer';
    await loggedInPages.productPage.searchItem(item);
    const product = pages.productPage.filterProduct(item);
    await expect(product).toHaveCount(1);
    await product.click();

    await expect(pages.productPage.productName).toHaveText(item);

    await pages.productPage.addToCart();
    await expect(pages.productPage.toast).toContainText('Product added to shopping cart.');
    await pages.productPage.goToCart();

    const cartRow = pages.cartPage.VerifyProduct(item);
    await expect(cartRow).toHaveCount(1);
    await expect(cartRow).toContainText(item);
});
