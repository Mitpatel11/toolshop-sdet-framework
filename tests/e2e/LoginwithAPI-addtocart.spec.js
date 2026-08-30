const { test, expect } = require('../../fixtures/base');
const { expectAddedToCartToast } = require('../../utils/assertions');
test('should add a searched product to the cart', { tag: ['@regression'] }, async ({ apiLoginPages }) => {
    const item = 'Hammer';
    await apiLoginPages.productPage.searchItem(item);
    const product = apiLoginPages.productPage.filterProduct(item);
    await expect(product).toHaveCount(1);
    await product.click();

    await expect(apiLoginPages.productPage.productName).toHaveText(item);

    await apiLoginPages.productPage.addToCart();
    await expectAddedToCartToast(apiLoginPages);
    await apiLoginPages.productPage.goToCart();

    const cartRow = apiLoginPages.cartPage.VerifyProduct(item);
    await expect(cartRow).toHaveCount(1);
    await expect(cartRow).toContainText(item);
});
