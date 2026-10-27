import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Tests', () => {

  // Runs before every test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory.html/);
  });

  // TEST 1: Add product to cart
  test('Add product to cart', async ({ page }) => {

    // Add product
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    // Verify cart badge
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // Open cart
    await page.locator('.shopping_cart_link').click();

    // Verify cart page
    await expect(page).toHaveURL(/cart.html/);

    // Verify product in cart
    await expect(
      page.locator('.cart_item .inventory_item_name', {
        hasText: 'Sauce Labs Backpack'
      })
    ).toBeVisible();

  });

  // TEST 2: Remove product from cart
  test('Remove product from cart', async ({ page }) => {

    // Add product
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    // Verify cart badge
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // Open cart
    await page.locator('.shopping_cart_link').click();

    // Verify cart page
    await expect(page).toHaveURL(/cart.html/);

    // Remove product
    await page.locator('#remove-sauce-labs-backpack').click();

    // Verify cart is empty
    await expect(
      page.locator('.cart_item')
    ).toHaveCount(0);

    // Verify cart badge disappeared
    await expect(
      page.locator('.shopping_cart_badge')
    ).toBeHidden();

  });

});