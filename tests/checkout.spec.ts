import { test, expect } from '@playwright/test';

test.describe('Checkout E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Complete purchase successfully', async ({ page }) => {

    // Step 1: Add product to cart
    await page.locator(
      '#add-to-cart-sauce-labs-backpack'
    ).click();

    // Step 2: Open cart
    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart.html/);

    // Step 3: Start checkout
    await page.locator('#checkout').click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    // Step 4: Fill customer information
    await page.locator('#first-name').fill('Eilam');
    await page.locator('#last-name').fill('Automation');
    await page.locator('#postal-code').fill('12345');

    // Step 5: Continue
    await page.locator('#continue').click();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Step 6: Verify product
    await expect(
      page.locator('.cart_item .inventory_item_name')
    ).toHaveText('Sauce Labs Backpack');

    // Step 7: Finish purchase
    await page.locator('#finish').click();

    // Step 8: Verify confirmation page
    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(
      page.locator('.complete-header')
    ).toHaveText('Thank you for your order!');

  });

});