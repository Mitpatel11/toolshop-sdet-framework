const { BasePage } = require('./BasePage');
class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.checkoutToAddressbtn = page.locator('button');
        this.postalcode = page.getByLabel("Postal Code");
        this.housenumber = page.getByLabel("House number");
        this.street = page.getByLabel("Street");
        this.city = page.getByLabel("City");
        this.state = page.getByLabel("State");
        this.checkoutToPaymentsbtn = page.getByRole("button", { name: "Proceed to checkout" });
        this.selectPaymentMethod = page.locator("#payment-method");
        this.confirmbtn = page.getByRole('button', { name: 'Confirm' });
        this.invoiceNumber = page.locator("#order-confirmation span");
    }

    async checkoutToAddress() {
        await this.checkoutToAddressbtn.filter({ hasText: 'Proceed to checkout' }).nth(1).click();
    }

    async fillAddress(address) {
        await this.postalcode.fill(address.postalCode);
        await this.housenumber.fill(address.houseNumber);
        await this.street.fill(address.street);
        await this.city.fill(address.city);
        await this.state.fill(address.state);
    }
    async checkoutToPayments() {
        await this.checkoutToPaymentsbtn.click();
    }
    async paymentMethodSelect(paymethod) {
        await this.selectPaymentMethod.selectOption(paymethod);
        await this.confirmbtn.click();
    }
    async ConfirmOrder() {
        await this.confirmbtn.click();
    }

    async getInvoiceNumber() {
        return this.invoiceNumber.textContent();
    }
}



module.exports = { CheckoutPage };