const { test, expect } = require('../../fixtures/base');
const { expectAddedToCartToast } = require('../../utils/assertions');


test('Register a Account and Place Order', { tag: ['@smoke'] }, async ({ pages, page }) => {

    const uniqueEmail = `testuser+${Date.now()}@test.com`;
    await pages.basePage.goToSignin();
    await pages.loginPage.clickRegister();
    const address = {
        country: 'Ireland',
        postalCode: 'D01X000',
        houseNumber: '130',
        street: 'IFSC',
        city: 'Dublin',
        state: 'Leinster',
    }
    const details = {
        firstName: 'Customer',
        lastName: 'Test',
        dateOfBirth: '2001-11-11',
        address: address,
        phone: '1287543212',
        email: uniqueEmail,
        password: process.env.REGISTER_PASSWORD,
    }

    await pages.registerPage.registerAccount(details);
    await expect(page).toHaveURL('/auth/login');
    await pages.loginPage.login(uniqueEmail, details.password);
    await expect(page).toHaveURL(/account/);
    await pages.basePage.goToHome();
    const item = 'Thor Hammer';

    const product = pages.productPage.filterProduct(item);
    await expect(product).toHaveCount(1);
    await product.click();

    await expect(pages.productPage.productName).toHaveText(item);

    await pages.productPage.addToCart();
    await expectAddedToCartToast(pages);
    await pages.productPage.goToCart();

    const cartRow = pages.cartPage.VerifyProduct(item);
    await expect(cartRow).toHaveCount(1);
    await expect(cartRow).toContainText(item);
    await pages.cartPage.proceedToCheckout();

    await expect(page.getByText("You can proceed to checkout.")).toBeVisible();
    await pages.checkoutPage.checkoutToAddress();


    await expect(page.getByLabel("Street")).not.toHaveValue('');


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