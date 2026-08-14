const { test, expect } = require('@playwright/test');

test.describe('Add to Cart', () => {
    const item = 'Hammer';

    test('should add a searched product to the cart', async ({ page }) => {
        await page.goto('/');

        await page.getByPlaceholder('Search').fill(item);
        await page.getByRole('button', { name: 'Search' }).click();

        const product = page
            .locator('[data-test="product-name"]')
            .filter({ hasText: new RegExp(`^\\s*${item}\\s*$`) });
        await expect(product).toHaveCount(1);
        await product.click();

        await expect(page.locator('[data-test="product-name"]')).toHaveText(item);

        await page.getByRole('button', { name: 'Add to cart' }).click();
        await expect(page.locator('#toast-container')).toContainText('Product added to shopping cart.');

        await page.getByRole('link', { name: 'cart' }).click();

        const cartRow = page.locator('tbody tr', { hasText: item });
        await expect(cartRow).toHaveCount(1);
        await expect(cartRow).toContainText(item);
    });
});