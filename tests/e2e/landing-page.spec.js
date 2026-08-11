const { test, expect } = require('@playwright/test');

test.describe('Landing Page', () => {
    test('Load and Display Homepage', async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com/");
        await expect(page).toHaveTitle(/Practice Software Testing/i);   // /i makes it case insensitive and also not keeping it as fixed string
    });

     test('Navigation Bar', async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com/");
        await expect(page.getByRole("link" , {name:"Home"})).toBeVisible();
        await page.getByRole("link" , {name: "Sign In"}).click();
    });
});