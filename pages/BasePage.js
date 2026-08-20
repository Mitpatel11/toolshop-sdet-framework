const { LoginPage } = require('./LoginPage');

class BasePage {
    constructor(page) {
        this.page = page;
        this.toast = page.locator("#toast-container");
        this.cartLink = page.getByRole('link', { name: 'cart' });
        this.signInLink = page.getByRole('link', { name: 'Sign In' });
        this.homeLink = page.getByRole('link', { name: 'Home' });
    }


    async goTo(path = '/') {
        await this.page.goto(path);
    }

    async goToSignin() {
        await this.signInLink.click();
        return new LoginPage(this.page);
    }

    async goToHome() {
        await this.homeLink.click();
    }


    async goToCart() {
        await this.cartLink.click();
    }
}

module.exports = { BasePage };