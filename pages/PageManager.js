const { LoginPage } = require('./LoginPage');
const { ProductPage } = require('./ProductPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { BasePage } = require('./BasePage');
const { RegisterPage } = require('./RegisterPage');

class PageManager {
    constructor(page) {
        this.basePage = new BasePage(page);
        this.loginPage = new LoginPage(page);
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.registerPage = new RegisterPage(page);
    }
}

module.exports = { PageManager };