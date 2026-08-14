const { test, expect } = require('@playwright/test');
test.describe('Search A Product', () => {
    test('Search product and assert', async ({ page }) => {
        await page.goto("/");
        await page.getByPlaceholder("Search").fill("Hammer");
        await page.getByRole('button', { name: "Search" }).click();

        // Catch all the elementes displayed after search
        const results = await page.locator('[data-test="product-name"]');
        await expect(results.first()).toBeVisible();
        await expect(results.first()).toContainText("Hammer");
    });
});