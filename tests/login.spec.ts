import { test, expect } from '@playwright/test';

// Runs before every test
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

// TEST 1: Successful Login
test('Login successfully with valid credentials', async ({ page }) => {

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

// TEST 2: Invalid Login
test('Login fails with invalid credentials', async ({ page }) => {

  await page.locator('#user-name').fill('wrong_user');
  await page.locator('#password').fill('wrong_password');

  await page.locator('#login-button').click();

  await expect(
    page.locator('[data-test="error"]')
  ).toContainText('Username and password do not match');
});

// TEST 3: Empty Credentials
test('Login fails with empty credentials', async ({ page }) => {

  await page.locator('#login-button').click();

  await expect(
    page.locator('[data-test="error"]')
  ).toContainText('Username is required');
});