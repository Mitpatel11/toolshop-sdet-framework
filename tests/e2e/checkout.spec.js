const { test, expect } = require('../../fixtures/base');
const { expectAddedToCartToast } = require('../../utils/assertions');


test('comeplete the checkout and place order', async ({ loggedInPages, pages, page }) => {
    const item = 'Hammer';

    await loggedInPages.productPage.searchItem(item);
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