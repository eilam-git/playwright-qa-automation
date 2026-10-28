import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
  }

  // Navigate to login page
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Perform login
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Verify successful login
  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.inventoryContainer).toBeVisible();
  }

  // Verify login error message
  async verifyLoginError(expectedMessage: string) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}