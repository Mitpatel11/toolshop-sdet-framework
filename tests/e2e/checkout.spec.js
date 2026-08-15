const { test, expect } = require('@playwright/test');

test.describe('Checkout Flow', () => {
    const item = 'Hammer';
    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;
    test('comeplete the checkout and place order', async ({ page }) => {
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

        const cartRow = page.locator('tbody tr').filter({ has: page.locator('td span').getByText(item, { exact: true }) });
        await expect(cartRow).toHaveCount(1);
        await expect(cartRow).toContainText(item);

        await page.getByRole("button", { name: "Proceed to checkout" }).click();
        await page.getByPlaceholder("Your email").first().fill(email);
        await page.getByPlaceholder("Your password").first().fill(password);
        await page.locator("input[value='Login']").click();

        await expect(page.getByText("You can proceed to checkout.")).toBeVisible();
        await page.locator('button').filter({ hasText: 'Proceed to checkout' }).nth(1).click();

        //await page.locator("#country").selectOption("Ireland");

        await expect(page.getByLabel("Street")).not.toHaveValue('');   // proves the one-shot auto-fill already ran

        await page.getByLabel("Postal Code").fill('D01X000');
        await page.getByLabel("House number").fill('130');
        await page.getByLabel("Street").fill("IFSC");
        await page.getByLabel("City").fill("Dublin");
        await page.getByLabel("State").fill("Leinster");

        // await page.getByLabel("Postal Code").fill('D01X000');
        // await page.getByLabel("House number").fill('130');
        // await page.getByLabel("Street").press('Tab');
        // await page.getByLabel("City").press('Tab');

        //  await page.getByLabel("Postal Code").fill('D01X000');
        //  await page.getByLabel("House number").fill('130');
        //  await page.getByLabel("State").fill("Leinster");


        await page.getByRole("button", { name: "Proceed to checkout" }).click();

        await page.locator("#payment-method").selectOption("Cash on Delivery");
        await page.getByRole('button', { name: 'Confirm' }).click();

        await expect(page.getByText("Payment was successful")).toBeVisible();
        await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
        await page.getByRole('button', { name: 'Confirm' }).click();

        const invoiceNum = await page.locator("#order-confirmation span").textContent();
        console.log(invoiceNum);

    });
});