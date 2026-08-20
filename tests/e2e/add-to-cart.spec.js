const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../../pages/ProductPage');

test.describe('Add to Cart', () => {
    let basePage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.goTo('/');
    });
    const item = 'Hammer';

    test('should add a searched product to the cart', async ({ page }) => {

        //await page.getByPlaceholder('Search').fill(item);
        //await page.getByRole('button', { name: 'Search' }).click();

        await basePage.searchItem("Hammer");
        const product = await page
            .locator('[data-test="product-name"]')
            .filter({ hasText: new RegExp(`^\\s*${item}\\s*$`) });
        await expect(product).toHaveCount(1);
        await product.click();

        await expect(page.locator('[data-test="product-name"]')).toHaveText(item);

        await page.getByRole('button', { name: 'Add to cart' }).click();
        await expect(basePage.toast).toContainText('Product added to shopping cart.');

        //await page.getByRole('link', { name: 'cart' }).click();
        await basePage.goToCart();

        const cartRow = page.locator('tbody tr').filter({ has: page.locator('td span').getByText(item, { exact: true }) });
        await expect(cartRow).toHaveCount(1);
        await expect(cartRow).toContainText(item);
    });
});