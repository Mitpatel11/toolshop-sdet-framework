const { BasePage } = require('./BasePage');
class ProductPage extends BasePage {
    constructor(page) {
        super(page);
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.productName = page.locator('[data-test="product-name"]');
        this.addtocartbtn = page.getByRole('button', { name: 'Add to cart' });
    }

    async searchItem(item) {
        await this.searchInput.fill(item);
        await this.searchButton.click();
    }

    filterProduct(item) {
        return this.productName.filter({ hasText: new RegExp(`^\\s*${item}\\s*$`) });   // filter not async so no need of await here
    }

    async addToCart() {
        await this.addtocartbtn.click();
    }

}

module.exports = { ProductPage };