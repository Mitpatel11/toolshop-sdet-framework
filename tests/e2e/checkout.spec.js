const { test, expect } = require('@playwright/test');
const { PageManager } = require('../../pages/PageManager');


test.describe('Checkout Flow', () => {
    let pages;
    test.beforeEach(async ({ page }) => {
        pages = new PageManager(page);
        await pages.productPage.goTo('/');
    });



    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;
    test('comeplete the checkout and place order', async ({ page }) => {
        const item = 'Hammer';
        await pages.basePage.goToSignin();
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
        await pages.cartPage.proceedToCheckout();

        await expect(page.getByText("You can proceed to checkout.")).toBeVisible();
        await pages.checkoutPage.checkoutToAddress();


        await expect(page.getByLabel("Street")).not.toHaveValue('');

        const address = {
            postalCode: 'D01X000',
            houseNumber: '130',
            street: 'IFSC',
            city: 'Dublin',
            state: 'Leinster',
        };
        await pages.checkoutPage.fillAddress(address);


        await pages.checkoutPage.checkoutToPayments();
        const paymethod = "Cash on Delivery";
        await pages.checkoutPage.paymentMethodSelect(paymethod);

        await expect(page.getByText("Payment was successful")).toBeVisible();
        await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
        await pages.checkoutPage.ConfirmOrder();

        const invoiceNum = await pages.checkoutPage.getInvoiceNumber();
        console.log(invoiceNum);

    });
});