const { test, expect } = require('../../fixtures/base');
const { expectAddedToCartToast } = require('../../utils/assertions');
test('should add a searched product to the cart', { tag: ['@regression'] }, async ({ sessionPages }) => {
    const item = 'Hammer';
    await sessionPages.productPage.searchItem(item);
    const product = sessionPages.productPage.filterProduct(item);
    await expect(product).toHaveCount(1);
    await product.click();

    await expect(sessionPages.productPage.productName).toHaveText(item);

    await sessionPages.productPage.addToCart();
    await expectAddedToCartToast(sessionPages);
    await sessionPages.productPage.goToCart();

    const cartRow = sessionPages.cartPage.VerifyProduct(item);
    await expect(cartRow).toHaveCount(1);
    await expect(cartRow).toContainText(item);
});
