const { test, expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');


test.describe('Checkout Flow', () => {
    let basePage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.goTo();
    });



    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;
    test('comeplete the checkout and place order', async ({ page }) => {
        const item = 'Hammer';
        const loginPage = await basePage.goToSignin();
        await loginPage.login(email, password);

        await expect(page).toHaveURL(/account/);
        await basePage.goToHome();

        const productPage = new ProductPage(page);
        await productPage.searchItem(item);
        const product = productPage.filterProduct(item);
        await expect(product).toHaveCount(1);
        await product.click();

        await expect(productPage.productName).toHaveText(item);

        await productPage.addToCart();
        //await expect(page.locator('#toast-container')).toContainText('Product added to shopping cart.');

        await expect(productPage.toast).toContainText('Product added to shopping cart.');
        //await page.getByRole('link', { name: 'cart' }).click();
        await productPage.goToCart();

        const cartPage = new CartPage(page);
        const cartRow = cartPage.VerifyProduct(item);
        await expect(cartRow).toHaveCount(1);
        await expect(cartRow).toContainText(item);
        await cartPage.proceedToCheckout();



        await expect(page.getByText("You can proceed to checkout.")).toBeVisible();
        await page.locator('button').filter({ hasText: 'Proceed to checkout' }).nth(1).click();

        //await page.locator("#country").selectOption("Ireland");

        await expect(page.getByLabel("Street")).not.toHaveValue('');   // proves the one-shot auto-fill already ran

        await page.getByLabel("Postal Code").fill('D01X000');
        await page.getByLabel("House number").fill('130');
        await page.getByLabel("Street").fill("IFSC");
        await page.getByLabel("City").fill("Dublin");
        await page.getByLabel("State").fill("Leinster");

        // await page.getByLabel("Postal Code").fill('D01X000');
        // await page.getByLabel("House number").fill('130');
        // await page.getByLabel("Street").press('Tab');
        // await page.getByLabel("City").press('Tab');

        //  await page.getByLabel("Postal Code").fill('D01X000');
        //  await page.getByLabel("House number").fill('130');
        //  await page.getByLabel("State").fill("Leinster");


        await page.getByRole("button", { name: "Proceed to checkout" }).click();

        await page.locator("#payment-method").selectOption("Cash on Delivery");
        await page.getByRole('button', { name: 'Confirm' }).click();

        await expect(page.getByText("Payment was successful")).toBeVisible();
        await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
        await page.getByRole('button', { name: 'Confirm' }).click();

        const invoiceNum = await page.locator("#order-confirmation span").textContent();
        console.log(invoiceNum);

    });
});