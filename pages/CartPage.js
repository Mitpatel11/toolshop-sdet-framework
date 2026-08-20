const { BasePage } = require('./BasePage');
class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartRows = page.locator('tbody tr');
        this.checkoutbtn = page.getByRole("button", { name: "Proceed to checkout" })
    }

    VerifyProduct(item) {
        return this.cartRows.filter({ has: this.page.locator('td span').getByText(item, { exact: true }) });
    }

    async proceedToCheckout() {
        await this.checkoutbtn.click();
    }
}

module.exports = { CartPage };