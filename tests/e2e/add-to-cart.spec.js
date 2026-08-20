const { test, expect } = require('../../fixtures/base');

const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;
test('should add a searched product to the cart', async ({ pages, page }) => {
    const item = 'Hammer';
       /** const loginPage = */  await pages.basePage.goToSignin();   // const not needed as no return from the basePage
    await pages.loginPage.login(email, password);

    await expect(page).toHaveURL(/account/);
    await pages.basePage.goToHome();

    await pages.productPage.searchItem(item);
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
