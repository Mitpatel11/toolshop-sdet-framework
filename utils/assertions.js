const { expect } = require("../fixtures/base");

async function expectAddedToCartToast(pages) {
    await expect(pages.productPage.toast).toContainText('Product added to shopping cart.');
}
module.exports = { expectAddedToCartToast };

