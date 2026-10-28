import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;
  readonly orderProductName: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');

    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');

    this.confirmationMessage = page.locator('.complete-header');

    this.orderProductName = page.locator(
      '.cart_item .inventory_item_name'
    );

    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Fill customer information
  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Continue to order overview
  async continueCheckout() {
    await this.continueButton.click();
  }

  // Complete the purchase
  async finishCheckout() {
    await this.finishButton.click();
  }
}
