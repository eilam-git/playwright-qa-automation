import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // TEST 1: Valid login
  test('User can login with valid credentials', async ({ page }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await loginPage.verifySuccessfulLogin();

    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();
  });

  // TEST 2: Invalid login
  test('User cannot login with invalid credentials', async () => {
    await loginPage.login(
      users.invalid.username,
      users.invalid.password
    );

    await loginPage.verifyLoginError(
      'Username and password do not match'
    );
  });

  // TEST 3: Empty credentials
  test('User cannot login with empty credentials', async () => {
    await loginPage.login('', '');

    await loginPage.verifyLoginError(
      'Username is required'
    );
  });

  // TEST 4: Locked user
  test('Locked out user cannot login', async () => {
    await loginPage.login(
      users.locked.username,
      users.locked.password
    );

    await loginPage.verifyLoginError(
      'Sorry, this user has been locked out'
    );
  });
});